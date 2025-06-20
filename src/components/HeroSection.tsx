
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=1920&h=1080&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-10" />
      
      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Connecting Farmers
          <span className="text-green-400 block">Directly to You</span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Explore real Indian villages, meet authentic farmers, and buy fresh crops directly from the source. 
          No middlemen, just pure farm-to-table connection.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-lg transition-all transform hover:scale-105"
            onClick={() => navigate('/consumer-dashboard')}
          >
            Start Exploring Farms
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            className="border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white px-8 py-4 text-lg rounded-lg transition-all transform hover:scale-105"
            onClick={() => navigate('/farmer-dashboard')}
          >
            I'm a Farmer
          </Button>
        </div>
        
        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-green-400 mb-2">500+</div>
            <div className="text-gray-300">Active Farms</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-amber-400 mb-2">50K+</div>
            <div className="text-gray-300">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">25</div>
            <div className="text-gray-300">States Covered</div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <ArrowDown className="w-6 h-6 text-green-400 animate-bounce" />
      </div>
    </div>
  );
};

export default HeroSection;
