
-- Pin search_path on the trigger helper
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- Drop the broad SELECT policy that allowed listing the bucket.
-- The bucket is still marked public so direct URLs work for rendering on the site.
DROP POLICY IF EXISTS "Public read media bucket" ON storage.objects;
