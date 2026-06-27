-- Tabela para armazenar as respostas do Onboarding
CREATE TABLE IF NOT EXISTS public.user_onboarding (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  preferred_name TEXT,
  daily_time_commitment TEXT, -- '10', '20', '30', '45', '60'
  focus_areas TEXT[], -- array de áreas selecionadas
  habit_to_overcome TEXT,
  preferred_devotional_time TEXT, -- 'Manhã', 'Tarde', 'Noite', 'Madrugada'
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.user_onboarding ENABLE ROW LEVEL SECURITY;

-- Política: usuário só pode ver e editar seu próprio onboarding
CREATE POLICY "Users can manage their own onboarding" ON public.user_onboarding
  FOR ALL USING (auth.uid() = user_id);

-- Índice para busca rápida por user_id
CREATE INDEX IF NOT EXISTS idx_user_onboarding_user_id ON public.user_onboarding(user_id);
