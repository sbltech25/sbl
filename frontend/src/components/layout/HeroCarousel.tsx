import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const heroSlides = [
  {
    title: "Excellence in Civil Engineering",
    subtitle: "Quality Civil Engineering",
    description: "Leading the way in infrastructure development with innovative solutions and sustainable practices for Nigeria's growing construction needs.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&h=1080&fit=crop",
    cta: "Our Civil Engineering Services"
  },
  {
    title: "Innovative Design & Planning",
    subtitle: "Design & Planning",
    description: "Creating comprehensive design solutions that enhance and sustain built environments through expert planning and architectural excellence.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&h=1080&fit=crop",
    cta: "Explore Our Designs"
  },
  {
    title: "Marine & Logistics Excellence",
    subtitle: "Marine & Logistics",
    description: "Providing 24/7 marine support services with a comprehensive fleet and specialized logistics solutions for the oil & gas industry.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&h=1080&fit=crop",
    cta: "Marine Services"
  },
  {
    title: "Advanced Oil & Gas Services",
    subtitle: "Oil & Gas Services",
    description: "Specialized solutions for the petroleum industry with over 12 years of combined management experience in engineering construction.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=1080&fit=crop",
    cta: "Oil & Gas Solutions"
  }
];

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      <Carousel className="w-full h-full">
        <CarouselContent className="h-full">
          {heroSlides.map((slide, index) => (
            <CarouselItem key={index} className={`h-full ${index === currentSlide ? 'block' : 'hidden'}`}>
              <div className="relative h-full flex items-center justify-center bg-gradient-to-br from-secondary via-primary to-secondary">
                <div className="absolute inset-0 bg-black/40"></div>
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-30 transition-opacity duration-1000"
                  style={{ backgroundImage: `url(${slide.image})` }}
                ></div>
                
                <div className="relative z-10 container mx-auto px-4 text-center text-white">
                  <div className="max-w-4xl mx-auto animate-fade-in">
                    <div className="text-accent text-xl md:text-2xl font-medium mb-4 animate-slide-in-left">
                      {slide.subtitle}
                    </div>
                    <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-3xl mx-auto animate-slide-in-right">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                      <Link to="/services">
                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-sm px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300">
                          {slide.cta}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                      <Link to="/contact">
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-secondary rounded-sm px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300">
                          Get Quote
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
