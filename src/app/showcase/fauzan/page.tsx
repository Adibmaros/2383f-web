"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <Footer />
    </div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">MyWebsite</h1>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
        <ul className={`md:flex gap-4 ${isOpen ? "block" : "hidden"} md:block`}>
          <li>
            <a href="#hero" className="hover:text-gray-400">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-gray-400">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-gray-400">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section id="hero" className="text-center py-20 bg-blue-500 text-white">
      <h2 className="text-4xl font-bold">Welcome to Our Website</h2>
      <p className="mt-2">We provide the best solutions for your needs.</p>
      <button className="mt-4 bg-white text-blue-500 px-4 py-2 rounded">Get Started</button>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-20 container mx-auto text-center">
      <h2 className="text-3xl font-bold">About Us</h2>
      <p className="mt-4 text-gray-600">We are a team of professionals providing top-notch services.</p>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-gray-800 text-white text-center py-4">
      <p>&copy; 2025 MyWebsite. All rights reserved.</p>
    </footer>
  );
}
