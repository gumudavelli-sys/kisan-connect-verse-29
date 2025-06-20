import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Droplets, Thermometer, Sprout, User, Phone } from 'lucide-react';

interface Farm {
  id: string;
  name: string;
  farmer: string;
  location: { lat: number; lng: number };
  cropType: string;
  soilCondition: string;
  waterMoisture: number;
  landSize: number;
  price: number;
  image: string;
  farmerPhoto: string;
  contact: string;
}

const SatelliteMap = () => {
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [mapView, setMapView] = useState('satellite');

  const farms: Farm[] = [
    {
      id: '1',
      name: 'Green Valley Farm',
      farmer: 'Rajesh Kumar',
      location: { lat: 28.6139, lng: 77.2090 },
      cropType: 'Wheat',
      soilCondition: 'Excellent',
      waterMoisture: 85,
      landSize: 5.2,
      price: 2500,
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=600&fit=crop',
      farmerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      contact: '+91 98765 43210'
    },
    {
      id: '2',
      name: 'Sunrise Organic Farm',
      farmer: 'Priya Sharma',
      location: { lat: 28.5139, lng: 77.1090 },
      cropType: 'Rice',
      soilCondition: 'Good',
      waterMoisture: 78,
      landSize: 3.8,
      price: 3200,
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop',
      farmerPhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b820?w=100&h=100&fit=crop&crop=face',
      contact: '+91 98765 43211'
    },
    {
      id: '3',
      name: 'Heritage Crops Farm',
      farmer: 'Suresh Patel',
      location: { lat: 28.7139, lng: 77.3090 },
      cropType: 'Sugarcane',
      soilCondition: 'Very Good',
      waterMoisture: 92,
      landSize: 7.5,
      price: 2800,
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&h=600&fit=crop',
      farmerPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      contact: '+91 98765 43212'
    }
  ];

  return (
    <div className="relative w-full h-screen bg-slate-900">
      {/* Map Container */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-green-900">
        {/* Satellite Map Background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=1920&h=1080&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'sepia(20%) hue-rotate(80deg) saturate(1.2)'
          }}
        />
        
        {/* Overlay pattern */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Grid overlay for map feel */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Farm Markers */}
        {farms.map((farm, index) => (
          <div
            key={farm.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{
              left: `${20 + index * 25}%`,
              top: `${30 + index * 20}%`
            }}
            onClick={() => setSelectedFarm(farm)}
          >
            <div className="relative">
              <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg group-hover:bg-green-400 transition-colors animate-pulse" />
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {farm.name}
              </div>
            </div>
          </div>
        ))}

        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <Button
            onClick={() => setMapView(mapView === 'satellite' ? 'terrain' : 'satellite')}
            className="bg-slate-800/80 hover:bg-slate-700 text-white backdrop-blur-sm"
          >
            {mapView === 'satellite' ? 'Terrain' : 'Satellite'}
          </Button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 text-white">
          <h3 className="font-semibold mb-2">Map Legend</h3>
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-sm">Active Farms</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full" />
            <span className="text-sm">Selected Farm</span>
          </div>
        </div>
      </div>

      {/* Farm Details Panel */}
      {selectedFarm && (
        <div className="absolute right-4 top-20 bottom-4 w-96 bg-slate-800/95 backdrop-blur-md rounded-lg shadow-2xl border border-green-800/30 overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={selectedFarm.image} 
                alt={selectedFarm.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-2xl font-bold">{selectedFarm.name}</h2>
                <p className="text-gray-300">{selectedFarm.cropType}</p>
              </div>
              <Button
                onClick={() => setSelectedFarm(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
                size="sm"
              >
                ×
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {/* Farmer Info */}
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src={selectedFarm.farmerPhoto} 
                  alt={selectedFarm.farmer}
                  className="w-12 h-12 rounded-full object-cover border-2 border-green-400"
                />
                <div>
                  <h3 className="text-white font-semibold">{selectedFarm.farmer}</h3>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Phone className="w-3 h-3 mr-1" />
                    {selectedFarm.contact}
                  </div>
                </div>
              </div>

              {/* Farm Metrics */}
              <div className="space-y-4">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 flex items-center">
                      <Droplets className="w-4 h-4 mr-2" />
                      Water Moisture
                    </span>
                    <span className="text-blue-400 font-semibold">{selectedFarm.waterMoisture}%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div 
                      className="bg-blue-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${selectedFarm.waterMoisture}%` }}
                    />
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 flex items-center">
                      <Thermometer className="w-4 h-4 mr-2" />
                      Soil Condition
                    </span>
                    <Badge className="bg-green-600 text-white">
                      {selectedFarm.soilCondition}
                    </Badge>
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Land Size
                    </span>
                    <span className="text-green-400 font-semibold">{selectedFarm.landSize} acres</span>
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 flex items-center">
                      <Sprout className="w-4 h-4 mr-2" />
                      Price per Quintal
                    </span>
                    <span className="text-amber-400 font-bold text-lg">₹{selectedFarm.price}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Order Direct from Farmer
                </Button>
                <Button variant="outline" className="w-full border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white">
                  Contact Farmer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SatelliteMap;
