import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSwipeable } from "react-swipeable";

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const slides = [
    {
      title: "HSE is SBL Lifestyle",
      subtext:
        "It's not complete until it's SAFE. Every team member is a Safety Watcher.",
      image:
        "https://images.unsplash.com/photo-1722553260680-2a3486a06d73?w=1920&h=1080&fit=crop",
    },
    {
      title: "Improvement and Advancement on Execution",
      subtext:
        "Pivoting new innovation in Mechanical Upgrade and Fabrication Services for modern Oil and Gas project management",
      image:
        "https://images.unsplash.com/photo-1727504172743-08f14448fab8?w=1920&h=1080&fit=crop",
    },
    {
      title: "In SBL projects, Expertise meets Innovation",
      subtext:
        "Experiential know-how and specialization synergized with creativity, resulting in ultimate satisfaction.",
      image: "/uploads/p26.jpg",
    },
    {
      title: "Providing Project Solutions Steered by Quality",
      subtext:
        "Project management designed to meet global standards through customized competitive documentation processes.",
      image:
        "https://plus.unsplash.com/premium_photo-1663045861154-b42da4b72dd1?w=1920&h=1080&fit=crop",
    },
    {
      title: "Transforming Project Challenges into Opportunities",
      subtext:
        "SBL is established, prepared and continually upgraded in personnel, equipment and expertise to solve industry challenges.",
      image:
        "https://images.unsplash.com/photo-1664836443648-71bfcc3830a0?w=1920&h=1080&fit=crop",
    },
    {
      title: "Transforming Energy and Enhancing Lives",
      subtext:
        "Our existence catalyzes energy provision, bringing fulfillment to industrial comfort.",
      image: "/uploads/e26.jpg",
    },
  ];

  // Helpers
  const next = () => setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1));
  const prev = () => setCurrent((p) => (p === 0 ? slides.length - 1 : p - 1));
  const go = (i: number) => setCurrent(i);
  const start = () => {
    stop();
    timer.current = setInterval(next, 4500);
  };
  const stop = () => {
    if (timer.current) clearInterval(timer.current);
  };

  useEffect(() => {
    start();
    return stop;
  }, []);

  const swipe = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    preventScrollOnSwipe: false,
    trackTouch: true,
    trackMouse: false,
    delta: 10,
  });

  return (
    <section
      className="relative h-screen w-full overflow-hidden touch-pan-y"
      {...swipe}
      onMouseEnter={stop}
      onMouseLeave={start}
    >
      {/* Slides wrapper */}
      <div
        className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((s, i) => (
          <div
            key={i}
            className="min-w-full h-full relative bg-cover bg-center"
            style={{ backgroundImage: `url(${s.image})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70"></div> 
            {/* Content */}
            <div className="relative z-40 h-full flex items-center justify-center text-center text-white px-4">
              <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  {s.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200">
                  {s.subtext}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/services">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Our Services
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white bg-white/10 text-white hover:bg-white/20"
                    >
                      Get A Quote
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 inset-x-0 flex justify-center gap-2 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => go(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? "bg-white w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
