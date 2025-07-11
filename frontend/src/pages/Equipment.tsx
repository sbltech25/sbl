// app/equipment/page.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import EquipmentCarousel from '../components/layout/EquipmentCarousel';

const Equipment = () => {
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Equipment</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            State-of-the-art machinery and equipment that powers our engineering and construction capabilities.
          </p>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Our Equipment Fleet</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We maintain a modern fleet of specialized equipment to handle projects of any scale and complexity.
            </p>
          </div>

          <EquipmentCarousel />
        </div>
      </section>

      {/* Equipment Categories */}
      <section className="py-20 bg-accent/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Equipment Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our equipment spans across multiple categories to meet diverse project requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg rounded-sm overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <img 
                  src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29uc3RydWN0aW9uJTIwZXF1aXBtZW50fGVufDB8fDB8fHww?w=400&h=300&fit=crop"
                  alt="Earth Moving Equipment"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-secondary mb-2">Earth Moving Equipment</h3>
                  <p className="text-gray-600">Excavators, bulldozers, loaders, and graders for site preparation and earthworks.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-sm overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <img 
                  src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29uc3RydWN0aW9uJTIwZXF1aXBtZW50fGVufDB8fDB8fHww?w=400&h=300&fit=crop"
                  alt="Lifting Equipment"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-secondary mb-2">Lifting Equipment</h3>
                  <p className="text-gray-600">Cranes, hoists, and lifting gear for heavy material handling.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-sm overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <img 
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbnN0cnVjdGlvbiUyMGVxdWlwbWVudHxlbnwwfHwwfHx8MA%3D%3D?w=400&h=300&fit=crop"
                  alt="Pipelaying Equipment"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-secondary mb-2">Pipelaying Equipment</h3>
                  <p className="text-gray-600">Specialized machinery for pipeline installation and welding.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Equipment Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Equipment Statistics</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our equipment capabilities in numbers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8">
              <div className="text-5xl font-bold text-primary mb-4">100+</div>
              <h3 className="text-xl font-semibold text-secondary mb-2">Equipment Units</h3>
              <p className="text-gray-600">In our modern fleet</p>
            </div>

            <div className="text-center p-8">
              <div className="text-5xl font-bold text-primary mb-4">24/7</div>
              <h3 className="text-xl font-semibold text-secondary mb-2">Maintenance</h3>
              <p className="text-gray-600">Dedicated maintenance team</p>
            </div>

            <div className="text-center p-8">
              <div className="text-5xl font-bold text-primary mb-4">100%</div>
              <h3 className="text-xl font-semibold text-secondary mb-2">Compliance</h3>
              <p className="text-gray-600">With safety and regulatory standards</p>
            </div>

            <div className="text-center p-8">
              <div className="text-5xl font-bold text-primary mb-4">ISO</div>
              <h3 className="text-xl font-semibold text-secondary mb-2">Certified</h3>
              <p className="text-gray-600">Equipment management systems</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Equipment;