"use client";

import React from 'react';
import { PROJECTS, EQUIPMENT, GALLERY } from '@/lib/constants';
import TestimonialSlider from '@/components/sections/TestimonialSlider';
 
const galleryItems = [
  ...GALLERY.map((gallery, index) => ({
    id: `gallery-${index}`,
    image: gallery.image,
    title: 'Southern Basin Equipment',
    subtitle: 'Equipment',
    type: 'Project',
  })),
  ...EQUIPMENT.map((item, index) => ({
    id: `equipment-${index}`,
    image: item.image,
    title: item.name || 'Southern Basin Equipment',
    subtitle: item.category || 'Equipment',
    type: 'Equipment',
  })),
  ...PROJECTS.map((project, index) => ({
    id: `project-${index}`,
    image: project.image,
    title: project.title,
    subtitle: project.location,
    type: 'Project',
  })),
];

const Gallery = () => {
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Project Gallery</h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Visual showcase of our completed projects across various sectors and locations.
          </p>
        </div>
      </section>

      {/* Oily Pond Video Feature */}
      <section className="py-12 sm:py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-3">Featured Video</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Refurbishment of Oily &amp; Observation Ponds — PHRC Refinery
            </p>
          </div>
          <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl">
            <video
              controls
              className="w-full h-auto"
              preload="metadata"
            >
              <source src="/moremedia/pondVideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Full Project Gallery */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">Project Gallery</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Browse through our gallery
            </p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl break-inside-avoid shadow-lg"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                  <div className="p-5 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider uppercase bg-primary text-white rounded-full">
                      {item.type}
                    </span>
                  </div>
                </div>

                {/* Floating Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                  <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/10 rotate-12 blur-2xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Slider - Now using the exported component */}
      <TestimonialSlider />
    </div>
  );
};

export default Gallery;