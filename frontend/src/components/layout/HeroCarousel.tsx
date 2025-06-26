import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useSwipeable } from 'react-swipeable';
import { HERO_SLIDE_ITEMS } from '@/lib/constants';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === HERO_SLIDE_ITEMS.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDE_ITEMS.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const startAutoSlide = () => {
    stopAutoSlide();
    slideInterval.current = setInterval(nextSlide, 4500);
  };

  const stopAutoSlide = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
      slideInterval.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    trackMouse: true
  });

  return (
    <section 
      className="relative h-screen flex items-center justify-center bg-gradient-to-br from-secondary via-primary to-secondary overflow-hidden"
      {...swipeHandlers}
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-primary to-secondary"></div>
       
      {/* Background Slides */}
      <div className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {HERO_SLIDE_ITEMS.map((slide, index) => (
          <div 
            key={index}
            className="w-full h-full flex-shrink-0 relative"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
              style={{ 
                backgroundImage: `url(${slide.image})`,
                opacity: index === currentSlide ? 1 : 0
              }}
            />
                    <div className="absolute inset-0 bg-black/20"></div>

            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-secondary via-primary to-secondary"></div>
          </div>
        ))}
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto transition-all duration-1000 ease-in-out"
          style={{
            opacity: 1,
            transform: 'translateY(0)'
          }}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            {HERO_SLIDE_ITEMS[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto animate-fade-in">
            {HERO_SLIDE_ITEMS[currentSlide].subtext}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/services">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-sm px-8 py-4 text-lg">
                Our Services
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white bg-white/10 rounded-sm px-8 py-4 text-lg">
                Get A Quote
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-10">
        {HERO_SLIDE_ITEMS.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-6' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;