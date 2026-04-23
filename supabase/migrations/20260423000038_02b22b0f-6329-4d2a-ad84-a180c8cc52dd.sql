-- Update signup trigger function to assign roles to additional admin email
CREATE OR REPLACE FUNCTION public.assign_super_admin_on_signup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NEW.email = 'savannahsafarisairbnb@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'super_admin')
    ON CONFLICT DO NOTHING;
  END IF;

  IF NEW.email = 'kingsleyhub01@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'super_admin')
    ON CONFLICT DO NOTHING;
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN NEW;
END;
$function$;

-- Ensure the trigger is attached
DROP TRIGGER IF EXISTS on_auth_user_created_assign_super_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_assign_super_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.assign_super_admin_on_signup();

-- If the user already exists in auth.users, retroactively assign the roles
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'super_admin'::app_role FROM auth.users WHERE email = 'kingsleyhub01@gmail.com'
ON CONFLICT DO NOTHING;

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM auth.users WHERE email = 'kingsleyhub01@gmail.com'
ON CONFLICT DO NOTHING;