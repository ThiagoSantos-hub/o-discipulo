import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

interface CounselorChatRequest {
  userId: string
  message: string
  context: any
  spiritualProfile?: any
  conversationHistory: any[]
}

serve(async (req) => {
  try {
    const { userId, message, context, spiritualProfile, conversationHistory } = await req.json() as CounselorChatRequest

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), { status: 500 })
    }

    // Construir contexto do Perfil Espiritual
    let spiritualContext = ''
    if (spiritualProfile) {
      const parts = []
      if (spiritualProfile.nome) parts.push(`Nome: ${spiritualProfile.nome}`)
      if (spiritualProfile.igreja) parts.push(`Igreja: ${spiritualProfile.igreja}`)
      if (spiritualProfile.denominacao) parts.push(`Denominação: ${spiritualProfile.denominacao}`)
      if (spiritualProfile.ministerio) parts.push(`Ministério: ${spiritualProfile.ministerio}`)
      if (spiritualProfile.objetivo_espiritual) parts.push(`Objetivo espiritual: ${spiritualProfile.objetivo_espiritual}`)
      if (spiritualProfile.frequencia_oracao) parts.push(`Frequência de oração: ${spiritualProfile.frequencia_oracao}`)
      if (spiritualProfile.frequencia_leitura) parts.push(`Frequência de leitura bíblica: ${spiritualProfile.frequencia_leitura}`)

      if (parts.length > 0) {
        spiritualContext = `\n\n**Informações do Perfil Espiritual do usuário:**\n${parts.join('\n')}`
      }
    }

    const systemPrompt = `Você é o Conselheiro Espiritual do aplicativo "O Discípulo". Fale com empatia, acolhimento e fidelidade bíblica. Nunca afirme ser Jesus ou falar como Deus. Incentive o crescimento espiritual de forma natural.${spiritualContext}`

    const messages = [
      { role: 'system', content: systemPrompt },
      ...(conversationHistory || []).map((turn: any) => ({
        role: turn.role,
        content: turn.content
      })),
      { role: 'user', content: message }
    ]

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7,
        max_tokens: 800,
      }),
    })

    if (!openaiResponse.ok) {
      const error = await openaiResponse.text()
      return new Response(JSON.stringify({ error }), { status: 500 })
    }

    const data = await openaiResponse.json()
    const assistantMessage = data.choices[0]?.message?.content || 'Desculpe, não consegui processar sua mensagem no momento.'

    return new Response(JSON.stringify({ message: assistantMessage }), {
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
