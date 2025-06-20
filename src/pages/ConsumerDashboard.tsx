
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Heart, ShoppingCart, Filter, Star, Phone, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import SatelliteMap from '@/components/SatelliteMap';

interface Farm {
  id: string;
  name: string;
  farmer: string;
  location: string;
  image: string;
  farmerPhoto: string;
  cropType: string;
  price: number;
  quantity: string;
  rating: number;
  distance: string;
  story: string;
  contact: string;
  soilQuality: string;
  waterSource: string;
}

const ConsumerDashboard = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedCrop, setSelectedCrop] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const farms: Farm[] = [
    {
      id: '1',
      name: 'Green Valley Organic Farm',
      farmer: 'Rajesh Kumar',
      location: 'Warangal, Telangana',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=600&fit=crop',
      farmerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      cropType: 'Organic Rice',
      price: 2500,
      quantity: '50 quintals',
      rating: 4.8,
      distance: '12 km',
      story: 'Three generations of sustainable farming practices',
      contact: '+91 98765 43210',
      soilQuality: 'Excellent',
      waterSource: 'Borewell + Rainwater'
    },
    {
      id: '2',
      name: 'Sunrise Heritage Farm',
      farmer: 'Priya Sharma',
      location: 'Nizamabad, Telangana',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop',
      farmerPhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b820?w=100&h=100&fit=crop&crop=face',
      cropType: 'Traditional Wheat',
      price: 3200,
      quantity: '30 quintals',
      rating: 4.9,
      distance: '8 km',
      story: 'Award-winning farmer preserving heirloom varieties',
      contact: '+91 98765 43211',
      soilQuality: 'Very Good',
      waterSource: 'Canal + Drip irrigation'
    },
    {
      id: '3',
      name: 'Golden Fields Farm',
      farmer: 'Suresh Patel',
      location: 'Karimnagar, Telangana',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&h=600&fit=crop',
      farmerPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      cropType: 'Sugarcane',
      price: 2800,
      quantity: '100 quintals',
      rating: 4.7,
      distance: '15 km',
      story: 'Modern techniques with traditional wisdom',
      contact: '+91 98765 43212',
      soilQuality: 'Good',
      waterSource: 'River + Sprinkler system'
    }
  ];

  const filteredFarms = farms.filter(farm => {
    const matchesSearch = farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farm.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farm.cropType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCrop = selectedCrop === 'all' || farm.cropType.toLowerCase().includes(selectedCrop.toLowerCase());
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === 'low' && farm.price < 2500) ||
                        (priceRange === 'medium' && farm.price >= 2500 && farm.price <= 3000) ||
                        (priceRange === 'high' && farm.price > 3000);
    
    return matchesSearch && matchesCrop && matchesPrice;
  });

  const handleOrderNow = (farmId: string) => {
    navigate(`/order/${farmId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
      <Navbar />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Authentic Farms
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect directly with farmers, discover their stories, and access fresh, traceable produce from sustainable farms
            </p>
          </div>

          {/* View Toggle & Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex gap-2">
                <Button
                  onClick={() => setViewMode('grid')}
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Grid View
                </Button>
                <Button
                  onClick={() => setViewMode('map')}
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Map View
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <Input
                  placeholder="Search farms, farmers, or crops..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64"
                />
                
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Crop Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Crops</SelectItem>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="sugarcane">Sugarcane</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="low">&lt; ₹2,500</SelectItem>
                    <SelectItem value="medium">₹2,500-3,000</SelectItem>
                    <SelectItem value="high">&gt; ₹3,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Content */}
          {viewMode === 'map' ? (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="h-[600px]">
                <SatelliteMap />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFarms.map((farm) => (
                <Card key={farm.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="relative">
                    <img 
                      src={farm.image} 
                      alt={farm.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-green-600 text-white">
                        Available Now
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-gray-900">{farm.name}</CardTitle>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">{farm.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 mt-2">
                      <img 
                        src={farm.farmerPhoto} 
                        alt={farm.farmer}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{farm.farmer}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin className="w-3 h-3 mr-1" />
                          {farm.location}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">{farm.cropType}</span>
                        <span className="text-lg font-bold text-green-600">₹{farm.price}/quintal</span>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <p>Available: {farm.quantity}</p>
                        <p className="mt-1 text-xs italic">"{farm.story}"</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                        <div>Soil: {farm.soilQuality}</div>
                        <div>Water: {farm.waterSource}</div>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button 
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={() => handleOrderNow(farm.id)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Order Now
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsumerDashboard;
