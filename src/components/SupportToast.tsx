
import { useToast } from '@/hooks/use-toast';

export const useSupportToast = () => {
  const { toast } = useToast();

  const showSupportMessage = () => {
    toast({
      title: "Support Request Received",
      description: "You'll get a call within 24 hrs",
      duration: 5000,
    });
  };

  return showSupportMessage;
};
