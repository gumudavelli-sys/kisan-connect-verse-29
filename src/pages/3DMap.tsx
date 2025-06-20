
import React from 'react';
import Navbar from '@/components/Navbar';

const ThreeDMap = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <div className="h-screen relative">
        <div className="absolute top-20 left-4 z-10 bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 text-white">
          <h2 className="text-xl font-bold mb-2">3D Satellite Map</h2>
          <p className="text-sm text-gray-300 mb-2">Interactive farm locations</p>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Active Farms</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-600 rounded"></div>
              <span>Houses</span>
            </div>
          </div>
        </div>

        {/* Temporary placeholder for 3D map */}
        <div className="w-full h-full bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center">
          <div className="text-center text-white">
            <h3 className="text-3xl font-bold mb-4">3D Satellite Map</h3>
            <p className="text-lg mb-6">Coming Soon - Interactive 3D Farm Visualization</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="w-8 h-8 bg-green-400 rounded-full mx-auto mb-2"></div>
                <p className="text-sm">Green Valley Farm</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="w-8 h-8 bg-amber-400 rounded mx-auto mb-2"></div>
                <p className="text-sm">Rural House</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="w-8 h-8 bg-green-400 rounded-full mx-auto mb-2"></div>
                <p className="text-sm">Sunrise Farm</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="w-8 h-8 bg-amber-400 rounded mx-auto mb-2"></div>
                <p className="text-sm">Village Center</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDMap;
