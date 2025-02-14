"use client";

import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ImageCarousel from "./components/ImageCarousel";
import Navbar from "./components/Navbar";

const page = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div>
        <Hero />
        <ImageCarousel />
        <Footer />
      </div>
    </div>
  );
};

export default page;
