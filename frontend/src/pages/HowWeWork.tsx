import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { HOW_WE_WORK_STEPS } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const HowWeWork = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

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

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 relative text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">How We Work</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Our proven methodology delivers exceptional results through a transparent, step-by-step approach.
          </p>
        </motion.div>
      </section>

      {/* Process Steps */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto"
          >
            {HOW_WE_WORK_STEPS.map((step, index) => (
              <motion.div 
                key={step.step} 
                variants={itemVariants}
                className="relative group"
              >
                <div className="flex flex-col md:flex-row items-start mb-8 gap-6">
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      Step {step.step}
                    </div>
                  </div>

                  {/* Step Content */}
                  <Card className="flex-1 border border-gray-100 shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <CardContent className="p-0">
                      <div className="h-2 bg-gradient-to-r from-primary to-secondary"></div>
                      <div className="p-8">
                        <div className="flex items-center gap-3 mb-4">
                          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-lg text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Connecting Line - Only shown between steps */}
                {index < HOW_WE_WORK_STEPS.length - 1 && (
                  <div className="hidden md:block absolute left-8 top-24 w-0.5 h-16 bg-gradient-to-b from-primary to-secondary opacity-60 group-hover:opacity-100 transition-opacity"></div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Why Our Process Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our systematic approach ensures transparency, efficiency, and successful project delivery every time.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🎯",
                title: "Clear Objectives",
                description: "Every project starts with clearly defined goals and expectations."
              },
              {
                icon: "📊",
                title: "Transparent Pricing",
                description: "Detailed technical and commercial proposals with no hidden costs."
              },
              {
                icon: "⚡",
                title: "Efficient Execution",
                description: "Streamlined processes ensure timely project completion."
              },
              {
                icon: "💰",
                title: "Milestone Payments",
                description: "Flexible payment terms aligned with project milestones."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl font-bold text-primary">{benefit.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-secondary mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-secondary to-primary text-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Experience Our Process?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Let us guide you through our proven methodology and deliver exceptional results for your next project.
          </p>
          <motion.a 
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center bg-white text-secondary hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all"
          >
            Start Your Project
            <ArrowRight className="ml-2 h-5 w-5" />
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
};

export default HowWeWork;