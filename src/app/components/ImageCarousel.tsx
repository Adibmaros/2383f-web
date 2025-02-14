import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  images?: {
    url: string;
    alt: string;
    title?: string;
  }[];
  autoPlay?: boolean;
  interval?: number;
}

const defaultImages = [
  {
    url: "/api/placeholder/800/400",
    alt: "Slide 1",
    title: "Beautiful Mountain Landscape",
  },
  {
    url: "/api/placeholder/800/400",
    alt: "Slide 2",
    title: "Serene Beach Sunset",
  },
  {
    url: "/api/placeholder/800/400",
    alt: "Slide 3",
    title: "Urban City Life",
  },
];

const ImageCarousel: React.FC<CarouselProps> = ({ images = defaultImages, autoPlay = true, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (autoPlay && !isHovered) {
      timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      }, interval);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [autoPlay, interval, images.length, isHovered]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full md:max-w-4xl max-w-sm mx-auto" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* Main Image Container */}
      <div className="relative h-96 overflow-hidden rounded-xl">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-transform duration-500 ease-out ${index === currentIndex ? "translate-x-0" : "translate-x-full"}`}
            style={{
              transform: `translateX(${(index - currentIndex) * 100}%)`,
            }}
          >
            <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
            {image.title && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-white text-xl font-semibold">{image.title}</h3>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button onClick={goToPrevious} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110" aria-label="Previous slide">
        <ChevronLeft className="h-6 w-6 text-gray-800" />
      </button>

      <button onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110" aria-label="Next slide">
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${index === currentIndex ? "bg-white w-8" : "bg-white/60 hover:bg-white/80"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
