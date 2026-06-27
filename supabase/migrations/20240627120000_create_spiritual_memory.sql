-- Extensão para UUIDs (caso ainda não exista)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela principal de memória espiritual do usuário
CREATE TABLE IF NOT EXISTS public.user_spiritual_memory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  current_streak INTEGER DEFAULT 0,
  total_days_active INTEGER DEFAULT 0,
  last_active_at TIMESTAMPTZ,
  last_conversation_at TIMESTAMPTZ,
  spiritual_summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Tabela de sessões de conversa
CREATE TABLE IF NOT EXISTS public.conversation_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  summary TEXT,
  main_topic TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de mensagens/turmas da conversa
CREATE TABLE IF NOT EXISTS public.conversation_turns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES public.conversation_sessions(id) ON DELETE CASCADE NOT NULL,
  role TEXT CHECK (role IN ('user', 'assistant')) NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de objetivos espirituais
CREATE TABLE IF NOT EXISTS public.spiritual_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  target TEXT,
  is_active BOOLEAN DEFAULT true,
  completed_today BOOLEAN DEFAULT false,
  current_streak INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de atividades espirituais (leitura, oração, devocional, etc.)
CREATE TABLE IF NOT EXISTS public.spiritual_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  activity_type TEXT NOT NULL, -- 'bible_reading', 'prayer', 'devotional', 'study', etc.
  duration_minutes INTEGER,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de pedidos de oração
CREATE TABLE IF NOT EXISTS public.prayer_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  is_shared_with_team BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.user_spiritual_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_turns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spiritual_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spiritual_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;

-- Políticas básicas (usuário só vê seus próprios dados)
CREATE POLICY "Users can manage their own spiritual memory" ON public.user_spiritual_memory
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own conversation sessions" ON public.conversation_sessions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own conversation turns" ON public.conversation_turns
  FOR ALL USING (auth.uid() = (SELECT user_id FROM public.conversation_sessions WHERE id = session_id));

CREATE POLICY "Users can manage their own spiritual goals" ON public.spiritual_goals
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own spiritual activities" ON public.spiritual_activities
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own prayer requests" ON public.prayer_requests
  FOR ALL USING (auth.uid() = user_id);
