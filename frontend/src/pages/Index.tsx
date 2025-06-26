
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { COMPANY_INFO, SERVICES, PARTNERS } from '@/lib/constants';
import HeroCarousel from '@/components/layout/HeroCarousel';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroCarousel />
      {/* <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-secondary via-primary to-secondary overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1663296997689-f5e35ad7ac7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG9pbCUyMGFuZCUyMGdhcyUyMGVuZ2luZWVyaW5nJTIwTmlnZXJpYXxlbnwwfHwwfHx8MA%3D%3D?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20"></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Engineering Excellence in
              <span className="text-accent block mt-2">Oil & Gas Construction</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Indigenous Nigerian company providing specialized solutions in Civil Engineering, 
              Mechanical Fabrication, Marine Logistics, and Oil & Gas Services since {COMPANY_INFO.foundedYear}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-sm px-8 py-4 text-lg">
                  Explore Our Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" className="border-white bg-white text-secondary rounded-sm px-8 py-4 text-lg">
                  Get A Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      {/* Services Overview */}
      <section className="py-20 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
              Our Specialized Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive engineering solutions across multiple sectors, 
              delivering quality and innovation in every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 rounded-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                  <div className="p-8">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-2xl font-bold text-secondary mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <Link to={`/services#${service.id}`}>
                      <Button variant="ghost" className="text-primary hover:text-primary/80 p-0">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-10 px-3 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
                Why Choose Southern Basin Limited?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-secondary mb-2">100% Nigerian Ownership</h3>
                    <p className="text-gray-600">Indigenous company with complete Nigerian shareholding, supporting local content development.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-secondary mb-2">Proven Track Record</h3>
                    <p className="text-gray-600">Over 12 years of combined management experience in engineering construction and project management.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-secondary mb-2">Comprehensive Solutions</h3>
                    <p className="text-gray-600">End-to-end services from design and planning to execution and maintenance.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-secondary mb-2">Quality Assurance</h3>
                    <p className="text-gray-600">Commitment to delivering high-quality projects on time and within budget.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="animate-slide-in-right">
              <img 
                src="/uploads/index.jpg"
                alt="Engineering Excellence"
                className="w-full h-96 object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
              Our Trusted Partners
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We collaborate with leading organizations in the oil & gas and construction industries.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PARTNERS.map((partner, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 p-2 rounded-sm shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-42 h-32 rounded-full flex items-center justify-center mb-3 mx-auto overflow-hidden">
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="w-full h-full object-contain p-2" 
                      loading="lazy"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{partner.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#212685] to-[#006DFF] text-white">

        <div className="container mx-auto px-4 text-center">
               <div className="absolute inset-0 bg-black/70"></div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Let us handle your construction, engineering, and logistics needs with our proven expertise and commitment to excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-secondary hover:bg-gray-100 rounded-sm px-8 py-4 text-lg">
                Get Started Today
              </Button>
            </Link>
            {/* <Link to="/about">
              <Button size="lg" variant="outline" className="border-white bg-white text-secondary rounded-sm px-8 py-4 text-lg">
                Learn About Us
              </Button>
            </Link> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
