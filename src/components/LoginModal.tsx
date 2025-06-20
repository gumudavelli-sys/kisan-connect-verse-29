
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Truck, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const LoginModal = ({ isOpen, onClose, onLogin }: LoginModalProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userType, setUserType] = useState('consumer');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    farmName: '',
    location: ''
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name: formData.name,
              user_type: userType,
              farm_name: userType === 'farmer' ? formData.farmName : null,
              location: formData.location
            }
          }
        });

        if (error) {
          toast({
            title: "Sign Up Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Account Created!",
            description: "Please check your email to verify your account.",
          });
          onLogin();
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          toast({
            title: "Login Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You have successfully logged in.",
          });
          onLogin();
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      name: '',
      farmName: '',
      location: ''
    });
  };

  const handleModalClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogContent className="bg-slate-800 border-green-800/30 text-white max-w-md mx-4 sm:mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl text-center text-green-400">
            {isSignUp ? 'Join FarmDirect' : 'Welcome Back'}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={userType} onValueChange={setUserType} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-700 mb-6">
            <TabsTrigger 
              value="consumer" 
              className="data-[state=active]:bg-green-600 text-xs sm:text-sm transition-all duration-200"
            >
              <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Consumer
            </TabsTrigger>
            <TabsTrigger 
              value="farmer" 
              className="data-[state=active]:bg-amber-600 text-xs sm:text-sm transition-all duration-200"
            >
              <Truck className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Farmer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="consumer" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm">Full Name</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="Enter your name"
                    className="bg-slate-700 border-slate-600 text-white h-10 sm:h-11"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email"
                  className="bg-slate-700 border-slate-600 text-white h-10 sm:h-11"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password"
                  className="bg-slate-700 border-slate-600 text-white h-10 sm:h-11"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                />
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm">Location</Label>
                  <Input 
                    id="location" 
                    type="text" 
                    placeholder="City, State"
                    className="bg-slate-700 border-slate-600 text-white h-10 sm:h-11"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    required
                  />
                </div>
              )}

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white h-10 sm:h-11 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  isSignUp ? 'Create Account' : 'Sign In'
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="farmer" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="farmerName" className="text-sm">Full Name</Label>
                    <Input 
                      id="farmerName" 
                      type="text" 
                      placeholder="Enter your name"
                      className="bg-slate-700 border-slate-600 text-white h-10 sm:h-11"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="farmName" className="text-sm">Farm Name</Label>
                    <Input 
                      id="farmName" 
                      type="text" 
                      placeholder="Enter your farm name"
                      className="bg-slate-700 border-slate-600 text-white h-10 sm:h-11"
                      value={formData.farmName}
                      onChange={(e) => handleInputChange('farmName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="farmLocation" className="text-sm">Farm Location</Label>
                    <Input 
                      id="farmLocation" 
                      type="text" 
                      placeholder="Village, District, State"
                      className="bg-slate-700 border-slate-600 text-white h-10 sm:h-11"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      required
                    />
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="farmerEmail" className="text-sm">Email</Label>
                <Input 
                  id="farmerEmail" 
                  type="email" 
                  placeholder="Enter your email"
                  className="bg-slate-700 border-slate-600 text-white h-10 sm:h-11"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="farmerPassword" className="text-sm">Password</Label>
                <Input 
                  id="farmerPassword" 
                  type="password" 
                  placeholder="Enter your password"
                  className="bg-slate-700 border-slate-600 text-white h-10 sm:h-11"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white h-10 sm:h-11 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  isSignUp ? 'Register Farm' : 'Sign In'
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="text-center pt-4 border-t border-slate-700">
          <p className="text-gray-400 text-sm">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button 
              onClick={() => {
                setIsSignUp(!isSignUp);
                resetForm();
              }}
              className="text-green-400 hover:text-green-300 underline transition-colors duration-200"
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
