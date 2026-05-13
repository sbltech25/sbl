
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Award, CheckCircle, ShieldCheck } from 'lucide-react';
import { CERTIFICATIONS } from '../lib/constants';

const Certification = () => {
  const certs = CERTIFICATIONS.filter(c => c.type === 'certificate');
  const permits = CERTIFICATIONS.filter(c => c.type === 'permit');

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-secondary to-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1663296997689-f5e35ad7ac7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG9pbCUyMGFuZCUyMGdhcyUyMGVuZ2luZWVyaW5nJTIwTmlnZXJpYXxlbnwwfHwwfHx8MA%3D%3D?w=1920&h=1080&fit=crop"
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="container mx-auto px-4 relative text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Certifications, Licenses & Permits</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Our commitment to excellence is backed by industry-recognized certifications and regulatory compliance.
          </p>
        </div>
      </section>

      {/* ISO Certifications */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">ISO Certifications</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We maintain the highest standards through continuous certification and regulatory compliance across all our service areas.
            </p>
          </div>

         <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
  {certs.map((cert, index) => (
    <div
      key={index}
      className="break-inside-avoid overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-100 group hover:shadow-2xl transition-all duration-500"
    >
      {/* Image */}
      <div className="overflow-hidden bg-gray-100">
        <img
          src={cert.image}
          alt={cert.title}
          className="w-full object-contain group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <Badge className="bg-primary/10 text-primary rounded-full px-3 py-1">
            <CheckCircle className="w-3 h-3 mr-1" />
            Certified
          </Badge>

          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            {cert.date}
          </div>
        </div>

        <h3 className="text-xl font-bold text-secondary leading-snug mb-3">
          {cert.title}
        </h3>

        <p className="text-primary font-medium text-sm">
          {cert.issuer}
        </p>
      </div>
    </div>
  ))}
</div>
        </div>
      </section>

      {/* Permits & Licenses */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Permits & Licenses</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fully licensed and permitted by Nigerian regulatory authorities.
            </p>
          </div>

<div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
  {permits.map((permit, index) => (
    <div
      key={index}
      className="break-inside-avoid overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-100 group hover:shadow-2xl transition-all duration-500"
    >
      {/* Image */}
      <div className="overflow-hidden bg-gray-100">
        <img
          src={permit.image}
          alt={permit.title}
          className="w-full object-contain group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <Badge className="bg-green-100 text-green-700 rounded-full px-3 py-1">
            <ShieldCheck className="w-3 h-3 mr-1" />
            Licensed
          </Badge>

          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            {permit.date}
          </div>
        </div>

        <h3 className="text-xl font-bold text-secondary leading-snug mb-3">
          {permit.title}
        </h3>

        <p className="text-primary font-medium text-sm">
          {permit.issuer}
        </p>
      </div>
    </div>
  ))}
</div>

        </div>
      </section>

      {/* Compliance Statement */}
      <section className="py-20 bg-white">
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
