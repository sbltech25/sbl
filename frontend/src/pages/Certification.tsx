
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Award, CheckCircle, Download } from 'lucide-react';
import { CERTIFICATIONS } from '../lib/constants';

const Certification = () => {
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Certifications & Licenses</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Our commitment to excellence is backed by industry-recognized certifications and regulatory compliance.
          </p>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Our Credentials</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We maintain the highest standards through continuous certification and regulatory compliance across all our service areas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CERTIFICATIONS.map((cert, index) => (
              <Card key={index} className="border-0 shadow-xl rounded-sm overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="bg-primary/10 text-primary rounded-sm">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Certified
                      </Badge>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {cert.date}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-secondary mb-3">{cert.title}</h3>
                    <p className="text-primary font-medium mb-3">{cert.issuer}</p>
                    <p className="text-gray-600 text-md leading-relaxed">{cert.description}</p>
                
                    <div className="py-2">
                      <a href={`${cert.image}`} className="flex gap-2 text-secondary items-center" download={`Southern_Basin_Limited${cert.image}`}>
                        <Download className="w-4 h-4"/> Download Certificate
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Statement */}
      <section className="py-20 bg-accent/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">Regulatory Compliance</h2>
            <p className="text-xl text-gray-600 mb-8">
              Southern Basin Limited operates in full compliance with Nigerian regulatory standards and international best practices. 
              Our certifications demonstrate our commitment to quality, safety, and environmental responsibility.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-2">Quality Assured</h3>
                <p className="text-gray-600">ISO certified quality management systems</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-2">Fully Licensed</h3>
                <p className="text-gray-600">All required permits and regulatory approvals</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-2">Current & Valid</h3>
                <p className="text-gray-600">Regularly renewed and up-to-date certifications</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Certification;