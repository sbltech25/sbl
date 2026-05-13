"use client";

import React, { useEffect, useRef } from 'react';

interface Testimonial {
  quote: string;
  name: string;
  position: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Southern Basin delivered exceptional execution quality and maintained strong project coordination throughout the entire construction phase.",
    name: "Adenegan Kolawole",
    position: "Construction Manager, TCM SPA",
  },
  {
    quote: "Their professionalism and technical expertise ensured smooth project delivery with strict adherence to safety and operational standards.",
    name: "Omatseye O.J.",
    position: "Manager, NNPC",
  },
  {
    quote: "The team demonstrated outstanding engineering capabilities and project management from planning to final execution.",
    name: "Chukwuemeka O.",
    position: "SAIPEM",
  },
  {
    quote: "Reliable project execution, responsive communication, and quality workmanship throughout the duration of our collaboration.",
    name: "Ugolo J.",
    position: "TOTAL E&P",
  },
  {
    quote: "Their dedication to timelines and attention to detail significantly contributed to the success of our steel fabrication operations.",
    name: "Ogolo W.",
    position: "Supasteel",
  },
  {
    quote: "Professional coordination and efficient delivery standards made working with Southern Basin a seamless experience.",
    name: "Cathy Wu",
    position: "PMC China",
  },
  {
    quote: "Excellent engineering support and strong technical understanding across all operational requirements.",
    name: "Evenly Xiang",
    position: "Hunan Standard Steel China",
  },
];

const TestimonialSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const startAutoScroll = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        if (isPausedRef.current) return;

        const cardWidth = (slider.children[0] as HTMLElement)?.offsetWidth || 400;
        const gap = window.innerWidth >= 768 ? 24 : 16;
        const scrollAmount = cardWidth + gap;

        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }, 3000);
    };

    startAutoScroll();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      } else {
        startAutoScroll();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const scrollToSlide = (index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;
    
    const cards = slider.children;
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const handlePrev = () => {
    const slider = sliderRef.current;
    if (slider) {
      slider.scrollBy({ left: -slider.offsetWidth, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    const slider = sliderRef.current;
    if (slider) {
      slider.scrollBy({ left: slider.offsetWidth, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-accent/20 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-14">
          <span className="inline-block px-3 py-1 md:px-4 md:py-1 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-semibold tracking-wide uppercase mb-3 md:mb-4">
            Testimonials
          </span>

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-secondary mb-3 md:mb-5">
            What Our Clients Say
          </h2>

          <p className="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto px-2">
            Trusted by leading organizations across construction, oil & gas,
            engineering, and industrial operations.
          </p>
        </div>

        {/* Slider */}
        <div className="max-w-5xl mx-auto relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 bg-white rounded-full shadow-xl items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 border border-gray-200"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 bg-white rounded-full shadow-xl items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 border border-gray-200"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slider Container */}
          <div
            ref={sliderRef}
            onMouseEnter={() => { isPausedRef.current = true; }}
            onMouseLeave={() => { isPausedRef.current = false; }}
            onTouchStart={() => { isPausedRef.current = true; }}
            onTouchEnd={() => { isPausedRef.current = false; }}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 md:gap-6 pb-8 -mx-4 px-4 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="snap-center shrink-0 w-[85vw] sm:w-[75vw] md:w-[60vw] lg:w-[45vw] xl:w-[40vw] max-w-xl first:ml-0 last:mr-0"
              >
                <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg md:shadow-2xl border border-gray-100 p-6 md:p-8 lg:p-12 h-full relative overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
                  {/* Background Glow */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 md:w-52 md:h-52 bg-primary/10 rounded-full blur-3xl group-hover:scale-125 transition duration-700"></div>

                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-4 md:mb-6 relative z-10">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-base md:text-xl">
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="relative z-10 mb-6 md:mb-10">
                    <p className="text-sm md:text-lg lg:text-xl leading-relaxed text-gray-700 text-center line-clamp-6 md:line-clamp-none">
                      <span className="text-primary/30 text-3xl md:text-4xl font-serif leading-none">"</span>
                      {testimonial.quote}
                      <span className="text-primary/30 text-3xl md:text-4xl font-serif leading-none">"</span>
                    </p>
                  </blockquote>

                  {/* User */}
                  <div className="flex flex-col items-center relative z-10 mt-auto">
                    {/* Avatar */}
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center text-base md:text-xl font-bold shadow-lg mb-3 md:mb-4 ring-4 ring-primary/10">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>

                    <h4 className="text-base md:text-xl font-bold text-secondary text-center">
                      {testimonial.name}
                    </h4>

                    <p className="text-gray-500 text-xs md:text-sm mt-1 text-center">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4 md:mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToSlide(i)}
                className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-gray-300 hover:bg-primary transition-all duration-300"
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;