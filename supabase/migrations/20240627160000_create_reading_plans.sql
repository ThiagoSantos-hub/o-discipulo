-- Tabela do Plano de Leitura Bíblica
CREATE TABLE IF NOT EXISTS public.reading_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plano_nome TEXT NOT NULL,
  objetivo TEXT,
  progresso INTEGER DEFAULT 0,
  leitura_atual TEXT,
  data_inicio TIMESTAMPTZ DEFAULT NOW(),
  data_fim TIMESTAMPTZ,
  ultimo_acesso TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE public.reading_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own reading plans" ON public.reading_plans
  FOR ALL USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_reading_plans_user_id ON public.reading_plans(user_id);
