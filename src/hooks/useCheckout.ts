
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  farmName: string;
}

export const useCheckout = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const processCheckout = async (cartItems: CartItem[], totalAmount: number) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to complete your purchase.",
        variant: "destructive",
      });
      return false;
    }

    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('checkout_transactions')
        .insert({
          user_id: user.id,
          cart_items: cartItems as any, // Cast to any to match Json type
          total_amount: totalAmount,
          payment_status: 'completed'
        });

      if (error) {
        console.error('Error processing checkout:', error);
        toast({
          title: "Checkout Failed",
          description: "Failed to process your order. Please try again.",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Payment Successful!",
        description: "Your order has been processed successfully.",
      });
      return true;

    } catch (error) {
      console.error('Unexpected checkout error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during checkout.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    processCheckout,
    loading
  };
};
