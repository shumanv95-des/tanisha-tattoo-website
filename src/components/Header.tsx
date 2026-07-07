import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 md:px-12 py-6 ${
          isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          {/* Logo / Left title */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-medium tracking-tight hover:opacity-70 transition-opacity text-left cursor-pointer"
          >
            © Tanisha Tattoo
          </button>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-12">
            <button
              onClick={() => scrollToSection("projects")}
              className="text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              Портфоліо
            </button>
            <button
              onClick={() => scrollToSection("intro")}
              className="text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              Про мене
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              Послуги
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              Контакти
            </button>
            <a
              href="https://www.instagram.com/tanisha.t.666?igsh=d3U5bDVlZHdvemI0"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-brand-red text-white font-medium rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              Зв'язатись
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-brand-red transition-colors cursor-pointer p-1"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black pt-24 px-6 flex flex-col justify-between pb-12 md:hidden"
          >
            <nav className="flex flex-col space-y-8 text-2xl font-semibold tracking-tight">
              <button
                onClick={() => scrollToSection("projects")}
                className="text-left py-2 border-b border-white/5 hover:text-brand-red transition-colors"
              >
                Портфоліо
              </button>
              <button
                onClick={() => scrollToSection("intro")}
                className="text-left py-2 border-b border-white/5 hover:text-brand-red transition-colors"
              >
                Про мене
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-left py-2 border-b border-white/5 hover:text-brand-red transition-colors"
              >
                Послуги
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left py-2 border-b border-white/5 hover:text-brand-red transition-colors"
              >
                Контакти
              </button>
              <a
                href="https://www.instagram.com/tanisha.t.666?igsh=d3U5bDVlZHdvemI0"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="text-left py-2 border-b border-white/5 text-brand-red hover:text-white transition-colors"
              >
                Зв'язатись
              </a>
            </nav>

            <div className="text-sm text-white/40">
              <p className="mb-2">© Tanisha Tattoo</p>
              <p>Авторський тату-майстер та художник</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
