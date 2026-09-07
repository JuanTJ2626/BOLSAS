'use client';

import { motion } from 'framer-motion';

const PILLARS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    title: 'Calidad Premium',
    desc: 'Materiales de primera con certificaciones internacionales FSC®, ISO 9001 y FDA. Fabricamos empaques que cuentan una historia.',
    stat: '99.8%',
    statLabel: 'tasa de aprobación',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Entrega Express',
    desc: 'Tiempos de producción optimizados desde 7 días hábiles para pedidos desde 500 piezas. Logística nacional e internacional.',
    stat: '7',
    statLabel: 'días hábiles mín.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: '100% Personalizable',
    desc: 'Dimensiones, materiales, tintas y accesorios a tu medida. Hot-stamping dorado, serigrafía y laminados premium.',
    stat: '∞',
    statLabel: 'opciones de diseño',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
      </svg>
    ),
    title: 'Eco Consciente',
    desc: 'Líneas biodegradables d2w, materiales reciclados PCR y certificaciones de economía circular para marcas responsables.',
    stat: '40%',
    statLabel: 'línea eco-friendly',
  },
];

export function WhyUs() {
  return (
    <section className="relative bg-[#09090B] py-28 overflow-hidden">
      {/* Gold corner accent */}
      <div className="pointer-events-none absolute top-0 left-0 w-64 h-64 opacity-30"
        style={{ background: 'radial-gradient(circle at top left, rgba(212,175,55,0.25) 0%, transparent 70%)' }}
      />
      <div className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 opacity-20"
        style={{ background: 'radial-gradient(circle at bottom right, rgba(212,175,55,0.2) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-screen-xl mx-auto px-6 md:px-12 xl:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-16 flex flex-col gap-4 max-w-2xl"
        >
          <div className="h-0.5 w-16 bg-gradient-to-r from-[#D4AF37] to-transparent" />
          <h2 className="font-serif-luxury text-[clamp(2rem,4vw,3.5rem)] leading-tight text-white">
            El estándar más alto <br />
            <span className="gold-gradient-text">en empaque de lujo</span>
          </h2>
          <p className="text-[#A1A1AA] text-lg leading-relaxed">
            Más de 12 años fabricando bolsas que elevan la percepción de valor de las marcas más exigentes de México y Latinoamérica.
          </p>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PILLARS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
              className="pillar-card group relative flex gap-6 p-7 rounded-[20px] border border-white/06 bg-white/03 hover:bg-white/06 hover:border-[#D4AF37]/30 transition-all duration-400 overflow-hidden"
            >
              {/* Gold hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 30% 50%, rgba(212,175,55,0.07) 0%, transparent 70%)' }}
              />

              {/* Icon */}
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/08 flex items-center justify-center text-[#D4AF37]">
                {p.icon}
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif-luxury text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors duration-300">
                    {p.title}
                  </h3>
                  <div className="text-right flex-shrink-0">
                    <div
                      className="font-serif-luxury text-2xl font-bold text-[#D4AF37]"
                      data-stat={p.stat}
                    >
                      {p.stat}
                    </div>
                    <div className="text-[10px] text-[#71717A] uppercase tracking-wider">{p.statLabel}</div>
                  </div>
                </div>
                <p className="text-[#A1A1AA] text-sm leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-7 rounded-[20px] border border-[#D4AF37]/25 bg-gradient-to-r from-[#D4AF37]/08 to-transparent"
        >
          <div>
            <p className="text-white font-serif-luxury text-xl font-bold">¿Listo para comenzar?</p>
            <p className="text-[#A1A1AA] text-sm mt-1">Obtén una cotización personalizada en menos de 24 horas.</p>
          </div>
          <a
            href="#cotizador"
            className="flex-shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#D4AF37] text-black text-sm font-bold tracking-wide hover:bg-[#F5E0A3] transition-all duration-300 shadow-[0_0_24px_rgba(212,175,55,0.35)]"
          >
            Cotizar Ahora
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
