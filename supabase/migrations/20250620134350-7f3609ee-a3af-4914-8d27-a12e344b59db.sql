
-- Create table for farmer profiles
CREATE TABLE public.farmer_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  farm_name TEXT NOT NULL,
  farmer_name TEXT NOT NULL,
  location TEXT NOT NULL,
  story TEXT,
  land_size DECIMAL(10,2),
  soil_type TEXT,
  water_source TEXT,
  farm_photos TEXT[], -- Array to store photo URLs
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id) -- One profile per user
);

-- Enable Row Level Security
ALTER TABLE public.farmer_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for farmer profiles
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

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_farmer_profile_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_farmer_profiles_updated_at
  BEFORE UPDATE ON public.farmer_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_farmer_profile_updated_at();
