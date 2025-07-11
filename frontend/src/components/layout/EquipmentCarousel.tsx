import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MACHINES } from '../../lib/constants';

const EquipmentCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Auto-slide every 4.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === MACHINES.length - 1 ? 0 : prevIndex + 1
      );
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? MACHINES.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === MACHINES.length - 1 ? 0 : currentIndex + 1);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }
  };

  return (
    <div className="relative">
      {/* Mobile View - Single Card */}
      <div className="block lg:hidden">
        <div 
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {MACHINES.map((equipment, index) => (
              <div key={index} className="w-full flex-shrink-0 px-2">
                <Card className="border-0 shadow-xl rounded-sm overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={equipment.image}
                        alt={equipment.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <Badge variant="secondary" className="bg-primary/10 text-primary rounded-sm mb-3">
                        {equipment.category}
                      </Badge>
                      <h3 className="text-xl font-bold text-secondary">{equipment.name}</h3>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {MACHINES.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Desktop View - Multiple Cards with Navigation */}
      <div className="hidden lg:block relative">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {MACHINES.map((equipment, index) => (
              <div key={index} className="w-1/3 flex-shrink-0 px-4">
                <Card className="border-0 shadow-xl rounded-sm overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardContent className="p-0">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={equipment.image}
                        alt={equipment.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <Badge variant="secondary" className="bg-primary/10 text-primary rounded-sm mb-3">
                        {equipment.category}
                      </Badge>
                      <h3 className="text-xl font-bold text-secondary">{equipment.name}</h3>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Navigation Arrows */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-sm"
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-sm"
          onClick={goToNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Desktop Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(MACHINES.length / 3) }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                Math.floor(currentIndex / 3) === index ? 'bg-primary' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index * 3)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EquipmentCarousel;
