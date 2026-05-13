// app/projects/page.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PROJECTS } from '@/lib/constants';

const Project = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-secondary to-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0">
          <img
            src="/uploads/p25.jpg?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG9pbCUyMGFuZCUyMGdhcyUyMGVuZ2luZWVyaW5nJTIwTmlnZXJpYXxlbnwwfHwwfHx8MA%3D%3D?w=1920&h=1080&fit=crop"
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="container mx-auto px-4 relative text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Projects</h1>
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

          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {PROJECTS.map((project, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl break-inside-avoid shadow-xl"
              >
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                    index % 3 === 0 ? 'h-[500px]' : 'h-[350px]'
                  }`}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 group-hover:opacity-100 transition-all duration-500 flex items-end">
                  <div className="p-5 translate-y-0 group-hover:translate-y-0 transition-transform duration-500 w-full">
                    
                    {/* Client Badge */}
                    {project.client && (
                      <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider uppercase bg-primary text-white rounded-full">
                        {project.client}
                      </span>
                    )}

                    {/* Title */}
                    <h3 className="text-white text-lg font-bold leading-tight">
                      {project.title}
                    </h3>

                    {/* Details */}
                    <div className="mt-2 space-y-1">
                      <p className="text-gray-300 text-sm">
                        {project.location}
                      </p>

                      {project.area && (
                        <p className="text-gray-400 text-xs">
                          {project.area}
                        </p>
                      )}

                      {project.date && (
                        <p className="text-gray-400 text-xs">
                          {project.date}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Floating Shine */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                  <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/10 rotate-12 blur-2xl"></div>
                </div>
              </div>
            ))}
          </div>
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
                  src="/newimages/Oil and gas pic(2).jpg"
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
                  src="/uploads/e27.jpg"
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

export default Project;