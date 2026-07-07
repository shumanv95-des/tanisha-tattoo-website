import React from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Calendar } from "lucide-react";
import { SETTINGS_DATA } from "../data";

export default function Contact() {
  return (
    <section
      id="contact"
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
              <span>Контакти</span>
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
              Створимо ваш наступний шедевр на тілі разом.
            </motion.h2>
          </div>
        </div>

        {/* Content Grid */}
        <div className="space-y-12">
          <div className="max-w-2xl text-left">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-4">Пряме бронювання та колаборації</h3>
            <p className="text-sm md:text-base text-white/50 leading-relaxed">
              Кожне татуювання — це унікальне поєднання особистої історії та стерильної точності. Напишіть безпосередньо на пошту, щоб запропонувати свою концепцію, обговорити ескізи чи домовитися про сеанс.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="flex flex-col justify-between p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-brand-red/30 transition-all duration-300">
              <div className="mb-8">
                <Mail size={24} className="text-brand-red mb-4" />
                <h4 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-2">Електронна пошта</h4>
                <p className="text-xs text-white/50 leading-relaxed">
                  Для пропозицій сеансів, референсів та консультацій щодо ескізів.
                </p>
              </div>
              <a href={`mailto:${SETTINGS_DATA.contactEmail}`} className="text-base font-semibold hover:text-brand-red transition-colors mt-auto block">
                {SETTINGS_DATA.contactEmail}
              </a>
            </div>

            <div className="flex flex-col justify-between p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-brand-red/30 transition-all duration-300">
              <div className="mb-8">
                <MapPin size={24} className="text-brand-red mb-4" />
                <h4 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-2">Основна студія</h4>
                <p className="text-xs text-white/50 leading-relaxed">
                  Київ, Україна. Безпечне, абсолютно стерильне та професійне середовище.
                </p>
              </div>
              <span className="text-base font-semibold text-white/80 mt-auto block">
                {SETTINGS_DATA.contactLocation}
              </span>
            </div>

            <div className="flex flex-col justify-between p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-brand-red/30 transition-all duration-300">
              <div className="mb-8">
                <Calendar size={24} className="text-brand-red mb-4" />
                <h4 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-2">Вільні місця</h4>
                <p className="text-xs text-white/50 leading-relaxed">
                  Запис обмежено. Забронюйте свій сеанс завчасно.
                </p>
              </div>
              <span className="text-base font-semibold text-white/80 mt-auto block">
                {SETTINGS_DATA.contactAvailability}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
