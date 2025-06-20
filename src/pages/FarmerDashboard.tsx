import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Camera, MapPin, Plus, DollarSign, Package, BarChart3, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useFarmerProfile } from '@/hooks/useFarmerProfile';

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { saveProfile, loadProfile, loading } = useFarmerProfile();
  
  // Form state
  const [formData, setFormData] = useState({
    farm_name: '',
    farmer_name: '',
    location: '',
    story: '',
    land_size: '',
    soil_type: '',
    water_source: ''
  });

  // Load existing profile data on component mount
  useEffect(() => {
    const loadExistingProfile = async () => {
      const profile = await loadProfile();
      if (profile) {
        setFormData({
          farm_name: profile.farm_name || '',
          farmer_name: profile.farmer_name || '',
          location: profile.location || '',
          story: profile.story || '',
          land_size: profile.land_size?.toString() || '',
          soil_type: profile.soil_type || '',
          water_source: profile.water_source || ''
        });
      }
    };
    
    loadExistingProfile();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = async () => {
    // Basic validation
    if (!formData.farm_name.trim() || !formData.farmer_name.trim() || !formData.location.trim()) {
      return;
    }

    const profileData = {
      farm_name: formData.farm_name.trim(),
      farmer_name: formData.farmer_name.trim(),
      location: formData.location.trim(),
      story: formData.story.trim() || undefined,
      land_size: formData.land_size ? parseFloat(formData.land_size) : undefined,
      soil_type: formData.soil_type || undefined,
      water_source: formData.water_source || undefined
    };

    await saveProfile(profileData);
  };

  const ProfileSetup = () => (
    <div className="space-y-6">
      <Card className="bg-amber-50 border-amber-200">
        <CardHeader>
          <CardTitle className="text-amber-800 flex items-center space-x-2">
            <Camera className="w-5 h-5" />
            <span>Farm Profile</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Farm Name *</label>
              <Input 
                placeholder="e.g., Green Valley Farm" 
                className="border-amber-300 focus:border-amber-500"
                value={formData.farm_name}
                onChange={(e) => handleInputChange('farm_name', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Farmer Name *</label>
              <Input 
                placeholder="Your full name" 
                className="border-amber-300 focus:border-amber-500"
                value={formData.farmer_name}
                onChange={(e) => handleInputChange('farmer_name', e.target.value)}
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Farm Location *</label>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-amber-600" />
              <Input 
                placeholder="Village, District, State" 
                className="border-amber-300 focus:border-amber-500"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Story</label>
            <Textarea 
              placeholder="Tell consumers about your farming journey, traditions, and values..."
              className="border-amber-300 focus:border-amber-500 resize-none h-24"
              value={formData.story}
              onChange={(e) => handleInputChange('story', e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Land Size (acres)</label>
              <Input 
                type="number" 
                placeholder="5.2" 
                className="border-amber-300 focus:border-amber-500"
                value={formData.land_size}
                onChange={(e) => handleInputChange('land_size', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Soil Type</label>
              <select 
                className="w-full p-2 border border-amber-300 rounded-lg focus:border-amber-500 focus:outline-none"
                value={formData.soil_type}
                onChange={(e) => handleInputChange('soil_type', e.target.value)}
              >
                <option value="">Select soil type</option>
                <option value="Clay">Clay</option>
                <option value="Sandy">Sandy</option>
                <option value="Loamy">Loamy</option>
                <option value="Silt">Silt</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Water Source</label>
              <select 
                className="w-full p-2 border border-amber-300 rounded-lg focus:border-amber-500 focus:outline-none"
                value={formData.water_source}
                onChange={(e) => handleInputChange('water_source', e.target.value)}
              >
                <option value="">Select water source</option>
                <option value="Borewell">Borewell</option>
                <option value="Canal">Canal</option>
                <option value="River">River</option>
                <option value="Rainwater">Rainwater</option>
              </select>
            </div>
          </div>

          <Button 
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            onClick={handleSaveProfile}
            disabled={loading || !formData.farm_name.trim() || !formData.farmer_name.trim() || !formData.location.trim()}
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const CropManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">Your Crops</h2>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add New Crop
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sample crop cards */}
        <Card className="bg-green-50 border-green-200">
          <div className="h-48 bg-green-100 rounded-t-lg flex items-center justify-center">
            <Package className="w-16 h-16 text-green-600" />
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-green-800">Wheat</h3>
            <p className="text-sm text-gray-600">Ready for harvest</p>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between">
                <span className="text-sm">Price:</span>
                <Badge className="bg-green-600">₹2,500/quintal</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Quantity:</span>
                <span className="text-sm font-medium">100 quintals</span>
              </div>
            </div>
            <Button className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white text-sm">
              Update Listing
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <div className="h-48 bg-yellow-100 rounded-t-lg flex items-center justify-center">
            <Package className="w-16 h-16 text-yellow-600" />
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-yellow-800">Rice</h3>
            <p className="text-sm text-gray-600">Growing season</p>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between">
                <span className="text-sm">Expected Price:</span>
                <Badge className="bg-yellow-600">₹3,200/quintal</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Expected Yield:</span>
                <span className="text-sm font-medium">80 quintals</span>
              </div>
            </div>
            <Button className="w-full mt-3 bg-yellow-600 hover:bg-yellow-700 text-white text-sm">
              Pre-book Orders
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const Analytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-blue-800">Farm Analytics</h2>
      
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-800">₹45,200</p>
            <p className="text-sm text-gray-600">Total Earnings</p>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <Package className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-800">180</p>
            <p className="text-sm text-gray-600">Quintals Sold</p>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-800">24</p>
            <p className="text-sm text-gray-600">Active Orders</p>
          </CardContent>
        </Card>
        
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <BarChart3 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-orange-800">4.8★</p>
            <p className="text-sm text-gray-600">Rating</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-50">
        <CardHeader>
          <CardTitle className="text-slate-800">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((order) => (
              <div key={order} className="flex justify-between items-center p-3 bg-white rounded-lg border">
                <div>
                  <p className="font-medium">Order #ORD-{1000 + order}</p>
                  <p className="text-sm text-gray-600">Wheat - 5 quintals</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">₹12,500</p>
                  <Badge className="text-xs bg-green-100 text-green-800">Completed</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-green-50 to-yellow-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Farmer Dashboard</h1>
          <p className="text-gray-600">Manage your farm, crops, and connect directly with consumers</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm">
          {[
            { id: 'profile', label: 'Farm Profile', icon: Camera },
            { id: 'crops', label: 'Crop Management', icon: Package },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && <ProfileSetup />}
        {activeTab === 'crops' && <CropManagement />}
        {activeTab === 'analytics' && <Analytics />}
      </div>
    </div>
  );
};

export default FarmerDashboard;
