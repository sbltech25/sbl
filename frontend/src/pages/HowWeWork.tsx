
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { HOW_WE_WORK_STEPS } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

const HowWeWork = () => {
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">How We Work</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Step by step process of how we work to accomplish our goals and deliver exceptional results for our clients.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {HOW_WE_WORK_STEPS.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="flex items-start mb-12">
                  {/* Step Number */}
                  <div className="flex-shrink-0 mr-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {step.step}
                    </div>
                  </div>

                  {/* Step Content */}
                  <Card className="flex-1 border-0 shadow-xl rounded-sm overflow-hidden">
                    <CardContent className="p-0">
                      <div className="h-1 bg-gradient-to-r from-primary to-secondary"></div>
                      <div className="p-8">
                        <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-4">
                          Step {step.step}: {step.title}
                        </h3>
                        <p className="text-lg text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Connecting Line */}
                {index < HOW_WE_WORK_STEPS.length - 1 && (
                  <div className="absolute left-8 top-16 w-0.5 h-12 bg-gradient-to-b from-primary to-secondary transform -translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Benefits */}
      <section className="py-20 bg-accent/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Why Our Process Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our systematic approach ensures transparency, efficiency, and successful project delivery every time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-primary">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">Clear Objectives</h3>
              <p className="text-gray-600">
                Every project starts with clearly defined goals and expectations.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-primary">📊</span>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">Transparent Pricing</h3>
              <p className="text-gray-600">
                Detailed technical and commercial proposals with no hidden costs.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-primary">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">Efficient Execution</h3>
              <p className="text-gray-600">
                Streamlined processes ensure timely project completion.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-primary">💰</span>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">Milestone Payments</h3>
              <p className="text-gray-600">
                Flexible payment terms aligned with project milestones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-secondary to-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Experience Our Process?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Let us guide you through our proven methodology and deliver exceptional results for your next project.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center bg-white text-secondary hover:bg-gray-100 px-8 py-4 rounded-sm font-semibold text-lg transition-colors"
          >
            Start Your Project
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default HowWeWork;
