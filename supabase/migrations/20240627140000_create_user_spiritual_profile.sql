-- Tabela de Perfil Espiritual do Usuário
CREATE TABLE IF NOT EXISTS public.user_spiritual_profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  nome TEXT,
  foto_url TEXT,
  igreja TEXT,
  denominacao TEXT,
  ministerio TEXT,
  cargo TEXT,
  versao_biblia TEXT,
  objetivo_espiritual TEXT,
  frequencia_oracao TEXT,
  frequencia_leitura TEXT,
  idioma TEXT DEFAULT 'pt-BR',
  fuso_horario TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.user_spiritual_profile ENABLE ROW LEVEL SECURITY;

-- Política: usuário só gerencia seu próprio perfil
CREATE POLICY "Users can manage their own spiritual profile" ON public.user_spiritual_profile
  FOR ALL USING (auth.uid() = user_id);

-- Índice
CREATE INDEX IF NOT EXISTS idx_user_spiritual_profile_user_id ON public.user_spiritual_profile(user_id);
