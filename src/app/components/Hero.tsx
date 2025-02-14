import React from "react";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({
  title = "Sistem Informasi F",
  subtitle = "Persahabatan adalah ikatan tanpa syarat, di mana jiwa saling menemukan cerminan, dan kehadiran menjadi pelipur tanpa perlu kata-kata.🌿✨",
  primaryButtonText = "Get Started",
  secondaryButtonText = "Learn More",
  onPrimaryClick = () => {},
  onSecondaryClick = () => {},
}) => {
  return (
    <div className="relative overflow-hidden bg-gray-50">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          {/* Main Content */}
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6">{title}</h1>

            <p className="text-lg md:text-xl text-gray-600 mb-10">{subtitle}</p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={onPrimaryClick} className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
                {primaryButtonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>

              <button onClick={onSecondaryClick} className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
                {secondaryButtonText}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12">
              <p className="text-sm text-gray-500 mb-4">Trusted by leading companies</p>
              <div className="flex justify-center space-x-8">
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="h-8 w-24 bg-gray-200 rounded-md opacity-50" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-20 bg-gradient-to-t from-white to-transparent" />
      </div>
    </div>
  );
};

export default Hero;
