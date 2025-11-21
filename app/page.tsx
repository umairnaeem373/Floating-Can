"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import can from "@/public/assests/Mari-Baba.png";
export default function CanLandingPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

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

  // Fixed animation values to match comments:
  // Section 1 (REFRESH): Center, no rotation, normal scale
  // Section 2 (ENERGIZE): Right side, 45deg rotation, smaller
  // Section 3 (REVITALIZE): Continue animating
  // Section 4 (EXPERIENCE): Final position

  // Horizontal position: center -> right on energize -> back to center for final
  const canX = useTransform(
    smoothProgress,
    [0, 0.33, 0.66, 1],
    [190, 300, -200, 200]
  );

  // Vertical position: stays centered
  const canY = useTransform(
    smoothProgress,
    [0, 0.33, 0.66, 1],
    [100, 120, 150, 120]
  );

  // Rotation: 0deg -> 45deg on energize -> continue rotating
  const canRotate = useTransform(
    smoothProgress,
    [0, 0.33, 0.66, 1],
    [20, 45, -45, 0]
  );

  // Scale: normal -> smaller on energize -> back to normal for final
  const canScale = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [1, 1.3, 1.5, 1, 1]
  );

  // Update current section based on scroll progress
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      const section = Math.floor(latest * (sections.length - 1));
      setCurrentSection(section);
    });

    return () => unsubscribe();
  }, [smoothProgress]);

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
              <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>

            {/* Content */}
            <div
              className={`relative z-10 text-center ${section.text} max-w-4xl px-8`}
            >
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-8xl font-black mb-4 tracking-tight"
              >
                {section.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl font-light tracking-wide"
              >
                {section.subtitle}
              </motion.p>

              {index === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="mt-8"
                >
                  <p className="text-lg animate-bounce">Scroll Down ↓</p>
                </motion.div>
              )}

              {index === sections.length - 1 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="mt-12 px-12 py-4 bg-white text-gray-800 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl"
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
        <Image src={can} alt="Soda Can" height={"400"} />

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
          className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full blur-sm"
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
          className="absolute top-1/2 -left-3 w-3 h-3 bg-blue-300 rounded-full blur-sm"
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
          className="absolute bottom-10 right-2 w-3 h-3 bg-cyan-300 rounded-full blur-sm"
        />
      </motion.div>

      {/* Scroll indicator dots */}
      <div className="fixed left-8 top-1/2 rotate-90 z-40 space-y-4">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              containerRef.current?.scrollTo({
                top: index * window.innerHeight,
                // behavior: "smooth",
              });
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index
                ? "bg-white scale-125"
                : "bg-white/40 hover:bg-white/60"
            }`}
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
