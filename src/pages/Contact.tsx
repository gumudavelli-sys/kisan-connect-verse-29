
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Mail, Clock, MessageCircle, Users, Headphones } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    userType: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Support',
      details: ['+91 98765 43210', '+91 98765 43211'],
      hours: 'Mon-Sat: 9AM-7PM'
    },
    {
      icon: Mail,
      title: 'Email Support',
      details: ['support@farmdirect.com', 'farmers@farmdirect.com'],
      hours: '24/7 Response'
    },
    {
      icon: MapPin,
      title: 'Office Address',
      details: ['123 Agriculture Hub', 'Hyderabad, Telangana 500001'],
      hours: 'Mon-Fri: 10AM-6PM'
    }
  ];

  const supportOptions = [
    {
      icon: Users,
      title: 'For Farmers',
      description: 'Get help with profile setup, crop listing, and payment issues',
      action: 'Contact Farmer Support'
    },
    {
      icon: MessageCircle,
      title: 'For Consumers',
      description: 'Assistance with orders, delivery tracking, and product queries',
      action: 'Contact Consumer Support'
    },
    {
      icon: Headphones,
      title: 'Technical Support',
      description: 'Help with app issues, account problems, and technical difficulties',
      action: 'Get Technical Help'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
      <Navbar />
      
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're here to help farmers and consumers connect better. 
              Reach out to us for support, partnerships, or just to share your story.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-700 font-medium mb-1">{detail}</p>
                  ))}
                  <div className="flex items-center justify-center mt-3 text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {info.hours}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Send us a Message</CardTitle>
                <p className="text-gray-600">We'll get back to you within 24 hours</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    <Select value={formData.userType} onValueChange={(value) => setFormData({...formData, userType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="I am a..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="farmer">Farmer</SelectItem>
                        <SelectItem value="consumer">Consumer</SelectItem>
                        <SelectItem value="partner">Business Partner</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Input
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                  
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    required
                  />
                  
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Support Options */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Support</h2>
              
              {supportOptions.map((option, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <option.icon className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.title}</h3>
                        <p className="text-gray-600 mb-4">{option.description}</p>
                        <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                          {option.action}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* FAQ Link */}
              <Card className="bg-gradient-to-r from-green-600 to-amber-600 text-white">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">Frequently Asked Questions</h3>
                  <p className="mb-4">Find quick answers to common questions</p>
                  <Button variant="outline" className="bg-white text-green-600 hover:bg-gray-50">
                    View FAQ
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12 mb-8">
            <Card className="overflow-hidden shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Visit Our Office</CardTitle>
                <p className="text-gray-600">Meet our team in person at our Hyderabad headquarters</p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-64 bg-gradient-to-r from-green-400 to-amber-400 flex items-center justify-center">
                  <div className="text-white text-center">
                    <MapPin className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg font-semibold">Interactive Map Coming Soon</p>
                    <p className="text-sm opacity-90">123 Agriculture Hub, Hyderabad, Telangana</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
