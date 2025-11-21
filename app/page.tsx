"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import can from "@/public/assests/Mari-Baba.png";

export default function CanLandingPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Use scroll from the container instead of window
  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring animation for scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 60,
    restDelta: 0.001,
  });

  // Responsive animation values
  const canX = useTransform(
    smoothProgress,
    [0, 0.33, 0.66, 1],
    isMobile ? [110, 80, -140, 135] : [200, 300, -200, 230]
  );

  const canY = useTransform(
    smoothProgress,
    [0, 0.33, 0.66, 1],
    isMobile ? [-30, 80, 20, 80] : [120, 120, 130, 120]
  );

  const canRotate = useTransform(
    smoothProgress,
    [0, 0.33, 0.66, 1],
    [20, 45, -25, 0]
  );

  const canScale = useTransform(
    smoothProgress,
        [0, 0.33, 0.66, 1],
    isMobile ? [0.6, 0.8, 0.9 , 0.8] : [1, 1.3, 0.8, 1]
  );

  // Update current section based on scroll progress
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      const section = Math.floor(latest * (sections.length - 1));
      setCurrentSection(section);
    });

    return () => unsubscribe();
  }, [smoothProgress]);

  // Scroll to section function
  const scrollToSection = (index: number) => {
    if (containerRef.current) {
      const sectionHeight = containerRef.current.scrollHeight / sections.length;
      containerRef.current.scrollTo({
        top: index * sectionHeight,
        behavior: "smooth",
      });
    }
  };

  const sections = [
    {
      title: "REFRESH",
      subtitle: "Your Moment",
      bg: "from-cyan-400 to-blue-500",
      text: "text-white",
    },
    {
      title: "ENERGIZE",
      subtitle: "Your Day",
      bg: "from-orange-400 to-red-500",
      text: "text-white",
    },
    {
      title: "REVITALIZE",
      subtitle: "Your Spirit",
      bg: "from-purple-400 to-pink-500",
      text: "text-white",
    },
    {
      title: "EXPERIENCE",
      subtitle: "Pure Taste",
      bg: "from-green-400 to-emerald-500",
      text: "text-white",
    },
  ];

  return (
    <div className="relative">
      {/* Snap scroll container */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory relative"
      >
        {sections.map((section, index) => (
          <section
            key={index}
            className={`h-screen w-full snap-start snap-always flex items-center justify-center bg-gradient-to-br ${section.bg} relative overflow-hidden`}
          >
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-4 md:top-20 md:left-20 w-32 h-32 md:w-64 md:h-64 bg-white rounded-full blur-2xl md:blur-3xl"></div>
              <div className="absolute bottom-10 right-4 md:bottom-20 md:right-20 w-48 h-48 md:w-96 md:h-96 bg-white rounded-full blur-2xl md:blur-3xl"></div>
            </div>

            {/* Content */}
            <div
              className={`relative z-10 text-center ${section.text} max-w-4xl px-4 md:px-8`}
            >
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-8xl font-black mb-4 md:mb-6 tracking-tight"
              >
                {section.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-2xl md:text-4xl font-light tracking-wide"
              >
                {section.subtitle}
              </motion.p>

              {index === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="mt-6 md:mt-8"
                >
                  <p className="text-sm md:text-lg animate-bounce">Scroll Down ↓</p>
                </motion.div>
              )}

              {index === sections.length - 1 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 md:mt-12 px-8 py-3 md:px-12 md:py-4 bg-white text-gray-800 rounded-full text-lg md:text-xl font-bold shadow-2xl hover:shadow-3xl"
                >
                  Get Yours Now
                </motion.button>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Floating can that animates with scroll progress */}
      <motion.div
        style={{
          x: canX,
          y: canY,
          rotate: canRotate,
          scale: canScale,
        }}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
      >
        {/* Can SVG */}
        <Image 
          src={can} 
          alt="Soda Can" 
          width={isMobile ? 200 : 400}
          height={isMobile ? 400 : 800}
          className="w-auto h-auto"
        />

        {/* Animated sparkles around can */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-2 h-2 md:w-4 md:h-4 bg-yellow-300 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute top-1/2 -left-1 md:-left-3 w-2 h-2 md:w-3 md:h-3 bg-blue-300 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-4 right-1 md:bottom-10 md:right-2 w-2 h-2 md:w-3 md:h-3 bg-cyan-300 rounded-full blur-sm"
        />
      </motion.div>

      {/* Scroll indicator dots - Fixed positioning and behavior */}
      <div className={`fixed hidden z-40 ${isMobile ? 
        "bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4" : 
        "left-6 md:left-8 top-1/2 transform -translate-y-1/2 space-y-4"}`}
      >
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`transition-all duration-300 ${
              currentSection === index
                ? "bg-white scale-125"
                : "bg-white/40 hover:bg-white/60"
            } ${
              isMobile ? "w-3 h-3" : "w-3 h-3 md:w-3 md:h-3"
            } rounded-full`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll progress indicator */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-white z-50 origin-left"
      />
    </div>
  );
}