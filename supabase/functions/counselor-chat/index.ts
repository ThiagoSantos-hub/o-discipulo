import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'
import { z } from 'https://esm.sh/zod@3.23.8'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })

const RequestSchema = z.object({
  message: z.string().min(1).max(4000),
  context: z.any().optional(),
  spiritualProfile: z.record(z.any()).optional().nullable(),
  conversationHistory: z
    .array(z.object({ role: z.enum(['user', 'assistant', 'system']), content: z.string().max(8000) }))
    .max(40)
    .optional()
    .default([]),
})

// Simple in-memory rate limiter (per warm instance). 10 req / 60s / user.
const RATE_WINDOW_MS = 60_000
const RATE_LIMIT = 10
const hits = new Map<string, number[]>()
function rateLimited(userId: string): boolean {
  const now = Date.now()
  const arr = (hits.get(userId) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  arr.push(now)
  hits.set(userId, arr)
  return arr.length > RATE_LIMIT
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  try {
    // --- Auth: require valid Supabase JWT --------------------
    const authHeader = req.headers.get('Authorization') ?? ''
    const token = authHeader.replace(/^Bearer\s+/i, '')
    if (!token) return json({ error: 'Missing authorization' }, 401)

    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')
    if (!supabaseUrl || !anonKey) return json({ error: 'Server misconfigured' }, 500)

    const supabase = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    })
    const { data: userData, error: userErr } = await supabase.auth.getUser(token)
    if (userErr || !userData?.user) return json({ error: 'Unauthorized' }, 401)
    const userId = userData.user.id

    if (rateLimited(userId)) return json({ error: 'Rate limit exceeded' }, 429)

    // --- Input validation ------------------------------------
    const parsed = RequestSchema.safeParse(await req.json())
    if (!parsed.success) return json({ error: 'Invalid payload', details: parsed.error.flatten() }, 400)
    const { message, spiritualProfile, conversationHistory } = parsed.data

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) return json({ error: 'OpenAI API key not configured' }, 500)

    // --- Build spiritual context -----------------------------
    let spiritualContext = ''
    if (spiritualProfile) {
      const parts: string[] = []
      const sp = spiritualProfile as Record<string, unknown>
      if (sp.nome) parts.push(`Nome: ${sp.nome}`)
      if (sp.igreja) parts.push(`Igreja: ${sp.igreja}`)
      if (sp.denominacao) parts.push(`Denominação: ${sp.denominacao}`)
      if (sp.ministerio) parts.push(`Ministério: ${sp.ministerio}`)
      if (sp.objetivo_espiritual) parts.push(`Objetivo espiritual: ${sp.objetivo_espiritual}`)
      if (sp.frequencia_oracao) parts.push(`Frequência de oração: ${sp.frequencia_oracao}`)
      if (sp.frequencia_leitura) parts.push(`Frequência de leitura bíblica: ${sp.frequencia_leitura}`)
      if (parts.length > 0) spiritualContext = `\n\n**Informações do Perfil Espiritual do usuário:**\n${parts.join('\n')}`
    }

    const systemPrompt =
      `Você é o Conselheiro Espiritual do aplicativo "O Discípulo". Fale com empatia, ` +
      `acolhimento e fidelidade bíblica. Nunca afirme ser Jesus ou falar como Deus. ` +
      `Incentive o crescimento espiritual de forma natural.${spiritualContext}`

    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...conversationHistory.map((t) => ({ role: t.role, content: t.content })),
      { role: 'user' as const, content: message },
    ]

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model: 'gpt-4o-mini', messages, temperature: 0.7, max_tokens: 800 }),
    })

    if (!openaiResponse.ok) {
      const error = await openaiResponse.text()
      console.error('OpenAI error:', error)
      return json({ error: 'Upstream model error' }, 502)
    }

    const data = await openaiResponse.json()
    const assistantMessage =
      data.choices?.[0]?.message?.content ?? 'Desculpe, não consegui processar sua mensagem no momento.'

    // (Optional) persist turn — uses RLS as the authenticated user
    void supabase.from('conversation_turns').insert([
      { user_id: userId, role: 'user', content: message },
      { user_id: userId, role: 'assistant', content: assistantMessage },
    ])

    return json({ message: assistantMessage })
  } catch (e) {
    console.error('counselor-chat error:', e)
    return json({ error: 'Internal error' }, 500)
  }
})
