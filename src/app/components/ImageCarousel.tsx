"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play, Maximize2 } from "lucide-react";

interface CarouselProps {
  images?: {
    url: string;
    alt: string;
    title?: string;
    description?: string;
  }[];
  autoPlay?: boolean;
  interval?: number;
}

const defaultImages = [
  {
    url: "/photos/foto1.jpeg",
    alt: "Slide 1",
    title: "Last with Mr. Andi",
    description: "Momen perpisahan yang berkesan bersama dosen pembimbing",
  },
  {
    url: "/photos/foto2.jpeg",
    alt: "Slide 2",
    title: "Algoritma Days",
    description: "Hari-hari penuh tantangan dalam mempelajari algoritma",
  },
  {
    url: "/photos/foto3.jpg",
    alt: "Slide 3",
    title: "What a clothes!",
    description: "Gaya berpakaian yang unik dan berkarakter",
  },
  {
    url: "/photos/foto4.jpg",
    alt: "Slide 4",
    title: "Nice girls",
    description: "Teman-teman perempuan yang luar biasa",
  },
  {
    url: "/photos/foto5.jpg",
    alt: "Slide 5",
    title: "What the freak!",
    description: "Momen spontan yang tak terduga",
  },
  {
    url: "/photos/foto6.jpg",
    alt: "Slide 6",
    title: "HIMSI!",
    description: "Kegiatan bersama Himpunan Mahasiswa Sistem Informasi",
  },
  {
    url: "/photos/bukber.jpeg",
    alt: "Slide 7",
    title: "Bukber Kampoeng Kecil",
    description: "Bukber VVIP di Kampoeng Kecil KM 5",
  },
  {
    url: "/photos/jb1.jpeg",
    alt: "Slide 8",
    title: "Estafet Sedotan",
    description: "Acara akhir semester 4 di JB",
  },
  {
    url: "/photos/jb2.jpeg",
    alt: "Slide 9",
    title: "-",
    description: "Acara akhir semester 4 di JB",
  },
  {
    url: "/photos/jb3.jpeg",
    alt: "Slide 10",
    title: "-",
    description: "Acara akhir semester 4 di JB",
  },
];

const ImageCarousel: React.FC<CarouselProps> = ({ images = defaultImages, autoPlay = true, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Jangan intercept jika user sedang mengetik di input box (seperti chat)
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName || '')) {
        return;
      }

      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === " ") {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isPlaying]);

  // Auto-play logic
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPlaying && !isHovered) {
      timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      }, interval);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isPlaying, interval, images.length, isHovered]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
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

    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrevious();
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Main Carousel Container */}
      <div className="relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        {/* Image Container with improved responsive heights */}
        <div className="relative h-64 sm:h-80 md:h-96 lg:h-[32rem] xl:h-[36rem] overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl dark:shadow-gray-800/50 ring-1 ring-gray-200/50 dark:ring-gray-700/50">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-all duration-700 ease-out ${index === currentIndex ? "translate-x-0 opacity-100 scale-100" : "translate-x-full opacity-0 scale-105"}`}
              style={{
                transform: `translateX(${(index - currentIndex) * 100}%)`,
              }}
            >
              {/* Optimized Next.js Image component */}
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority={index === 0} // Priority untuk gambar pertama
                quality={85} // Kualitas optimal
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
                placeholder="blur" // Smooth loading
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />

              {/* Enhanced Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Image Info */}
              {(image.title || image.description) && (
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  {image.title && <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-bold mb-2 drop-shadow-lg">{image.title}</h3>}
                  {image.description && <p className="text-white/90 text-sm sm:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 drop-shadow-md max-w-2xl">{image.description}</p>}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Enhanced Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 shadow-xl dark:shadow-gray-900/50 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800 dark:text-gray-200" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 shadow-xl dark:shadow-gray-900/50 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800 dark:text-gray-200" />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="absolute top-2 sm:top-4 right-2 sm:right-4 p-2 sm:p-3 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 shadow-xl dark:shadow-gray-900/50 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? <Pause className="h-4 w-4 sm:h-5 sm:w-5 text-gray-800 dark:text-gray-200" /> : <Play className="h-4 w-4 sm:h-5 sm:w-5 text-gray-800 dark:text-gray-200" />}
        </button>
      </div>

      {/* Enhanced Indicators */}
      <div className="flex justify-center items-center mt-6 sm:mt-8 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${index === currentIndex ? "bg-blue-600 dark:bg-blue-400 w-8 sm:w-10 h-2.5 sm:h-3" : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 w-2.5 sm:w-3 h-2.5 sm:h-3"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      {isPlaying && (
        <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 overflow-hidden">
          <div
            key={currentIndex} // Restart animation on index change
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            style={{
              width: "100%",
              animation: `progress ${interval}ms linear forwards`,
            }}
          />
        </div>
      )}

      {/* Thumbnail Navigation for larger screens */}
      <div className="hidden lg:flex justify-center mt-8 space-x-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`flex-shrink-0 relative w-20 h-14 rounded-lg overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${index === currentIndex ? "ring-2 ring-blue-500 scale-110" : "opacity-60 hover:opacity-100 hover:scale-105"
              }`}
          >
            {/* Optimized thumbnail images */}
            <Image
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="80px"
              quality={60} // Lower quality untuk thumbnail
            />
            {index === currentIndex && <div className="absolute inset-0 bg-blue-500/20" />}
          </button>
        ))}
      </div>

      {/* Image Counter */}
      <div className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-medium">{currentIndex + 1}</span>
        <span className="mx-2">/</span>
        <span>{images.length}</span>
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ImageCarousel;
