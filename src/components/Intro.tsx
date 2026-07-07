import React from "react";
import { motion } from "motion/react";
import { SETTINGS_DATA } from "../data";
import { ArrowRight } from "lucide-react";

export default function Intro() {
  const handleSeeWork = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="intro"
      className="relative bg-transparent text-white py-24 md:py-36 px-6 md:px-12 border-t border-white/5 scroll-mt-24 select-none"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        {/* Left Column: Marker */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-brand-red font-mono text-xs tracking-widest uppercase flex items-center space-x-2"
          >
            <span>//</span>
            <span>{SETTINGS_DATA.introLabel}</span>
          </motion.div>
        </div>

        {/* Middle Column: Giant Statement */}
        <div className="lg:col-span-7">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.2] text-white font-sans text-left"
          >
            {SETTINGS_DATA.introTitle}
          </motion.h2>
        </div>
 
        {/* Right Column: Mini description & CTA button */}
        <div className="lg:col-span-3 flex flex-col justify-between space-y-8 lg:space-y-0 lg:pl-4">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-sm md:text-[0.9rem] text-white/60 leading-relaxed font-sans text-left"
          >
            {SETTINGS_DATA.introDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="pt-6 lg:pt-0 text-left"
          >
            <button
              onClick={handleSeeWork}
              className="inline-flex items-center space-x-3 px-6 py-3 rounded-full border border-white/20 text-xs font-medium tracking-wider uppercase text-white hover:border-brand-red hover:text-brand-red bg-transparent cursor-pointer transition-all duration-300 group"
            >
              <span>Портфоліо</span>
              <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
