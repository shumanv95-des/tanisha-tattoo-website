import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ScrollCanvas from "./components/ScrollCanvas";
import { motion } from "motion/react";

export default function App() {
  return (
    <div className="bg-black text-white selection:bg-brand-red selection:text-white min-h-screen font-sans flex flex-col justify-between overflow-x-hidden relative">
      {/* Scroll animation fixed background canvas */}
      <ScrollCanvas />

      {/* Absolute top grid overlay for structural design */}
      <div className="absolute inset-x-0 top-0 h-screen pointer-events-none z-10 opacity-15">
        <div className="max-w-7xl mx-auto h-full grid grid-cols-4 md:grid-cols-12 gap-6 px-6 md:px-12">
          {Array.from({ length: 12 }).map((_, idx) => (
            <div key={idx} className={`h-full border-r border-white/5 last:border-r-0 ${idx >= 4 ? 'hidden md:block' : ''}`} />
          ))}
        </div>
      </div>

      <Header />

      <main className="flex-grow relative z-10">
        <Hero />
        <Intro />
        <Projects />
        <Services />
        <Contact />
      </main>

      {/* Styled Footer */}
      <footer className="bg-black border-t border-white/10 py-12 px-6 md:px-12 text-xs text-white/40 select-none relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <p className="font-semibold text-white/60 mb-1">© {new Date().getFullYear()} Tanisha Tattoo.</p>
            <p>Створено відповідно до принципів виняткової мінімалістичної естетики.</p>
          </div>
          <div className="text-left sm:text-right font-mono text-[10px] tracking-widest uppercase">
            <span>Дизайн: Tanisha Tattoo</span>
            <span className="mx-2 text-brand-red">//</span>
            <span>Розроблено на React & Tailwind</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

