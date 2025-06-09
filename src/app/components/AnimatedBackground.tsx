"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

export default function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);

  const colors = ["#3B82F6", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      setParticles(newParticles);
    };

    generateParticles();

    const handleResize = () => {
      generateParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const animateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let newX = particle.x + particle.speedX;
          let newY = particle.y + particle.speedY;

          // Bounce off edges
          if (newX <= 0 || newX >= window.innerWidth) {
            particle.speedX = -particle.speedX;
            newX = particle.x + particle.speedX;
          }
          if (newY <= 0 || newY >= window.innerHeight) {
            particle.speedY = -particle.speedY;
            newY = particle.y + particle.speedY;
          }

          // Mouse interaction
          const dx = mousePosition.x - newX;
          const dy = mousePosition.y - newY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const force = (100 - distance) / 100;
            newX -= (dx / distance) * force * 2;
            newY -= (dy / distance) * force * 2;
          }

          return {
            ...particle,
            x: newX,
            y: newY,
          };
        })
      );

      animationRef.current = requestAnimationFrame(animateParticles);
    };

    animationRef.current = requestAnimationFrame(animateParticles);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition]);

  return (
    <>
      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.opacity,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -100, 100, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className={`w-4 h-4 ${i % 3 === 0 ? "bg-blue-400/20 rounded-full" : i % 3 === 1 ? "bg-purple-400/20 rotate-45" : "bg-pink-400/20 rounded-sm"}`} />
          </motion.div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-900/10 dark:to-purple-900/10" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-pink-50/20 to-transparent dark:via-pink-900/5" />
      </div>

      {/* Mouse follower effect */}
      <motion.div
        className="fixed pointer-events-none z-0 mix-blend-screen"
        animate={{
          x: mousePosition.x - 100,
          y: mousePosition.y - 100,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
      >
        <div className="w-48 h-48 bg-gradient-radial from-blue-400/20 via-purple-400/10 to-transparent rounded-full blur-xl" />
      </motion.div>
    </>
  );
}
