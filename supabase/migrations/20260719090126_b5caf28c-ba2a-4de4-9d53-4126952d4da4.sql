
-- handle_new_user is trigger-only; revoke direct execution
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- has_role is intentionally callable by authenticated users for RLS checks;
-- restrict PUBLIC/anon to comply with linter.
REVOKE ALL ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated;
