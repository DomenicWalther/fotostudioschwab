import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FullPageSlideshow = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoplay, images.length]);

  const handleUserInteraction = (action) => {
    setIsAutoplay(false);
    action();
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Slides */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${index === current ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <img
              src={image.url}
              alt={image.alt || `Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Optional: Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => handleUserInteraction(prevSlide)}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Vorheriges Bild"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <button
        onClick={() => handleUserInteraction(nextSlide)}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Nächstes Bild"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2 md:gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleUserInteraction(() => goToSlide(index))}
            className={`transition-all duration-300 rounded-full ${index === current
                ? 'w-8 md:w-10 h-2 md:h-2.5 bg-white'
                : 'w-2 md:w-2.5 h-2 md:h-2.5 bg-white/50 hover:bg-white/75'
              }`}
            aria-label={`Zu Bild ${index + 1}`}
          />
        ))}
      </div>

      {/* Optional: Image Counter */}
      <div className="absolute top-8 right-8 z-10 bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm md:text-base">
        {current + 1} / {images.length}
      </div>
    </div>
  );
};

// Example Usage
export default function App() {
  const demoImages = [
    {
      url: 'https://picsum.photos/1920/1080?random=1',
      alt: 'Hochzeitsfoto'
    },
    {
      url: 'https://picsum.photos/1920/1080?random=2',
      alt: 'Familienfoto'
    },
    {
      url: 'https://picsum.photos/1920/1080?random=3',
      alt: 'Portrait'
    },
    {
      url: 'https://picsum.photos/1920/1080?random=4',
      alt: 'Baby'
    },
    {
      url: 'https://picsum.photos/1920/1080?random=5',
      alt: 'Business Portrait'
    }
  ];

  return <FullPageSlideshow images={demoImages} />;
}