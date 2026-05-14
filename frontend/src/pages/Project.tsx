// app/projects/page.tsx
'use client';

import React from 'react';
import { PROJECTS } from '@/lib/constants';

const hydrocarbonProjects = [
  '/moremedia/proj1.jpg',
  '/moremedia/proj2.jpg',
  '/moremedia/proj3.JPG',
  '/moremedia/proj4.jpg',
  '/moremedia/proj5.jpg',
  '/moremedia/proj6.jpg',
];

const categories = [
  {
    title: 'Infrastructure Development',
    image:
      'https://images.unsplash.com/photo-1563382454-400a632d7c4e?w=1200&auto=format&fit=crop&q=80',
    desc:
      'Roads, bridges, and essential infrastructure projects across Nigeria.',
  },
  {
    title: 'Oil & Gas Facilities',
    image: '/newimages/Oil and gas pic(2).jpg',
    desc:
      'Pipeline construction, storage tanks, and petrochemical facilities.',
  },
  {
    title: 'Marine & Logistics',
    image: '/moremedia/marinelog.jpeg',
    desc:
      'Offshore installations, marine facilities, and logistics support.',
  },
];

const Project = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* HERO */}
      <section className="relative py-20 bg-gradient-to-br from-secondary to-primary text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/uploads/p25.jpg?w=1920&h=1080&fit=crop"
            alt="Projects Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-secondary/70 to-primary/70"></div>

        {/* Glow */}
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-primary/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-120px] right-[-100px] w-[350px] h-[350px] bg-secondary/40 rounded-full blur-3xl"></div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <div className="max-w-5xl mx-auto">
            <span className="inline-block mt-5 px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-sm uppercase tracking-[0.2em] mb-6">
              Engineering Excellence
            </span>

             <div className="container mx-auto px-4 relative text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Our Projects</h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
    Discover our portfolio of engineering, construction,
              hydrocarbon, marine, and infrastructure projects executed
              with precision, innovation, and industry-leading standards.          </p>
        </div>

          </div>
        </div>
      </section>

      {/* FEATURED VIDEO */}
      <section className="relative py-24 bg-gradient-to-b from-white to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold uppercase tracking-wider mb-4">
              Featured Project
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-5">
              Oily & Observation Pond Refurbishment
            </h2>

            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              PHRC Refinery — showcasing our expertise in hydrocarbon
              infrastructure rehabilitation and environmental engineering.
            </p>
          </div>

          {/* VIDEO WRAPPER */}
          <div className="relative max-w-6xl mx-auto">
            {/* Glow */}
            <div className="absolute inset-0 bg-primary/20 blur-3xl scale-95 rounded-[3rem]"></div>

            <div className="relative rounded-[2rem] overflow-hidden border border-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.25)] bg-black">
              <video
                controls
                preload="metadata"
                className="w-full h-auto object-cover"
                poster="/moremedia/proj1.jpg"
              >
                <source
                  src="/moremedia/pondVideo.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* HYDROCARBON PROJECT */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-semibold uppercase tracking-wider mb-4">
              Major Project
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-5">
              Hydrocarbon Pond Evacuation Works
            </h2>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A large-scale hydrocarbon pond evacuation and remediation
              project demonstrating our operational capacity, technical
              precision, and environmental safety standards.
            </p>
          </div>

          {/* BENTO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[230px] gap-5">
            {hydrocarbonProjects.map((image, index) => (
              <div
                key={index}
                className={`
                  group relative overflow-hidden rounded-[2rem]
                  shadow-2xl
                  ${
                    index === 0
                      ? 'md:col-span-2 md:row-span-2'
                      : index === 3
                      ? 'md:row-span-2'
                      : ''
                  }
                `}
              >
                {/* Image */}
                <img
                  src={image}
                  alt={`Hydrocarbon Pond Project ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                {/* Content */}
          {index === 0 && <div className="absolute bottom-0 left-0 p-6 z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-primary text-white text-xs uppercase tracking-wider mb-3">
              Hydrocarbon Works
            </span>

            <h3 className="text-white text-xl md:text-2xl font-bold leading-tight">
              Hydrocarbon Pond Evacuation
            </h3>

            <p className="text-gray-300 text-sm mt-2">
              Environmental remediation & evacuation operations.
            </p>
          </div>
}
                {/* Shine */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                  <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/20 rotate-12 blur-2xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER PROJECTS */}
      <section className="py-24 bg-accent/30">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold uppercase tracking-wider mb-4">
              Portfolio
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-5">
              Other Projects
            </h2>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From infrastructure development to marine and oil & gas
              operations, explore our diverse portfolio of completed
              engineering projects.
            </p>
          </div>

          {/* Dynamic Masonry */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5">
            {PROJECTS.map((project, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-[2rem] break-inside-avoid shadow-2xl"
              >
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className={`
                    w-full object-cover transition-transform duration-700 group-hover:scale-110
                    ${
                      index % 4 === 0
                        ? 'h-[550px]'
                        : index % 3 === 0
                        ? 'h-[420px]'
                        : 'h-[350px]'
                    }
                  `}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent flex items-end">
                  <div className="p-6 w-full">
                    {project.client && (
                      <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase bg-primary text-white rounded-full">
                        {project.client}
                      </span>
                    )}

                    <h3 className="text-white text-xl font-bold leading-tight">
                      {project.title}
                    </h3>

                    <div className="mt-3 space-y-1">
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

                {/* Shine */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                  <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/10 rotate-12 blur-2xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT CATEGORIES */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-semibold uppercase tracking-wider mb-4">
              Expertise
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-5">
              Project Categories
            </h2>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our expertise spans multiple engineering and construction
              disciplines across Nigeria’s industrial sectors.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-[2rem] shadow-2xl"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className={`
                    w-full object-cover transition-transform duration-700 group-hover:scale-110
                    ${index === 1 ? 'h-[520px]' : 'h-[420px]'}
                  `}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex items-end">
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase bg-primary text-white rounded-full">
                      Category
                    </span>

                    <h3 className="text-white text-2xl font-bold mb-3">
                      {item.title}
                    </h3>

                    <p className="text-gray-300 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Shine */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                  <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/10 rotate-12 blur-2xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-24 bg-gradient-to-br from-secondary to-primary text-white relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-black/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Heading */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-5">
              Project Statistics
            </h2>

            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Numbers that reflect our experience, technical capability,
              and commitment to excellence.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                value: '50+',
                title: 'Projects Completed',
                desc: 'Successfully delivered projects.',
              },
              {
                value: '12+',
                title: 'Years Experience',
                desc: 'Combined leadership experience.',
              },
              {
                value: '100%',
                title: 'Nigerian Owned',
                desc: 'Supporting local content growth.',
              },
              {
                value: '24/7',
                title: 'Service Support',
                desc: 'Round-the-clock operational support.',
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-[2rem] bg-white/10 border border-white/10 backdrop-blur-lg hover:scale-105 transition duration-500"
              >
                <div className="text-5xl font-extrabold text-white mb-4">
                  {stat.value}
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {stat.title}
                </h3>

                <p className="text-gray-200 text-sm">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Project;