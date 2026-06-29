-- ============================================================
-- Security hardening: missing GRANTs + tighter RLS
-- (Supabase no longer grants Data API access by default.)
-- ============================================================

-- Grants ----------------------------------------------------
GRANT SELECT, INSERT, UPDATE, DELETE ON public.prayer_requests     TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.spiritual_memory    TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.conversation_turns  TO authenticated;
GRANT ALL ON public.prayer_requests     TO service_role;
GRANT ALL ON public.spiritual_memory    TO service_role;
GRANT ALL ON public.conversation_turns  TO service_role;

-- Tighten conversation_turns RLS ----------------------------
DROP POLICY IF EXISTS "Anyone can read conversation turns" ON public.conversation_turns;
DROP POLICY IF EXISTS "Users read their own turns"   ON public.conversation_turns;
DROP POLICY IF EXISTS "Users insert their own turns" ON public.conversation_turns;

CREATE POLICY "Users read their own turns"
  ON public.conversation_turns FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert their own turns"
  ON public.conversation_turns FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
