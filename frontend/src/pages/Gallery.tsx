
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PROJECTS } from '@/lib/constants';
import EquipmentCarousel from '../components/layout/EquipmentCarousel';

const Gallery = () => {
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Projects & Equipments</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Explore our portfolio of completed projects showcasing our expertise across various engineering and construction sectors.
          </p>
        </div>
      </section>

      {/* Projects Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Project Showcase</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From road construction to pipeline engineering, discover the breadth and quality of our completed projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project, index) => (
              <Card key={index} className="border-0 shadow-xl rounded-sm overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-8">
                    <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary mb-6"></div>
                    <h3 className="text-2xl font-bold text-secondary mb-4">{project.title}</h3>
                    
                    <div className="space-y-3 text-gray-600">
                      <div className="flex justify-between">
                        <span className="font-semibold">Location:</span>
                        <span>{project.location}</span>
                      </div>
                     {project.area && <div className="flex justify-between">
                        <span className="font-semibold">Surface Area:</span>
                        <span>{project.area}</span>
                      </div>}
                     {project.date && <div className="flex justify-between">
                        <span className="font-semibold">Completion Date:</span>
                        <span>{project.date}</span>
                      </div>}
                      {project.client && <div className="flex justify-between">
                        <span className="font-semibold">Client:</span>
                        <span>{project.client}</span>
                      </div>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

        <section className="py-20 bg-accent/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Our Equipments</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              State-of-the-art machinery and equipment that enables us to deliver exceptional results across all our projects.
            </p>
          </div>

          <EquipmentCarousel />
        </div>
      </section>

      {/* Additional Project Categories */}
      <section className="py-20 bg-accent/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Project Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse project portfolio spans across multiple engineering and construction disciplines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg rounded-sm overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <img 
                  src="https://images.unsplash.com/photo-1563382454-400a632d7c4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5mcmFzdHJ1Y3R1cmUlMjBkZXYlMjBuaWdlcmlhfGVufDB8fDB8fHww?w=400&h=300&fit=crop"
                  alt="Infrastructure Projects"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-secondary mb-2">Infrastructure Development</h3>
                  <p className="text-gray-600">Roads, bridges, and essential infrastructure projects across Nigeria.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-sm overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <img 
                  src="https://images.unsplash.com/photo-1745725427797-d0b3e3b7a8af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Q1JVREUlMjBPSUwlMjBpbmZyYXN0cnVjdHVyZSUyMGRldiUyMG5pZ2VyaWF8ZW58MHx8MHx8fDA%3D?w=400&h=300&fit=crop"
                  alt="Oil & Gas Projects"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-secondary mb-2">Oil & Gas Facilities</h3>
                  <p className="text-gray-600">Pipeline construction, storage tanks, and petrochemical facilities.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-sm overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <img 
                  src="https://plus.unsplash.com/premium_photo-1661954406469-f2ed5ac1e0e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWFyaW5lJTIwaW5mcmFzdHJ1Y3R1cmUlMjBkZXYlMjBuaWdlcmlhfGVufDB8fDB8fHww?w=400&h=300&fit=crop"
                  alt="Marine Projects"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-secondary mb-2">Marine & Logistics</h3>
                  <p className="text-gray-600">Offshore installations, marine facilities, and logistics support.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Project Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Project Statistics</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Numbers that showcase our experience and commitment to delivering quality projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8">
              <div className="text-5xl font-bold text-primary mb-4">50+</div>
              <h3 className="text-xl font-semibold text-secondary mb-2">Projects Completed</h3>
              <p className="text-gray-600">Successfully delivered across various sectors</p>
            </div>

            <div className="text-center p-8">
              <div className="text-5xl font-bold text-primary mb-4">12+</div>
              <h3 className="text-xl font-semibold text-secondary mb-2">Years Experience</h3>
              <p className="text-gray-600">Combined leadership experience</p>
            </div>

            <div className="text-center p-8">
              <div className="text-5xl font-bold text-primary mb-4">100%</div>
              <h3 className="text-xl font-semibold text-secondary mb-2">Nigerian Owned</h3>
              <p className="text-gray-600">Indigenous company supporting local content</p>
            </div>

            <div className="text-center p-8">
              <div className="text-5xl font-bold text-primary mb-4">24/7</div>
              <h3 className="text-xl font-semibold text-secondary mb-2">Service Support</h3>
              <p className="text-gray-600">Round-the-clock project support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
