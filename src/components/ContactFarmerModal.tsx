
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Phone, MapPin, User, Droplets, Thermometer, MapIcon } from 'lucide-react';

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

interface ContactFarmerModalProps {
  isOpen: boolean;
  onClose: () => void;
  farm: Farm | null;
}

const ContactFarmerModal: React.FC<ContactFarmerModalProps> = ({ isOpen, onClose, farm }) => {
  if (!isOpen || !farm) return null;

  const handleCall = () => {
    window.location.href = `tel:${farm.contact}`;
  };

  const handleSMS = () => {
    window.location.href = `sms:${farm.contact}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full max-h-[90vh] overflow-y-auto">
        <Card className="shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl flex items-center">
              <User className="w-5 h-5 mr-2 text-green-600" />
              Farmer Profile
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Farmer Info */}
            <div className="flex items-center space-x-4">
              <img 
                src={farm.farmerPhoto} 
                alt={farm.farmer}
                className="w-16 h-16 rounded-full object-cover border-2 border-green-400"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{farm.farmer}</h3>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  {farm.location}
                </div>
                <Badge className="mt-1 bg-green-100 text-green-800">
                  Rating: {farm.rating}⭐
                </Badge>
              </div>
            </div>

            {/* Farm Details */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-gray-900">Farm Information</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">Farm:</span>
                  <span className="ml-2 font-medium">{farm.name}</span>
                </div>
                <div>
                  <span className="text-gray-600">Crop:</span>
                  <span className="ml-2 font-medium text-green-600">{farm.cropType}</span>
                </div>
                <div>
                  <span className="text-gray-600">Land Size:</span>
                  <span className="ml-2 font-medium">{farm.landSize} acres</span>
                </div>
                <div>
                  <span className="text-gray-600">Distance:</span>
                  <span className="ml-2 font-medium">{farm.distance}</span>
                </div>
              </div>
            </div>

            {/* Quality Metrics */}
            <div className="bg-blue-50 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-gray-900">Quality Metrics</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center">
                    <Droplets className="w-4 h-4 mr-2" />
                    Water Moisture
                  </span>
                  <span className="text-blue-600 font-semibold">{farm.waterMoisture}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center">
                    <Thermometer className="w-4 h-4 mr-2" />
                    Soil Quality
                  </span>
                  <Badge className="bg-green-600 text-white">
                    {farm.soilQuality}
                  </Badge>
                </div>
                <div>
                  <span className="text-gray-600">Water Source:</span>
                  <span className="ml-2 text-blue-600 font-medium">{farm.waterSource}</span>
                </div>
              </div>
            </div>

            {/* Story */}
            <div className="bg-amber-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Farmer's Story</h4>
              <p className="text-gray-700 italic">"{farm.story}"</p>
            </div>

            {/* Contact Actions */}
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-3 p-3 bg-green-50 rounded-lg">
                <Phone className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">{farm.contact}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={handleCall}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Button 
                  onClick={handleSMS}
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                >
                  <MapIcon className="w-4 h-4 mr-2" />
                  Send SMS
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactFarmerModal;
