
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User, MapPin } from 'lucide-react';
import LoginModal from './LoginModal';

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <nav className="bg-slate-900/95 backdrop-blur-md border-b border-green-800/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-green-400" />
              <span className="text-xl font-bold text-white">FarmDirect</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Explore Farms</a>
              <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">For Farmers</a>
              <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">About</a>
              <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Contact</a>
            </div>

            {/* Login Button */}
            <div className="hidden md:flex">
              {!isLoggedIn ? (
                <Button 
                  onClick={() => setIsLoginOpen(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              ) : (
                <Button 
                  onClick={() => setIsLoggedIn(false)}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Dashboard
                </Button>
              )}
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-white hover:bg-slate-800">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-slate-900 border-green-800/30">
                <div className="flex flex-col space-y-4 mt-8">
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors py-2">Explore Farms</a>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors py-2">For Farmers</a>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors py-2">About</a>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors py-2">Contact</a>
                  <div className="pt-4">
                    {!isLoggedIn ? (
                      <Button 
                        onClick={() => setIsLoginOpen(true)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Login
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => setIsLoggedIn(false)}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                      >
                        Dashboard
                      </Button>
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
        onLogin={() => {
          setIsLoggedIn(true);
          setIsLoginOpen(false);
        }}
      />
    </>
  );
};

export default Navbar;
