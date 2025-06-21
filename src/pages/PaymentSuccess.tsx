
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been confirmed and will be processed shortly.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-700">
              You will receive an email confirmation with your order details and tracking information.
            </p>
          </div>
          
          <div className="space-y-2">
            <Button 
              onClick={() => navigate('/')} 
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Continue Shopping
            </Button>
            <Button 
              onClick={() => navigate('/consumer-dashboard')} 
              variant="outline"
              className="w-full"
            >
              View Orders
            </Button>
          </div>
          
          <p className="text-xs text-gray-500">
            Redirecting to home page in 5 seconds...
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
