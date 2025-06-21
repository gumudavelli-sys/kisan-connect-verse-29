import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, MapPin, Droplets, Thermometer, Sprout, User, Phone, ShoppingCart, Plus, Minus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useCart } from '@/hooks/useCart';
import ContactFarmerModal from '@/components/ContactFarmerModal';

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
  waterMoisture: number;
  landSize: number;
}

const OrderDetails = () => {
  const { farmId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [showContactModal, setShowContactModal] = useState(false);

  // Mock farm data (in real app, this would come from API/props)
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
      waterSource: 'Borewell + Rainwater',
      waterMoisture: 85,
      landSize: 5.2
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
      waterSource: 'Canal + Drip irrigation',
      waterMoisture: 78,
      landSize: 3.8
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
      waterSource: 'River + Sprinkler system',
      waterMoisture: 92,
      landSize: 7.5
    }
  ];

  const farm = farms.find(f => f.id === farmId);

  if (!farm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
        <Navbar />
        <div className="pt-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Farm not found</h1>
            <Button onClick={() => navigate('/consumer-dashboard')}>
              Back to Farms
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: farm.id,
      name: farm.name,
      farmer: farm.farmer,
      cropType: farm.cropType,
      price: farm.price,
      quantity: orderQuantity,
      image: farm.image
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
      <Navbar />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Button 
            onClick={() => navigate('/consumer-dashboard')}
            variant="ghost" 
            className="mb-6 text-green-600 hover:text-green-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Farms
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Farm Images and Basic Info */}
            <div className="space-y-6">
              <Card className="overflow-hidden">
                <img 
                  src={farm.image} 
                  alt={farm.name}
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{farm.name}</h1>
                  <div className="flex items-center space-x-3 mb-4">
                    <img 
                      src={farm.farmerPhoto} 
                      alt={farm.farmer}
                      className="w-12 h-12 rounded-full object-cover border-2 border-green-400"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{farm.farmer}</h3>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        {farm.location}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{farm.story}"</p>
                </CardContent>
              </Card>

              {/* Farm Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">Farm Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600 flex items-center">
                          <Droplets className="w-4 h-4 mr-2" />
                          Water Moisture
                        </span>
                        <span className="text-blue-600 font-semibold">{farm.waterMoisture}%</span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${farm.waterMoisture}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 flex items-center">
                          <Thermometer className="w-4 h-4 mr-2" />
                          Soil Quality
                        </span>
                        <Badge className="bg-green-600 text-white">
                          {farm.soilQuality}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-600">Land Size:</span>
                      <span className="text-green-600 font-semibold ml-2">{farm.landSize} acres</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Water Source:</span>
                      <span className="text-blue-600 font-semibold ml-2">{farm.waterSource}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900 flex items-center">
                    <Sprout className="w-6 h-6 mr-2 text-green-600" />
                    {farm.cropType}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-amber-50 rounded-lg p-4">
                    <div className="text-center">
                      <span className="text-3xl font-bold text-amber-600">₹{farm.price}</span>
                      <span className="text-gray-600 ml-2">per quintal</span>
                    </div>
                    <p className="text-sm text-gray-600 text-center mt-2">
                      Available: {farm.quantity}
                    </p>
                  </div>

                  {/* Quantity Selector */}
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Quantity (quintals)
                    </label>
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setOrderQuantity(Math.max(1, orderQuantity - 1))}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Input
                        type="number"
                        min="1"
                        value={orderQuantity}
                        onChange={(e) => setOrderQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-20 text-center"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setOrderQuantity(orderQuantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-700">Total Amount:</span>
                      <span className="text-2xl font-bold text-green-600">
                        ₹{(farm.price * orderQuantity).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button 
                      onClick={handleAddToCart}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </Button>
                    <Button 
                      onClick={() => setShowContactModal(true)}
                      variant="outline" 
                      className="w-full border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white py-3"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Contact Farmer
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">{farm.contact}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <ContactFarmerModal 
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        farm={farm}
      />
    </div>
  );
};

export default OrderDetails;
