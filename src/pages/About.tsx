
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Leaf, TrendingUp, Award, Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';

const About = () => {
  const stats = [
    { icon: Users, label: 'Farmers Connected', value: '2,500+' },
    { icon: Leaf, label: 'Sustainable Farms', value: '1,200+' },
    { icon: TrendingUp, label: 'Income Increase', value: '40%' },
    { icon: Award, label: 'Quality Assured', value: '100%' }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      bio: 'Former agricultural scientist with 15 years of experience in sustainable farming practices'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Farmer Relations',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b820?w=300&h=300&fit=crop&crop=face',
      bio: 'Rural development expert passionate about empowering farming communities'
    },
    {
      name: 'Arjun Patel',
      role: 'Technology Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: 'Tech innovator bridging the gap between traditional farming and modern solutions'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
      <Navbar />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Connecting Hearts, Harvests & Homes
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              FarmDirect is more than a marketplace - it's a movement to honor farmers, 
              preserve traditions, and create sustainable food systems that benefit everyone.
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-6">
                  We believe every farmer has a story worth telling and produce worth sharing. 
                  Our platform eliminates middlemen, ensuring fair prices for farmers while 
                  delivering authentic, traceable food to conscious consumers.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Heart className="w-6 h-6 text-red-500" />
                    <span className="text-gray-700">Dignity and fair prices for farmers</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Leaf className="w-6 h-6 text-green-500" />
                    <span className="text-gray-700">Sustainable and organic farming practices</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="w-6 h-6 text-blue-500" />
                    <span className="text-gray-700">Complete traceability and transparency</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&h=400&fit=crop"
                  alt="Farmer in field"
                  className="rounded-2xl shadow-lg w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <stat.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Story Section */}
          <div className="bg-gradient-to-r from-green-600 to-amber-600 rounded-3xl text-white p-8 mb-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg leading-relaxed mb-6">
                Born from the realization that farmers - the backbone of our society - 
                were struggling while middlemen profited, FarmDirect was created to restore 
                balance and dignity to agriculture. We started with a simple belief: 
                technology should serve humanity, not replace it.
              </p>
              <p className="text-lg leading-relaxed">
                Today, we're proud to be India's most trusted farm-to-table platform, 
                where every purchase supports a farming family and every meal tells a story 
                of sustainable agriculture and community empowerment.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <CardTitle className="text-xl text-gray-900">{member.name}</CardTitle>
                    <Badge variant="outline" className="mx-auto w-fit">
                      {member.role}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Compassion</h3>
                <p className="text-gray-600">Every farmer's story matters, and we listen with empathy and respect.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Transparency</h3>
                <p className="text-gray-600">Complete traceability from seed to table builds trust and quality.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Growth</h3>
                <p className="text-gray-600">We grow together - farmers, consumers, and communities.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
