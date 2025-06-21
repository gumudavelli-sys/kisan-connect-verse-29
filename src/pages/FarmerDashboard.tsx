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
      <Card className="bg-theme-white border-theme-brown">
        <CardHeader>
          <CardTitle className="text-theme-brown flex items-center space-x-2">
            <Camera className="w-5 h-5" />
            <span>Farm Profile</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-theme-dark-blue mb-2">Farm Name *</label>
              <Input 
                placeholder="e.g., Green Valley Farm" 
                className="border-theme-brown focus:border-theme-green"
                value={formData.farm_name}
                onChange={(e) => handleInputChange('farm_name', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-theme-dark-blue mb-2">Farmer Name *</label>
              <Input 
                placeholder="Your full name" 
                className="border-theme-brown focus:border-theme-green"
                value={formData.farmer_name}
                onChange={(e) => handleInputChange('farmer_name', e.target.value)}
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-theme-dark-blue mb-2">Farm Location *</label>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-theme-brown" />
              <Input 
                placeholder="Village, District, State" 
                className="border-theme-brown focus:border-theme-green"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-theme-dark-blue mb-2">Your Story</label>
            <Textarea 
              placeholder="Tell consumers about your farming journey, traditions, and values..."
              className="border-theme-brown focus:border-theme-green resize-none h-24"
              value={formData.story}
              onChange={(e) => handleInputChange('story', e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-theme-dark-blue mb-2">Land Size (acres)</label>
              <Input 
                type="number" 
                placeholder="5.2" 
                className="border-theme-brown focus:border-theme-green"
                value={formData.land_size}
                onChange={(e) => handleInputChange('land_size', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-theme-dark-blue mb-2">Soil Type</label>
              <select 
                className="w-full p-2 border border-theme-brown rounded-lg focus:border-theme-green focus:outline-none"
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
              <label className="block text-sm font-medium text-theme-dark-blue mb-2">Water Source</label>
              <select 
                className="w-full p-2 border border-theme-brown rounded-lg focus:border-theme-green focus:outline-none"
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
            className="w-full bg-theme-green hover:bg-theme-green/90 text-theme-white"
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
        <h2 className="text-2xl font-bold text-theme-green">Your Crops</h2>
        <Button className="bg-theme-green hover:bg-theme-green/90 text-theme-white">
          <Plus className="w-4 h-4 mr-2" />
          Add New Crop
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sample crop cards */}
        <Card className="bg-theme-white border-theme-green">
          <div className="h-48 bg-green-100 rounded-t-lg flex items-center justify-center">
            <Package className="w-16 h-16 text-theme-green" />
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-theme-green">Wheat</h3>
            <p className="text-sm text-theme-dark-blue">Ready for harvest</p>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between">
                <span className="text-sm">Price:</span>
                <Badge className="bg-theme-green text-theme-white">₹2,500/quintal</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Quantity:</span>
                <span className="text-sm font-medium">100 quintals</span>
              </div>
            </div>
            <Button className="w-full mt-3 bg-theme-green hover:bg-theme-green/90 text-theme-white text-sm">
              Update Listing
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-theme-white border-theme-brown">
          <div className="h-48 bg-yellow-100 rounded-t-lg flex items-center justify-center">
            <Package className="w-16 h-16 text-theme-brown" />
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-theme-brown">Rice</h3>
            <p className="text-sm text-theme-dark-blue">Growing season</p>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between">
                <span className="text-sm">Expected Price:</span>
                <Badge className="bg-theme-brown text-theme-white">₹3,200/quintal</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Expected Yield:</span>
                <span className="text-sm font-medium">80 quintals</span>
              </div>
            </div>
            <Button className="w-full mt-3 bg-theme-brown hover:bg-theme-brown/90 text-theme-white text-sm">
              Pre-book Orders
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const Analytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-theme-dark-blue">Farm Analytics</h2>
      
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-theme-white border-theme-dark-blue">
          <CardContent className="p-4 text-center">
            <DollarSign className="w-8 h-8 text-theme-dark-blue mx-auto mb-2" />
            <p className="text-2xl font-bold text-theme-dark-blue">₹45,200</p>
            <p className="text-sm text-gray-600">Total Earnings</p>
          </CardContent>
        </Card>
        
        <Card className="bg-theme-white border-theme-green">
          <CardContent className="p-4 text-center">
            <Package className="w-8 h-8 text-theme-green mx-auto mb-2" />
            <p className="text-2xl font-bold text-theme-green">180</p>
            <p className="text-sm text-gray-600">Quintals Sold</p>
          </CardContent>
        </Card>
        
        <Card className="bg-theme-white border-theme-brown">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-theme-brown mx-auto mb-2" />
            <p className="text-2xl font-bold text-theme-brown">24</p>
            <p className="text-sm text-gray-600">Active Orders</p>
          </CardContent>
        </Card>
        
        <Card className="bg-theme-white border-theme-green">
          <CardContent className="p-4 text-center">
            <BarChart3 className="w-8 h-8 text-theme-green mx-auto mb-2" />
            <p className="text-2xl font-bold text-theme-green">4.8★</p>
            <p className="text-sm text-gray-600">Rating</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-theme-white">
        <CardHeader>
          <CardTitle className="text-theme-dark-blue">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((order) => (
              <div key={order} className="flex justify-between items-center p-3 bg-white rounded-lg border border-theme-brown">
                <div>
                  <p className="font-medium">Order #ORD-{1000 + order}</p>
                  <p className="text-sm text-gray-600">Wheat - 5 quintals</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-theme-green">₹12,500</p>
                  <Badge className="text-xs bg-theme-green/10 text-theme-green">Completed</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-theme-white via-green-50 to-yellow-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-theme-green mb-2">Farmer Dashboard</h1>
          <p className="text-theme-dark-blue">Manage your farm, crops, and connect directly with consumers</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-theme-white rounded-lg p-1 shadow-sm">
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
                  ? 'bg-theme-green text-theme-white shadow-md'
                  : 'text-theme-dark-blue hover:bg-gray-100'
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
