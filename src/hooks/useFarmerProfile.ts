
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FarmerProfileData {
  farm_name: string;
  farmer_name: string;
  location: string;
  story?: string;
  land_size?: number;
  soil_type?: string;
  water_source?: string;
  farm_photos?: string[];
}

export const useFarmerProfile = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const saveProfile = async (profileData: FarmerProfileData) => {
    setLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to save your profile.",
          variant: "destructive",
        });
        return false;
      }

      const { error } = await supabase
        .from('farmer_profiles')
        .upsert({
          user_id: user.id,
          ...profileData
        });

      if (error) {
        console.error('Error saving profile:', error);
        toast({
          title: "Error",
          description: "Failed to save profile. Please try again.",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Success!",
        description: "Your farm profile has been saved successfully.",
      });
      return true;

    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const loadProfile = async () => {
    setLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return null;

      const { data, error } = await supabase
        .from('farmer_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error loading profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Unexpected error loading profile:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    saveProfile,
    loadProfile,
    loading
  };
};
