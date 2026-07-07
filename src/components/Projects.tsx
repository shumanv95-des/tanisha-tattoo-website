import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PROJECTS_DATA } from "../data";
import { Project } from "../types";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScrollToCard = (index: number) => {
    if (scrollRef.current) {
      const cardElements = scrollRef.current.children;
      if (cardElements && cardElements[index]) {
        const cardElement = cardElements[index] as HTMLElement;
        const container = scrollRef.current;
        const leftPos = cardElement.offsetLeft - container.offsetLeft;
        container.scrollTo({
          left: leftPos,
          behavior: "smooth"
        });
        setActiveCardIndex(index);
      }
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardElements = Array.from(scrollRef.current.children) as HTMLElement[];
      if (cardElements.length > 0) {
        let closestIndex = 0;
        let minDiff = Infinity;
        const containerLeft = scrollRef.current.getBoundingClientRect().left;

        cardElements.forEach((child, idx) => {
          const childLeft = child.getBoundingClientRect().left;
          const diff = Math.abs(childLeft - containerLeft);
          if (diff < minDiff) {
            minDiff = diff;
            closestIndex = idx;
          }
        });

        setActiveCardIndex(closestIndex);
      }
    }
  };

  const handlePrev = () => {
    const nextIndex = Math.max(0, activeCardIndex - 1);
    handleScrollToCard(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = Math.min(PROJECTS_DATA.length - 1, activeCardIndex + 1);
    handleScrollToCard(nextIndex);
  };

  return (
    <section
      id="projects"
      className="relative bg-transparent text-white py-24 md:py-36 px-6 md:px-12 border-t border-white/5 scroll-mt-24 select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-24">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-brand-red font-mono text-xs tracking-widest uppercase flex items-center space-x-2"
            >
              <span>//</span>
              <span>Портфоліо</span>
            </motion.div>
          </div>
          <div className="lg:col-span-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white font-sans text-left uppercase"
            >
              Вибрані тату-проекти з унікальним художнім стилем та бездоганним втіленням.
            </motion.h2>
          </div>
        </div>

        {/* Project Slider Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full"
        >
          {PROJECTS_DATA.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="flex-shrink-0 w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start group cursor-pointer flex flex-col space-y-4"
            >
              {/* Image Container with Zoom effect */}
              <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/5 bg-neutral-950 transition-all duration-500 group-hover:border-brand-red/30">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale contrast-[1.1] transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                
                {/* Year Indicator Top-Right Badge */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
                  <span className="font-mono text-[10px] tracking-wider text-white/90">{project.year}</span>
                </div>

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Text Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-left flex flex-col justify-end">
                  <span className="font-mono text-[10px] text-brand-red uppercase tracking-widest mb-1.5">// {project.category}</span>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-brand-red transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Tag Badges under the Card */}
              <div className="flex flex-wrap gap-2 pt-1 text-left">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-[10px] font-mono border border-white/10 text-white/50 bg-white/[0.02] group-hover:border-white/20 transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Pagination and Navigation */}
        <div className="flex items-center justify-center mt-8 border-t border-white/5 pt-6 max-w-7xl mx-auto space-x-5">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            disabled={activeCardIndex === 0}
            className={`p-3 rounded-full border transition-all duration-300 ${
              activeCardIndex === 0
                ? "border-white/5 text-white/20 cursor-not-allowed"
                : "border-white/10 text-white hover:border-brand-red hover:text-brand-red"
            }`}
            aria-label="Попередній проект"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Bottom Pagination Dots */}
          <div className="flex items-center space-x-2">
            {PROJECTS_DATA.map((_, index) => (
              <button
                key={index}
                onClick={() => handleScrollToCard(index)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeCardIndex === index
                    ? "w-8 bg-brand-red"
                    : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Перейти до слайду ${index + 1}`}
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            disabled={activeCardIndex === PROJECTS_DATA.length - 1}
            className={`p-3 rounded-full border transition-all duration-300 ${
              activeCardIndex === PROJECTS_DATA.length - 1
                ? "border-white/5 text-white/20 cursor-not-allowed"
                : "border-white/10 text-white hover:border-brand-red hover:text-brand-red"
            }`}
            aria-label="Наступний проект"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Fullscreen Image Lightbox */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-8 select-none"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300 cursor-pointer z-50"
              aria-label="Закрити"
            >
              <X size={20} />
            </button>

            {/* Left Control (Previous) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = PROJECTS_DATA.findIndex((p) => p.id === selectedProject.id);
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : PROJECTS_DATA.length - 1;
                setSelectedProject(PROJECTS_DATA[prevIndex]);
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300 cursor-pointer z-50"
              aria-label="Попереднє зображення"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Image Container */}
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="relative max-h-[80vh] max-w-full md:max-w-4xl flex items-center justify-center"
            >
              <motion.img
                key={selectedProject.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                className="max-h-[80vh] max-w-[85vw] md:max-w-full object-contain rounded-lg shadow-2xl border border-white/5"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Footer Text */}
            <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
              <p className="text-white text-base md:text-lg font-bold tracking-tight">
                {selectedProject.title}
              </p>
              <p className="text-white/40 text-xs font-mono mt-1 uppercase tracking-widest">
                {selectedProject.category} // {PROJECTS_DATA.findIndex((p) => p.id === selectedProject.id) + 1} з {PROJECTS_DATA.length}
              </p>
            </div>

            {/* Right Control (Next) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = PROJECTS_DATA.findIndex((p) => p.id === selectedProject.id);
                const nextIndex = currentIndex < PROJECTS_DATA.length - 1 ? currentIndex + 1 : 0;
                setSelectedProject(PROJECTS_DATA[nextIndex]);
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300 cursor-pointer z-50"
              aria-label="Наступне зображення"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
