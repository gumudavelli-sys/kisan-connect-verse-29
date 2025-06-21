
-- Create table for storing farmer profiles
CREATE TABLE public.farmer_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  farm_name TEXT NOT NULL,
  farmer_name TEXT NOT NULL,
  location TEXT NOT NULL,
  story TEXT,
  land_size DECIMAL(10,2),
  soil_type TEXT,
  water_source TEXT,
  farm_photos TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) policies
ALTER TABLE public.farmer_profiles ENABLE ROW LEVEL SECURITY;

-- RLS policies for farmer_profiles
CREATE POLICY "Users can view their own farmer profile" 
  ON public.farmer_profiles 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own farmer profile" 
  ON public.farmer_profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own farmer profile" 
  ON public.farmer_profiles 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_farmer_profile_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_farmer_profile_updated_at
  BEFORE UPDATE ON public.farmer_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_farmer_profile_updated_at();
