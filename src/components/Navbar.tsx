import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Menu, User, MapPin, LogOut, Map, ShoppingCart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // Update cart count when component mounts and when storage changes
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('farmCart') || '[]');
      const totalItems = cart.reduce((total: number, item: any) => total + item.quantity, 0);
      setCartItemCount(totalItems);
    };

    updateCartCount();

    // Listen for storage changes
    window.addEventListener('storage', updateCartCount);
    
    // Custom event for cart updates
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleLogin = () => {
    setIsLoginOpen(false);
  };

  const handleFarmerClick = () => {
    navigate('/farmer-dashboard');
  };

  const handleConsumerClick = () => {
    navigate('/consumer-dashboard');
  };

  const handle2DMapClick = () => {
    navigate('/2d-map');
  };

  const handle3DMapClick = () => {
    navigate('/3d-map');
  };

  const handleAboutClick = () => {
    navigate('/about');
  };

  const handleContactClick = () => {
    navigate('/contact');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <>
      <nav className="bg-slate-900/95 backdrop-blur-md border-b border-green-800/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
              <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-green-400" />
              <span className="text-lg sm:text-xl font-bold text-white">FarmDirect</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
              <button 
                onClick={handleConsumerClick}
                className="text-gray-300 hover:text-green-400 transition-colors text-sm lg:text-base"
              >
                Explore Farms
              </button>
              <button 
                onClick={handleFarmerClick}
                className="text-gray-300 hover:text-green-400 transition-colors text-sm lg:text-base"
              >
                For Farmers
              </button>
              <button 
                onClick={handle2DMapClick}
                className="text-gray-300 hover:text-green-400 transition-colors text-sm lg:text-base flex items-center space-x-1"
              >
                <Map className="w-4 h-4" />
                <span>2D Map</span>
              </button>
              <button 
                onClick={handle3DMapClick}
                className="text-gray-300 hover:text-green-400 transition-colors text-sm lg:text-base flex items-center space-x-1"
              >
                <Map className="w-4 h-4" />
                <span>3D Map</span>
              </button>
              <button 
                onClick={handleAboutClick}
                className="text-gray-300 hover:text-green-400 transition-colors text-sm lg:text-base"
              >
                About
              </button>
              <button 
                onClick={handleContactClick}
                className="text-gray-300 hover:text-green-400 transition-colors text-sm lg:text-base"
              >
                Contact
              </button>
            </div>

            {/* Cart and Login/Logout Button - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Cart Button */}
              <Button
                onClick={handleCartClick}
                variant="ghost"
                className="relative text-gray-300 hover:text-green-400 hover:bg-slate-800"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[1.25rem] h-5 flex items-center justify-center"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>

              {loading ? (
                <div className="w-20 h-10 bg-slate-700 animate-pulse rounded-lg"></div>
              ) : !user ? (
                <Button 
                  onClick={() => setIsLoginOpen(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 lg:px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 text-sm lg:text-base"
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              ) : (
                <div className="flex items-center space-x-3">
                  <span className="text-green-400 text-sm lg:text-base">
                    Welcome, {user.email?.split('@')[0]}
                  </span>
                  <Button 
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 lg:px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 text-sm lg:text-base"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:bg-slate-800 transition-colors duration-200"
                >
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-slate-900 border-green-800/30 w-80 sm:w-96">
                <div className="flex flex-col space-y-6 mt-8">
                  <button 
                    onClick={handleConsumerClick}
                    className="text-gray-300 hover:text-green-400 transition-colors py-3 text-lg border-b border-slate-700 text-left"
                  >
                    Explore Farms
                  </button>
                  <button 
                    onClick={handleFarmerClick}
                    className="text-gray-300 hover:text-green-400 transition-colors py-3 text-lg border-b border-slate-700 text-left"
                  >
                    For Farmers
                  </button>
                  <button 
                    onClick={handle2DMapClick}
                    className="text-gray-300 hover:text-green-400 transition-colors py-3 text-lg border-b border-slate-700 text-left flex items-center space-x-2"
                  >
                    <Map className="w-5 h-5" />
                    <span>2D Map</span>
                  </button>
                  <button 
                    onClick={handle3DMapClick}
                    className="text-gray-300 hover:text-green-400 transition-colors py-3 text-lg border-b border-slate-700 text-left flex items-center space-x-2"
                  >
                    <Map className="w-5 h-5" />
                    <span>3D Map</span>
                  </button>
                  <button 
                    onClick={handleAboutClick}
                    className="text-gray-300 hover:text-green-400 transition-colors py-3 text-lg border-b border-slate-700 text-left"
                  >
                    About
                  </button>
                  <button 
                    onClick={handleContactClick}
                    className="text-gray-300 hover:text-green-400 transition-colors py-3 text-lg border-b border-slate-700 text-left"
                  >
                    Contact
                  </button>
                  
                  {/* Mobile Cart */}
                  <button 
                    onClick={handleCartClick}
                    className="text-gray-300 hover:text-green-400 transition-colors py-3 text-lg border-b border-slate-700 text-left flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <ShoppingCart className="w-5 h-5" />
                      <span>Cart</span>
                    </div>
                    {cartItemCount > 0 && (
                      <Badge className="bg-green-600 text-white">
                        {cartItemCount}
                      </Badge>
                    )}
                  </button>
                  
                  {/* Mobile Login/Logout */}
                  <div className="pt-6">
                    {loading ? (
                      <div className="w-full h-12 bg-slate-700 animate-pulse rounded-lg"></div>
                    ) : !user ? (
                      <Button 
                        onClick={() => setIsLoginOpen(true)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg rounded-lg transition-all duration-200 transform hover:scale-105"
                      >
                        <User className="w-5 h-5 mr-2" />
                        Login
                      </Button>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-center p-4 bg-slate-800 rounded-lg">
                          <p className="text-green-400 text-lg font-medium">
                            Welcome back!
                          </p>
                          <p className="text-gray-300 text-sm">
                            {user.email}
                          </p>
                        </div>
                        <Button 
                          onClick={handleLogout}
                          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg rounded-lg transition-all duration-200 transform hover:scale-105"
                        >
                          <LogOut className="w-5 h-5 mr-2" />
                          Logout
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />
    </>
  );
};

export default Navbar;
