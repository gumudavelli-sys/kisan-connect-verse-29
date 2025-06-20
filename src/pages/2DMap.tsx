
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Layers, Info, Filter, Download } from 'lucide-react';
import Navbar from '@/components/Navbar';

const TelanganaMap2D = () => {
  const [selectedLayer, setSelectedLayer] = useState('crops');
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  // Sample crop distribution data for Telangana districts
  const cropData = {
    'Hyderabad': { rice: 15, cotton: 5, maize: 10, sugarcane: 8, others: 12 },
    'Warangal': { rice: 35, cotton: 25, maize: 15, sugarcane: 5, others: 20 },
    'Karimnagar': { rice: 40, cotton: 20, maize: 20, sugarcane: 10, others: 10 },
    'Khammam': { rice: 45, cotton: 15, maize: 10, sugarcane: 15, others: 15 },
    'Nalgonda': { rice: 30, cotton: 25, maize: 25, sugarcane: 5, others: 15 },
    'Mahbubnagar': { rice: 25, cotton: 30, maize: 20, sugarcane: 10, others: 15 },
    'Rangareddy': { rice: 20, cotton: 15, maize: 25, sugarcane: 20, others: 20 }
  };

  const layerOptions = [
    { id: 'crops', name: 'Crop Distribution', color: 'bg-green-500' },
    { id: 'soil', name: 'Soil Types', color: 'bg-amber-600' },
    { id: 'irrigation', name: 'Irrigation Systems', color: 'bg-blue-500' },
    { id: 'rainfall', name: 'Rainfall Patterns', color: 'bg-cyan-500' },
    { id: 'temperature', name: 'Temperature Zones', color: 'bg-red-500' }
  ];

  const districts = [
    { name: 'Hyderabad', x: 45, y: 55, area: 'urban' },
    { name: 'Warangal', x: 65, y: 35, area: 'rural' },
    { name: 'Karimnagar', x: 55, y: 25, area: 'rural' },
    { name: 'Khammam', x: 70, y: 60, area: 'rural' },
    { name: 'Nalgonda', x: 55, y: 60, area: 'rural' },
    { name: 'Mahbubnagar', x: 35, y: 70, area: 'rural' },
    { name: 'Rangareddy', x: 40, y: 60, area: 'mixed' }
  ];

  const getCropColor = (cropType) => {
    const colors = {
      rice: '#22C55E',
      cotton: '#F8FAFC',
      maize: '#EAB308',
      sugarcane: '#10B981',
      others: '#8B5CF6'
    };
    return colors[cropType] || '#6B7280';
  };

  return (
    <div className="min-h-screen bg-theme-dark-blue">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-theme-white mb-4">
            Telangana Agricultural Map - 2D View
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive agricultural data visualization showing crop distribution, 
            soil types, irrigation systems, and climate patterns across Telangana districts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map Controls */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="bg-slate-800 border-theme-green/30">
              <CardHeader>
                <CardTitle className="text-theme-white flex items-center">
                  <Layers className="mr-2 h-5 w-5" />
                  Map Layers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {layerOptions.map((layer) => (
                  <Button
                    key={layer.id}
                    variant={selectedLayer === layer.id ? "default" : "outline"}
                    className={`w-full justify-start ${
                      selectedLayer === layer.id 
                        ? 'bg-theme-green text-white' 
                        : 'text-gray-300 border-gray-600 hover:bg-slate-700'
                    }`}
                    onClick={() => setSelectedLayer(layer.id)}
                  >
                    <div className={`w-3 h-3 rounded-full ${layer.color} mr-2`} />
                    {layer.name}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Legend */}
            <Card className="bg-slate-800 border-theme-green/30">
              <CardHeader>
                <CardTitle className="text-theme-white flex items-center">
                  <Info className="mr-2 h-5 w-5" />
                  Legend
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedLayer === 'crops' && (
                  <div className="space-y-2">
                    {Object.keys(cropData['Warangal']).map((crop) => (
                      <div key={crop} className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded mr-2" 
                          style={{ backgroundColor: getCropColor(crop) }}
                        />
                        <span className="text-gray-300 capitalize">{crop}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* District Info */}
            {selectedDistrict && (
              <Card className="bg-slate-800 border-theme-green/30">
                <CardHeader>
                  <CardTitle className="text-theme-white">
                    {selectedDistrict} District
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {cropData[selectedDistrict] && (
                    <div className="space-y-2">
                      <h4 className="text-theme-green font-semibold">Crop Distribution:</h4>
                      {Object.entries(cropData[selectedDistrict]).map(([crop, percentage]) => (
                        <div key={crop} className="flex justify-between items-center">
                          <span className="text-gray-300 capitalize">{crop}:</span>
                          <Badge variant="secondary">{percentage}%</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Map Area */}
          <div className="lg:col-span-3">
            <Card className="bg-slate-800 border-theme-green/30 h-[600px]">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-theme-white">
                  Interactive Agricultural Map
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="text-gray-300 border-gray-600">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="text-gray-300 border-gray-600">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="relative h-full">
                {/* Telangana State Outline */}
                <div className="relative w-full h-full bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded-lg overflow-hidden">
                  {/* SVG Map of Telangana */}
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* State boundary */}
                    <path
                      d="M20,20 L80,15 L85,40 L75,70 L65,85 L35,80 L15,60 Z"
                      fill="rgba(34, 197, 94, 0.1)"
                      stroke="#22C55E"
                      strokeWidth="0.5"
                    />
                    
                    {/* District markers */}
                    {districts.map((district, index) => (
                      <g key={district.name}>
                        <circle
                          cx={district.x}
                          cy={district.y}
                          r="3"
                          fill={selectedLayer === 'crops' ? getCropColor('rice') : '#22C55E'}
                          stroke="#ffffff"
                          strokeWidth="0.5"
                          className="cursor-pointer hover:r-4 transition-all"
                          onClick={() => setSelectedDistrict(district.name)}
                        />
                        <text
                          x={district.x}
                          y={district.y - 5}
                          textAnchor="middle"
                          className="fill-white text-xs font-medium"
                          style={{ fontSize: '3px' }}
                        >
                          {district.name}
                        </text>
                      </g>
                    ))}

                    {/* River systems */}
                    <path
                      d="M10,30 Q40,35 70,40 Q80,45 90,50"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="1"
                      opacity="0.6"
                    />
                    <path
                      d="M15,50 Q45,55 75,60"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="0.8"
                      opacity="0.6"
                    />
                  </svg>

                  {/* Overlay information */}
                  <div className="absolute top-4 left-4 space-y-2">
                    <Badge className="bg-theme-green text-white">
                      Active Layer: {layerOptions.find(l => l.id === selectedLayer)?.name}
                    </Badge>
                    <div className="text-xs text-gray-300 bg-black/50 p-2 rounded">
                      Click on district markers for detailed information
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Tabs */}
            <div className="mt-6">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-slate-800">
                  <TabsTrigger value="overview" className="text-gray-300">Overview</TabsTrigger>
                  <TabsTrigger value="crops" className="text-gray-300">Crops</TabsTrigger>
                  <TabsTrigger value="climate" className="text-gray-300">Climate</TabsTrigger>
                  <TabsTrigger value="resources" className="text-gray-300">Resources</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-4">
                  <Card className="bg-slate-800 border-theme-green/30">
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <h3 className="text-2xl font-bold text-theme-green">33</h3>
                          <p className="text-gray-300">Total Districts</p>
                        </div>
                        <div className="text-center">
                          <h3 className="text-2xl font-bold text-theme-green">11.2M</h3>
                          <p className="text-gray-300">Hectares Agricultural Land</p>
                        </div>
                        <div className="text-center">
                          <h3 className="text-2xl font-bold text-theme-green">58%</h3>
                          <p className="text-gray-300">Irrigation Coverage</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="crops" className="mt-4">
                  <Card className="bg-slate-800 border-theme-green/30">
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {Object.keys(cropData['Warangal']).map((crop) => (
                          <div key={crop} className="text-center p-4 bg-slate-700 rounded-lg">
                            <div 
                              className="w-12 h-12 rounded-full mx-auto mb-2"
                              style={{ backgroundColor: getCropColor(crop) }}
                            />
                            <h4 className="text-theme-white font-semibold capitalize">{crop}</h4>
                            <p className="text-gray-300 text-sm">Major crop in region</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="climate" className="mt-4">
                  <Card className="bg-slate-800 border-theme-green/30">
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-theme-green font-semibold mb-3">Rainfall Patterns</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-300">Annual Average:</span>
                              <span className="text-white">900-1200mm</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Monsoon Season:</span>
                              <span className="text-white">June-September</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-theme-green font-semibold mb-3">Temperature</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-300">Summer Max:</span>
                              <span className="text-white">42-45°C</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-300">Winter Min:</span>
                              <span className="text-white">10-15°C</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="resources" className="mt-4">
                  <Card className="bg-slate-800 border-theme-green/30">
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-slate-700 rounded-lg">
                          <h4 className="text-theme-green font-semibold">Water Resources</h4>
                          <p className="text-gray-300 text-sm mt-2">Godavari & Krishna rivers</p>
                        </div>
                        <div className="text-center p-4 bg-slate-700 rounded-lg">
                          <h4 className="text-theme-green font-semibold">Soil Types</h4>
                          <p className="text-gray-300 text-sm mt-2">Red, Black, Alluvial soils</p>
                        </div>
                        <div className="text-center p-4 bg-slate-700 rounded-lg">
                          <h4 className="text-theme-green font-semibold">Infrastructure</h4>
                          <p className="text-gray-300 text-sm mt-2">Market connectivity</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelanganaMap2D;
