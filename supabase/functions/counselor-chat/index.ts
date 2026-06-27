import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Tipos
import type { CounselorContext, ConversationTurn } from '../../../src/ai/types.ts'

interface CounselorChatRequest {
  userId: string
  message: string
  context: CounselorContext
  conversationHistory: ConversationTurn[]
}

serve(async (req) => {
  try {
    const { userId, message, context, conversationHistory } = await req.json() as CounselorChatRequest

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), { status: 500 })
    }

    // Construir histórico para a OpenAI
    const messages = [
      {
        role: 'system',
        content: `Você é o Conselheiro Espiritual do aplicativo "O Discípulo". Fale com empatia, acolhimento e fidelidade bíblica. Nunca afirme ser Jesus ou falar como Deus. Incentive o crescimento espiritual de forma natural.`
      },
      ...conversationHistory.map(turn => ({
        role: turn.role,
        content: turn.content
      })),
      {
        role: 'user',
        content: message
      }
    ]

    // Chamada para OpenAI (Chat Completions)
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

    return new Response(JSON.stringify({ 
      message: assistantMessage,
      // Futuramente podemos retornar suggestedVerses, etc.
    }), {
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
