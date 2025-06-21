
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { LeafLogo } from "./LeafLogo";
import { AuthModal } from "./AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { Badge } from "@/components/ui/badge";
import CartDropdown from "./CartDropdown";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, signOut } = useAuth();
  const { getTotalItems, isOpen: isCartOpen, setIsOpen: setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      setShowAuthModal(true);
    }
  };

  const handleUserProfile = () => {
    // Navigate to appropriate dashboard based on user type
    navigate('/consumer-dashboard');
  };

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const totalItems = getTotalItems();

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <LeafLogo className="h-8 w-8" />
                <span className="font-bold text-xl text-gray-900">AgriConnect</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-green-600 transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-green-600 transition-colors">
                About
              </Link>
              <Link to="/2d-map" className="text-gray-700 hover:text-green-600 transition-colors">
                Map
              </Link>
              <Link to="/3d-map" className="text-gray-700 hover:text-green-600 transition-colors">
                3D Map
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-green-600 transition-colors">
                Contact
              </Link>
              
              {/* Cart Icon */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  onClick={handleCartClick}
                  className="flex items-center space-x-2 relative"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-green-600 hover:bg-green-600"
                    >
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </div>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="ghost" 
                    onClick={handleUserProfile}
                    className="flex items-center space-x-2"
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleAuthAction}
                    className="flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </Button>
                </div>
              ) : (
                <Button onClick={handleAuthAction}>
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Mobile Cart Icon */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  onClick={handleCartClick}
                  className="flex items-center space-x-2 relative"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-green-600 hover:bg-green-600"
                    >
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </div>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-green-600 focus:outline-none focus:text-green-600"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <Link
                  to="/"
                  className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/2d-map"
                  className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Map
                </Link>
                <Link
                  to="/3d-map"
                  className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  3D Map
                </Link>
                <Link
                  to="/contact"
                  className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
                {user ? (
                  <>
                    <button
                      onClick={() => {
                        handleUserProfile();
                        setIsOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600 transition-colors"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        handleAuthAction();
                        setIsOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600 transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      handleAuthAction();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-green-600 font-medium"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
      
      <CartDropdown />
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};

export default Navbar;
