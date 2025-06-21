
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer, Cloud, MapPin } from 'lucide-react';

interface MapPopupProps {
  isOpen: boolean;
  onClose: () => void;
  location: string;
}

export const MapPopup = ({ isOpen, onClose, location }: MapPopupProps) => {
  const [weatherData] = useState({
    temperature: Math.floor(Math.random() * 15) + 20, // 20-35°C
    condition: ['Sunny', 'Partly Cloudy', 'Clear', 'Warm'][Math.floor(Math.random() * 4)],
    humidity: Math.floor(Math.random() * 30) + 50, // 50-80%
  });

  const farmingAreas = [
    'Rice Cultivation Areas',
    'Cotton Growing Regions',
    'Sugarcane Plantations',
    'Vegetable Farming Zones',
    'Fruit Orchards',
    'Spice Growing Areas'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-600" />
            {location} Region
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-red-500" />
                Weather Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Temperature:</span>
                <span className="font-semibold">{weatherData.temperature}°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Condition:</span>
                <span className="font-semibold">{weatherData.condition}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Humidity:</span>
                <span className="font-semibold">{weatherData.humidity}%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Cloud className="h-5 w-5 text-green-500" />
                Popular Farming Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {farmingAreas.slice(0, 4).map((area, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    {area}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
