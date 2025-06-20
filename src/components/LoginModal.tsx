
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Truck } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const LoginModal = ({ isOpen, onClose, onLogin }: LoginModalProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userType, setUserType] = useState('consumer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-green-800/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center text-green-400">
            {isSignUp ? 'Join FarmDirect' : 'Welcome Back'}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={userType} onValueChange={setUserType} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-700">
            <TabsTrigger value="consumer" className="data-[state=active]:bg-green-600">
              <User className="w-4 h-4 mr-2" />
              Consumer
            </TabsTrigger>
            <TabsTrigger value="farmer" className="data-[state=active]:bg-amber-600">
              <Truck className="w-4 h-4 mr-2" />
              Farmer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="consumer" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="Enter your name"
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email"
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password"
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    type="text" 
                    placeholder="City, State"
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="farmer" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="farmerName">Full Name</Label>
                    <Input 
                      id="farmerName" 
                      type="text" 
                      placeholder="Enter your name"
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="farmName">Farm Name</Label>
                    <Input 
                      id="farmName" 
                      type="text" 
                      placeholder="Enter your farm name"
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="farmLocation">Farm Location</Label>
                    <Input 
                      id="farmLocation" 
                      type="text" 
                      placeholder="Village, District, State"
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="farmerEmail">Email</Label>
                <Input 
                  id="farmerEmail" 
                  type="email" 
                  placeholder="Enter your email"
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="farmerPassword">Password</Label>
                <Input 
                  id="farmerPassword" 
                  type="password" 
                  placeholder="Enter your password"
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              >
                {isSignUp ? 'Register Farm' : 'Sign In'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="text-center pt-4">
          <p className="text-gray-400">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-green-400 hover:text-green-300 underline"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
