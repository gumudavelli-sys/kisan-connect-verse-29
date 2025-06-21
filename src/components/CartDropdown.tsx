
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Plus, Minus, Trash2, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
  const { cartItems, isOpen, setIsOpen, removeFromCart, updateQuantity, getTotalItems, getTotalAmount } = useCart();
  const navigate = useNavigate();

  const handleViewCart = () => {
    setIsOpen(false);
    navigate('/cart');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-20" onClick={() => setIsOpen(false)}>
      <div 
        className="absolute top-16 right-4 w-96 max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Cart ({getTotalItems()} quintals)
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="max-h-96 overflow-y-auto">
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{item.cropType}</h4>
                      <p className="text-xs text-gray-600 truncate">{item.name}</p>
                      <p className="text-xs text-green-600">₹{item.price}/quintal</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-6 w-6 p-0"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <Badge variant="secondary" className="px-2 py-1">
                        {item.quantity}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-6 w-6 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-lg text-green-600">
                      ₹{getTotalAmount().toLocaleString()}
                    </span>
                  </div>
                  <Button 
                    onClick={handleViewCart}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    View Full Cart
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CartDropdown;
