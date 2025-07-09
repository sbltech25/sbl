
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants';
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
       <section className="relative py-20 bg-gradient-to-br from-secondary to-primary text-white overflow-hidden">
        {/* Background Image with constrained dimensions */}
                <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1663296997689-f5e35ad7ac7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG9pbCUyMGFuZCUyMGdhcyUyMGVuZ2luZWVyaW5nJTIwTmlnZXJpYXxlbnwwfHwwfHx8MA%3D%3D?w=1920&h=1080&fit=crop"
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="container mx-auto px-4 relative text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Get in touch with our team for consultations, quotations, and project discussions. We're here to help 24/7.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-0 shadow-2xl rounded-sm">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-secondary mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="rounded-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="rounded-sm"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="rounded-sm"
                        placeholder="+234..."
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company
                      </label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        className="rounded-sm"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={19}
                      value={formData.message}
                      onChange={handleChange}
                      className="rounded-sm"
                      placeholder="Compose here..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-sm"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-secondary mb-6">Get in Touch</h2>
                <p className="text-lg text-gray-600 mb-8">
                  We're available 24/7 to discuss your engineering and construction needs. 
                  Contact us through any of the following channels:
                </p>
              </div>

              <div className="space-y-6">
                <Card className="border-0 shadow-lg rounded-sm overflow-hidden">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary mb-2">Head Office</h3>
                      <p className="text-gray-600">{COMPANY_INFO.address}</p>
                    </div>
                  </CardContent>
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary mb-2">Other Offices</h3>
                      <p className="text-gray-600">{COMPANY_INFO.addressi}</p>
                      <p className="text-gray-600">{COMPANY_INFO.addressii}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg rounded-sm overflow-hidden">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary mb-2">Phone Numbers</h3>
                      <p className="text-gray-600">{COMPANY_INFO.phone}</p>
                      <p className="text-gray-600">{COMPANY_INFO.alternatePhone}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg rounded-sm overflow-hidden">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary mb-2">Email</h3>
                      <p className="text-gray-600">{COMPANY_INFO.email}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg rounded-sm overflow-hidden">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary mb-2">Business Hours</h3>
                      <p className="text-gray-600">24/7 Support Available</p>
                      <p className="text-gray-600 text-sm">Emergency services available round the clock</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Social Links */}
              <div className="pt-8 border-t border-gray-200">
                <h3 className="font-semibold text-secondary mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a 
                    href={COMPANY_INFO.social.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    Facebook
                  </a>
                  <a 
                    href={COMPANY_INFO.social.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    Twitter
                  </a>
                  <a 
                    href={COMPANY_INFO.social.whatsapp} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
