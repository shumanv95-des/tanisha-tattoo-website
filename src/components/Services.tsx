import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SERVICES_DATA } from "../data";
import { Plus, Minus, ArrowUpRight } from "lucide-react";

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<string>("01");

  const toggleCategory = (id: string) => {
    setActiveCategory(activeCategory === id ? "" : id);
  };

  return (
    <section
      id="services"
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
              <span>Послуги</span>
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
              Професійний підхід, безкомпромісна стерильність та втілення вашої індивідуальності.
            </motion.h2>
          </div>
        </div>

        {/* Services List / Grid */}
        <div className="flex flex-col border-t border-white/10">
          {SERVICES_DATA.map((category) => {
            const isOpen = activeCategory === category.id;

            return (
              <div
                key={category.id}
                className="border-b border-white/10 py-8 md:py-12 transition-colors duration-300"
              >
                {/* Accordion Trigger Header */}
                <div
                  onClick={() => toggleCategory(category.id)}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center cursor-pointer group"
                >
                  {/* Outlined index number */}
                  <div className="lg:col-span-2 flex items-center justify-between">
                    <span className="text-8xl md:text-[8rem] lg:text-[9rem] font-extrabold tracking-tighter text-outline group-hover:text-outline-hover transition-all duration-500 font-mono select-none leading-none">
                      {category.id}
                    </span>
                    <button className="lg:hidden text-white/50 group-hover:text-white transition-colors">
                      {isOpen ? <Minus size={24} /> : <Plus size={24} />}
                    </button>
                  </div>

                  {/* Category Title and mini summary */}
                  <div className="lg:col-span-7 flex flex-col justify-center text-left">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white group-hover:text-brand-red transition-colors duration-300">
                      {category.title}
                    </h3>
                    <p className="text-sm md:text-base text-white/50 mt-3 max-w-xl leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Toggle Sign / Indicators (Desktop) */}
                  <div className="hidden lg:col-span-3 lg:flex justify-end pr-4">
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-red/50 text-white group-hover:text-brand-red transition-colors duration-350"
                    >
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </motion.div>
                  </div>
                </div>

                {/* Expanded Details Sub-services */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 md:pt-12">
                        {/* Empty spacing block */}
                        <div className="lg:col-span-2 hidden lg:block" />

                        {/* List items block */}
                        <div className="lg:col-span-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                          {category.items.map((item) => (
                            <div
                              key={item.id}
                              className="group/item flex items-center justify-between py-4 border-b border-white/5 hover:border-brand-red/30 transition-colors duration-250 cursor-pointer"
                            >
                              <div className="flex items-center space-x-3 text-left">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-red opacity-0 group-hover/item:opacity-100 transition-opacity duration-200" />
                                <span className="text-sm md:text-base font-medium text-white/80 group-hover/item:text-white transition-colors">
                                  {item.name}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="font-mono text-xs text-white/30 group-hover/item:text-brand-red transition-colors">
                                  {item.id}
                                </span>
                                <ArrowUpRight
                                  size={12}
                                  className="text-white/20 group-hover/item:text-brand-red group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
