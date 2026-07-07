import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { SOCIAL_LINKS } from "../data";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const [scrollOpacity, setScrollOpacity] = useState(0.55);
  const [contentOpacity, setContentOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const introHeight = window.innerHeight || 800;
      
      // Fade out background photo from 0.55 to 0 over the first 100vh
      const bgOpacity = Math.max(0, 0.55 * (1 - scrollTop / introHeight));
      setScrollOpacity(bgOpacity);
      
      // Fade out Hero text content from 1 to 0 over the first 80% of 100vh
      const textOpacity = Math.max(0, 1 - scrollTop / (introHeight * 0.8));
      setContentOpacity(textOpacity);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial run

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative z-10 min-h-screen bg-black flex flex-col justify-between pt-36 pb-12 px-6 md:px-12 overflow-hidden select-none">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src="/Gemini_Generated_Image_9615219615219615.png"
          alt="Tattoo Background"
          className="w-full h-full object-cover transition-transform duration-1000 ease-out"
          style={{ opacity: scrollOpacity }}
        />
        {/* Darkening overlays for content readability and seamless bottom blend */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent via-black/40 to-black" />
      </div>

      {/* Fadeable Content Wrapper */}
      <div 
        className="flex-1 flex flex-col justify-between w-full"
        style={{ opacity: contentOpacity }}
      >
        <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full">
          {/* Main Name Heading */}
          <div className="relative w-full my-auto py-12">
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12vw] sm:text-[11vw] md:text-[10vw] font-extrabold tracking-tighter leading-[0.85] text-white font-sans text-left relative z-10 uppercase"
            >
              TANISHA TATTOO
            </motion.h1>
          </div>

          {/* Bottom Hero Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end mt-auto w-full border-t border-white/5 pt-12">
            {/* Left Column: Social Links */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col space-y-3 items-start"
            >
              {SOCIAL_LINKS.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-white/50 hover:text-brand-red tracking-wider transition-colors duration-250 flex items-center group cursor-pointer"
                >
                  <span className="mr-2 opacity-50 group-hover:opacity-100 group-hover:text-brand-red transition-colors">
                    {link.label.split(" ")[0]}
                  </span>
                  <span>{link.name}</span>
                </a>
              ))}
            </motion.div>

            {/* Right Column: Web Designer / Art Director Title */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col md:items-end text-left md:text-right"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-sans">
                <span className="text-brand-red font-mono font-medium mr-2">//</span>
                <span className="text-white">Тату-майстер</span>
                <div className="text-white/90">Авторські ескізи</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Down arrow marker */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden md:block">
          <motion.button
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            onClick={() => {
              document.getElementById("intro")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-white/30 hover:text-brand-red transition-colors cursor-pointer"
            aria-label="Scroll down"
          >
            <ArrowDown size={18} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
