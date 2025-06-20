
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Shield, Truck, Users, BarChart3, Smartphone } from 'lucide-react';

const FeatureSection = () => {
  const features = [
    {
      icon: MapPin,
      title: '3D Village Exploration',
      description: 'Navigate through real Indian villages in stunning 3D, discover farms, and connect with authentic farming communities.',
      color: 'text-green-400'
    },
    {
      icon: Shield,
      title: 'Direct Trade Security',
      description: 'Secure blockchain-based transactions that ensure fair pricing and eliminate middleman exploitation.',
      color: 'text-blue-400'
    },
    {
      icon: Truck,
      title: 'Farm-to-Door Delivery',
      description: 'Fresh crops delivered directly from farm to your doorstep with complete traceability and quality assurance.',
      color: 'text-amber-400'
    },
    {
      icon: Users,
      title: 'Farmer Empowerment',
      description: 'Farmers set their own prices, build direct relationships with customers, and receive 100% of the profits.',
      color: 'text-purple-400'
    },
    {
      icon: BarChart3,
      title: 'Real-time Farm Data',
      description: 'Access live soil conditions, water moisture levels, crop health metrics, and sustainability scores.',
      color: 'text-red-400'
    },
    {
      icon: Smartphone,
      title: 'AI-Powered Platform',
      description: 'Smart recommendations, multilingual support, and AI-driven crop descriptions for better decision making.',
      color: 'text-teal-400'
    }
  ];

  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=1920&h=1080&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Revolutionizing 
            <span className="text-green-400 block">Indian Agriculture</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our platform bridges the gap between farmers and consumers using cutting-edge technology 
            and sustainable practices that benefit everyone in the supply chain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg bg-slate-700/50 ${feature.color}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-green-600/20 to-amber-600/20 rounded-2xl p-8 border border-green-800/30">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Transform Agriculture?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of farmers and consumers who are already part of the direct-trade revolution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Start Exploring Farms
              </button>
              <button className="border border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Register Your Farm
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
