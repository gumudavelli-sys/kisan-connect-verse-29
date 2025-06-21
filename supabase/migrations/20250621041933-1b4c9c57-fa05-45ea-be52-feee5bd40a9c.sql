
-- Create table for storing contact form messages
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  user_type TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for storing user authentication details
CREATE TABLE public.user_auth_details (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  full_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  user_type TEXT,
  additional_info JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for checkout transactions
CREATE TABLE public.checkout_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  cart_items JSONB NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  transaction_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) policies
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_auth_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checkout_transactions ENABLE ROW LEVEL SECURITY;

-- RLS policies for contact_messages (admin access only for now)
CREATE POLICY "Admin can view all contact messages" 
  ON public.contact_messages 
  FOR SELECT 
  USING (true); -- You may want to restrict this to admin users later

CREATE POLICY "Anyone can insert contact messages" 
  ON public.contact_messages 
  FOR INSERT 
  WITH CHECK (true);

-- RLS policies for user_auth_details
CREATE POLICY "Users can view their own auth details" 
  ON public.user_auth_details 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own auth details" 
  ON public.user_auth_details 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own auth details" 
  ON public.user_auth_details 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS policies for checkout_transactions
CREATE POLICY "Users can view their own transactions" 
  ON public.checkout_transactions 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own transactions" 
  ON public.checkout_transactions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_user_auth_details_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_user_auth_details_updated_at
  BEFORE UPDATE ON public.user_auth_details
  FOR EACH ROW
  EXECUTE FUNCTION public.update_user_auth_details_updated_at();
