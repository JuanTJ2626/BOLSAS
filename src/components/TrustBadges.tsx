'use client';

import { motion } from 'framer-motion';

const BADGES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    title: 'FSC® Certified',
    desc: 'Papel de fuentes responsables',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
      </svg>
    ),
    title: 'ISO 14001',
    desc: 'Gestión ambiental certificada',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: 'ISO 9001:2015',
    desc: 'Sistema de calidad premium',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'FDA Food Contact',
    desc: 'Empaques seguros para alimentos',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
      </svg>
    ),
    title: 'GRS Certified',
    desc: 'Estándar global de reciclado',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    title: 'OEKO-TEX® S100',
    desc: 'Textiles libres de tóxicos',
  },
];

export function TrustBadges() {
  return (
    <section className="bg-white py-20 border-t border-[#E4E4E7]">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center gap-3 mb-12 text-center"
        >
          <h2 className="font-serif-luxury text-[clamp(1.8rem,3.5vw,2.8rem)] text-[#09090B]">
            Calidad <span className="gold-gradient-text">certificada</span>
          </h2>
          <p className="text-[#71717A] text-base max-w-lg">
            Nuestras plantas cumplen con los estándares más rigurosos a nivel internacional.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {BADGES.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="trust-badge flex flex-col items-center gap-3 p-5 rounded-2xl border border-[#E4E4E7] bg-white hover:border-[#D4AF37]/50 hover:shadow-[0_8px_30px_-6px_rgba(212,175,55,0.2)] transition-all duration-300 text-center group"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{b.icon}</span>
              <div>
                <p className="font-serif-luxury text-xs font-bold text-[#09090B] group-hover:text-[#8C6A10] transition-colors duration-300">{b.title}</p>
                <p className="text-[10px] text-[#A1A1AA] mt-0.5 leading-tight">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
