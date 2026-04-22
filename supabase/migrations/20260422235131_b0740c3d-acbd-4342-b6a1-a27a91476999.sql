-- 1. Drop the open "anyone" policies on content tables
DROP POLICY IF EXISTS "Anyone can manage content fields" ON public.content_fields;
DROP POLICY IF EXISTS "Anyone can manage sections" ON public.sections;
DROP POLICY IF EXISTS "Anyone can manage pages" ON public.pages;
DROP POLICY IF EXISTS "Anyone can manage site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Anyone can manage media" ON public.media_assets;
DROP POLICY IF EXISTS "Anyone can insert audit log" ON public.audit_log;

-- 2. Restore admin-only write policies (public SELECT policies remain untouched)
CREATE POLICY "Admins manage content fields"
  ON public.content_fields FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins manage sections"
  ON public.sections FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins manage pages"
  ON public.pages FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins manage site settings"
  ON public.site_settings FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins manage media"
  ON public.media_assets FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Authenticated can insert audit log"
  ON public.audit_log FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = actor_id);

-- 3. Lock down storage 'media' bucket — admin-only writes, public reads remain
DROP POLICY IF EXISTS "Anyone can upload to media bucket" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update media bucket" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete from media bucket" ON storage.objects;

CREATE POLICY "Admins upload media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'media' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins update media"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'media' AND public.is_admin(auth.uid()))
  WITH CHECK (bucket_id = 'media' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins delete media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'media' AND public.is_admin(auth.uid()));

-- 4. Trigger: auto-assign super_admin role to the designated email on signup
DROP TRIGGER IF EXISTS on_auth_user_created_assign_super_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_assign_super_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.assign_super_admin_on_signup();