
-- Ensure the user_auth_details table has all necessary columns for signup
-- This table should already exist but let's make sure it has the right structure
ALTER TABLE public.user_auth_details 
ADD COLUMN IF NOT EXISTS phone_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS signup_date TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create an index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_auth_details_user_id ON public.user_auth_details(user_id);
CREATE INDEX IF NOT EXISTS idx_user_auth_details_email ON public.user_auth_details(email);

-- Update the trigger function to ensure all signup data is captured
CREATE OR REPLACE FUNCTION public.handle_new_user_signup()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Insert user details into user_auth_details table
  INSERT INTO public.user_auth_details (
    user_id,
    full_name,
    email,
    phone,
    user_type,
    signup_date,
    additional_info
  ) VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.email,
    NEW.raw_user_meta_data ->> 'phone',
    NEW.raw_user_meta_data ->> 'user_type',
    now(),
    NEW.raw_user_meta_data
  )
  ON CONFLICT (user_id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    phone = EXCLUDED.phone,
    user_type = EXCLUDED.user_type,
    additional_info = EXCLUDED.additional_info;
  
  RETURN NEW;
END;
$$;

-- Create the trigger if it doesn't exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_signup();
