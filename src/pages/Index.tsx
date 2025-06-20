
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SatelliteMap from '@/components/SatelliteMap';
import FeatureSection from '@/components/FeatureSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-theme-dark-blue">
      <Navbar />
      <HeroSection />
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-theme-white mb-4">
              Explore Village Map
            </h2>
            <p className="text-xl text-gray-300">
              Click on farm markers to discover authentic farming stories and fresh produce
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-theme-green/30">
            <SatelliteMap />
          </div>
        </div>
      </div>
      <FeatureSection />
    </div>
  );
};

export default Index;
