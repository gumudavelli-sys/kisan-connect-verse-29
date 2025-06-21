
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Layers, Info, Filter, Download, Thermometer, Droplets } from 'lucide-react';
import Navbar from '@/components/Navbar';

// Define types for better TypeScript support
type CropData = {
  rice: number;
  cotton: number;
  maize: number;
  sugarcane: number;
  others: number;
};

type DetailedAreaData = {
  name: string;
  temperature: {
    current: number;
    min: number;
    max: number;
  };
  soilRate: number;
  soilType: string;
  fertility: string;
  moistureLevel: number;
  crops: CropData;
  coordinates: { x: number; y: number };
  size: number;
};

type CropDistributionData = {
  [key: string]: CropData;
};

const TelanganaMap2D = () => {
  const [selectedLayer, setSelectedLayer] = useState('crops');
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<DetailedAreaData | null>(null);

  // Sample crop distribution data for Telangana districts
  const cropData: CropDistributionData = {
    'Hyderabad': { rice: 15, cotton: 5, maize: 10, sugarcane: 8, others: 12 },
    'Warangal': { rice: 35, cotton: 25, maize: 15, sugarcane: 5, others: 20 },
    'Karimnagar': { rice: 40, cotton: 20, maize: 20, sugarcane: 10, others: 10 },
    'Khammam': { rice: 45, cotton: 15, maize: 10, sugarcane: 15, others: 15 },
    'Nalgonda': { rice: 30, cotton: 25, maize: 25, sugarcane: 5, others: 15 },
    'Mahbubnagar': { rice: 25, cotton: 30, maize: 20, sugarcane: 10, others: 15 },
    'Rangareddy': { rice: 20, cotton: 15, maize: 25, sugarcane: 20, others: 20 }
  };

  // Detailed area data with agricultural information
  const detailedAreas: DetailedAreaData[] = [
    {
      name: 'Hyderabad Urban',
      temperature: { current: 32, min: 18, max: 42 },
      soilRate: 6.8,
      soilType: 'Red Sandy Loam',
      fertility: 'Medium',
      moistureLevel: 45,
      crops: { rice: 15, cotton: 5, maize: 10, sugarcane: 8, others: 12 },
      coordinates: { x: 45, y: 55 },
      size: 8
    },
    {
      name: 'Warangal Agricultural Zone',
      temperature: { current: 35, min: 20, max: 44 },
      soilRate: 7.2,
      soilType: 'Black Cotton Soil',
      fertility: 'High',
      moistureLevel: 62,
      crops: { rice: 35, cotton: 25, maize: 15, sugarcane: 5, others: 20 },
      coordinates: { x: 65, y: 35 },
      size: 12
    },
    {
      name: 'Karimnagar Fertile Plains',
      temperature: { current: 34, min: 19, max: 43 },
      soilRate: 7.5,
      soilType: 'Alluvial Soil',
      fertility: 'Very High',
      moistureLevel: 68,
      crops: { rice: 40, cotton: 20, maize: 20, sugarcane: 10, others: 10 },
      coordinates: { x: 55, y: 25 },
      size: 10
    },
    {
      name: 'Khammam River Basin',
      temperature: { current: 33, min: 21, max: 41 },
      soilRate: 7.8,
      soilType: 'Riverine Alluvium',
      fertility: 'Very High',
      moistureLevel: 75,
      crops: { rice: 45, cotton: 15, maize: 10, sugarcane: 15, others: 15 },
      coordinates: { x: 70, y: 60 },
      size: 11
    },
    {
      name: 'Nalgonda Plateau',
      temperature: { current: 36, min: 22, max: 45 },
      soilRate: 6.5,
      soilType: 'Red Laterite',
      fertility: 'Medium',
      moistureLevel: 38,
      crops: { rice: 30, cotton: 25, maize: 25, sugarcane: 5, others: 15 },
      coordinates: { x: 55, y: 60 },
      size: 9
    },
    {
      name: 'Mahbubnagar Dryland',
      temperature: { current: 38, min: 24, max: 46 },
      soilRate: 6.2,
      soilType: 'Red Sandy',
      fertility: 'Low to Medium',
      moistureLevel: 32,
      crops: { rice: 25, cotton: 30, maize: 20, sugarcane: 10, others: 15 },
      coordinates: { x: 35, y: 70 },
      size: 10
    },
    {
      name: 'Rangareddy Mixed Zone',
      temperature: { current: 31, min: 17, max: 40 },
      soilRate: 7.0,
      soilType: 'Mixed Alluvial',
      fertility: 'High',
      moistureLevel: 58,
      crops: { rice: 20, cotton: 15, maize: 25, sugarcane: 20, others: 20 },
      coordinates: { x: 40, y: 60 },
      size: 8
    }
  ];

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

  const getCropColor = (cropType: keyof CropData) => {
    const colors = {
      rice: '#22C55E',
      cotton: '#F8FAFC',
      maize: '#EAB308',
      sugarcane: '#10B981',
      others: '#8B5CF6'
    };
    return colors[cropType] || '#6B7280';
  };

  const getSoilColor = (soilType: string) => {
    const colors: { [key: string]: string } = {
      'Red Sandy Loam': '#CD853F',
      'Black Cotton Soil': '#2F2F2F',
      'Alluvial Soil': '#D2B48C',
      'Riverine Alluvium': '#F4A460',
      'Red Laterite': '#A0522D',
      'Red Sandy': '#CD853F',
      'Mixed Alluvial': '#DEB887'
    };
    return colors[soilType] || '#8B4513';
  };

  const getFertilityColor = (fertility: string) => {
    const colors: { [key: string]: string } = {
      'Very High': '#22C55E',
      'High': '#84CC16',
      'Medium': '#EAB308',
      'Low to Medium': '#F97316',
      'Low': '#EF4444'
    };
    return colors[fertility] || '#6B7280';
  };

  const handleAreaClick = (area: DetailedAreaData) => {
    setSelectedArea(area);
    setSelectedDistrict(area.name);
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
            Interactive agricultural data visualization showing crop distribution, 
            soil analysis, temperature, and fertility patterns across Telangana districts
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
                    {(Object.keys(cropData['Warangal']) as Array<keyof CropData>).map((crop) => (
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
                {selectedLayer === 'soil' && (
                  <div className="space-y-2">
                    {['Red Sandy Loam', 'Black Cotton Soil', 'Alluvial Soil', 'Riverine Alluvium'].map((soil) => (
                      <div key={soil} className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded mr-2" 
                          style={{ backgroundColor: getSoilColor(soil) }}
                        />
                        <span className="text-gray-300 text-xs">{soil}</span>
                      </div>
                    ))}
                  </div>
                )}
                {selectedLayer === 'temperature' && (
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded mr-2 bg-red-600" />
                      <span className="text-gray-300 text-xs">High (35-46°C)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded mr-2 bg-orange-500" />
                      <span className="text-gray-300 text-xs">Medium (25-35°C)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded mr-2 bg-blue-500" />
                      <span className="text-gray-300 text-xs">Low (15-25°C)</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Detailed Area Info */}
            {selectedArea && (
              <Card className="bg-slate-800 border-theme-green/30">
                <CardHeader>
                  <CardTitle className="text-theme-white flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    {selectedArea.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Temperature */}
                  <div className="space-y-2">
                    <h4 className="text-theme-green font-semibold flex items-center">
                      <Thermometer className="mr-2 h-4 w-4" />
                      Temperature
                    </h4>
                    <div className="text-gray-300 text-sm space-y-1">
                      <div>Current: <span className="text-white">{selectedArea.temperature.current}°C</span></div>
                      <div>Range: <span className="text-white">{selectedArea.temperature.min}°C - {selectedArea.temperature.max}°C</span></div>
                    </div>
                  </div>

                  {/* Soil Information */}
                  <div className="space-y-2">
                    <h4 className="text-theme-green font-semibold">Soil Analysis</h4>
                    <div className="text-gray-300 text-sm space-y-1">
                      <div>Type: <span className="text-white">{selectedArea.soilType}</span></div>
                      <div>pH Rate: <span className="text-white">{selectedArea.soilRate}</span></div>
                      <div className="flex items-center">
                        <span>Fertility: </span>
                        <Badge 
                          className="ml-2 text-xs"
                          style={{ backgroundColor: getFertilityColor(selectedArea.fertility) }}
                        >
                          {selectedArea.fertility}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Moisture Level */}
                  <div className="space-y-2">
                    <h4 className="text-theme-green font-semibold flex items-center">
                      <Droplets className="mr-2 h-4 w-4" />
                      Moisture Level
                    </h4>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${selectedArea.moistureLevel}%` }}
                        />
                      </div>
                      <span className="text-white text-sm">{selectedArea.moistureLevel}%</span>
                    </div>
                  </div>

                  {/* Crop Distribution */}
                  <div className="space-y-2">
                    <h4 className="text-theme-green font-semibold">Crop Distribution</h4>
                    {(Object.entries(selectedArea.crops) as Array<[keyof CropData, number]>).map(([crop, percentage]) => (
                      <div key={crop} className="flex justify-between items-center">
                        <span className="text-gray-300 capitalize text-sm">{crop}:</span>
                        <Badge variant="secondary" className="text-xs">{percentage}%</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Map Area */}
          <div className="lg:col-span-3">
            <Card className="bg-slate-800 border-theme-green/30 h-[600px]">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-theme-white">
                  Interactive Agricultural Map - Click areas for details
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
                {/* Telangana State Outline with Satellite-like Background */}
                <div 
                  className="relative w-full h-full rounded-lg overflow-hidden cursor-pointer"
                  style={{
                    backgroundImage: `url(/lovable-uploads/fd3deb43-00b6-4256-8080-a6316459a7eb.png)`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)'
                  }}
                >
                  {/* SVG Map overlay */}
                  <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
                    {/* State boundary */}
                    <path
                      d="M20,20 L80,15 L85,40 L75,70 L65,85 L35,80 L15,60 Z"
                      fill="rgba(34, 197, 94, 0.05)"
                      stroke="#22C55E"
                      strokeWidth="0.3"
                    />
                    
                    {/* Detailed agricultural areas */}
                    {detailedAreas.map((area, index) => (
                      <g key={area.name}>
                        <circle
                          cx={area.coordinates.x}
                          cy={area.coordinates.y}
                          r={area.size}
                          fill={
                            selectedLayer === 'crops' ? getCropColor('rice') :
                            selectedLayer === 'soil' ? getSoilColor(area.soilType) :
                            selectedLayer === 'temperature' ? (area.temperature.current > 35 ? '#DC2626' : area.temperature.current > 25 ? '#F97316' : '#3B82F6') :
                            getFertilityColor(area.fertility)
                          }
                          stroke="#ffffff"
                          strokeWidth="0.5"
                          className="cursor-pointer hover:opacity-80 transition-all"
                          onClick={() => handleAreaClick(area)}
                          opacity="0.7"
                        />
                        <text
                          x={area.coordinates.x}
                          y={area.coordinates.y - area.size - 2}
                          textAnchor="middle"
                          className="fill-white text-xs font-medium pointer-events-none"
                          style={{ fontSize: '2.5px' }}
                        >
                          {area.name.split(' ')[0]}
                        </text>
                      </g>
                    ))}

                    {/* River systems */}
                    <path
                      d="M10,30 Q40,35 70,40 Q80,45 90,50"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="1"
                      opacity="0.8"
                    />
                    <path
                      d="M15,50 Q45,55 75,60"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="0.8"
                      opacity="0.8"
                    />
                  </svg>

                  {/* Overlay information */}
                  <div className="absolute top-4 left-4 space-y-2">
                    <Badge className="bg-theme-green text-white">
                      Active Layer: {layerOptions.find(l => l.id === selectedLayer)?.name}
                    </Badge>
                    <div className="text-xs text-gray-300 bg-black/70 p-2 rounded">
                      Click on colored areas for detailed agricultural information
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
                        {(Object.keys(cropData['Warangal']) as Array<keyof CropData>).map((crop) => (
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
