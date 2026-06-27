-- Tabela do Caderno de Oração
CREATE TABLE IF NOT EXISTS public.prayer_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  titulo TEXT NOT NULL,
  descricao TEXT,
  categoria TEXT,
  prioridade TEXT DEFAULT 'Media',
  status TEXT DEFAULT 'Em oração' CHECK (status IN ('Em oração', 'Respondida', 'Arquivada')),
  data_resposta TIMESTAMPTZ,
  testemunho TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own prayer requests" ON public.prayer_requests
  FOR ALL USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_prayer_requests_user_id ON public.prayer_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_status ON public.prayer_requests(status);
