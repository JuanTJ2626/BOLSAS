'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function HeroGSAP() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  // Subtle mouse-driven light leak via RAF
  useEffect(() => {
    let rafId = 0;
    let tx = 30, ty = 70;
    let cx = 30, cy = 70;

    const onMove = (e: MouseEvent) => {
      const r = sectionRef.current?.getBoundingClientRect();
      if (!r) return;
      tx = ((e.clientX - r.left) / r.width) * 100;
      ty = ((e.clientY - r.top) / r.height) * 100;
    };

    const tick = () => {
      cx += (tx - cx) * 0.04;
      cy += (ty - cy) * 0.04;
      if (spotRef.current) {
        spotRef.current.style.background = `radial-gradient(600px circle at ${cx}% ${cy}%, rgba(212,175,55,0.12), transparent 70%)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative h-[100svh] w-full overflow-hidden bg-[#09090B]"
    >
      {/* ── Full-Bleed Background Image ────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full h-full"
        >
          <Image
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=2000&q=90"
            alt="Empaques de Lujo"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Cinematic grade — dark bottom-left vignette, lighter top-right */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(9,9,11,0.92) 0%, rgba(9,9,11,0.55) 45%, rgba(9,9,11,0.18) 100%)',
          }}
        />
        {/* Left edge darkness — anchors the text block */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(9,9,11,0.75) 0%, transparent 65%)',
          }}
        />
      </div>

      {/* ── Mouse Light Leak ───────────────────────────────────── */}
      <div ref={spotRef} aria-hidden className="pointer-events-none absolute inset-0 z-[2]" />



      {/* ── Vertical Issue Number (editorial detail) ───────────── */}
      <div
        aria-hidden
        className="absolute right-8 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-4"
      >
        <div className="h-20 w-px bg-white/20" />
        <span
          className="text-[10px] tracking-[0.4em] uppercase text-white/35 font-medium"
          style={{ writingMode: 'vertical-rl' }}
        >
          Alta Gama
        </span>
        <div className="h-20 w-px bg-white/20" />
      </div>

      {/* ── Bottom-Left Editorial Text Block ──────────────────── */}
      <div className="absolute bottom-0 left-0 z-10 w-full px-8 md:px-12 pb-12 md:pb-16 max-w-3xl">

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-serif-luxury text-[clamp(2.8rem,6.5vw,6rem)] font-normal leading-[1.02] tracking-[-0.025em] text-white mb-6"
          style={{ textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}
        >
          Empaques de<br />
          <span className="gold-gradient-text italic">alta gama.</span>
        </motion.h1>

        {/* Subtitle + CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10"
        >
          <p className="text-[13px] leading-[1.7] text-white/60 max-w-[340px] tracking-wide">
            Bolsas boutique, pouches herméticos y empaques sustentables para marcas excepcionales.
          </p>

          <div className="flex items-center gap-4 shrink-0">
            <a
              href="#cotizador"
              className="inline-flex items-center justify-center h-11 px-8 rounded-full bg-[#D4AF37] text-black text-[11px] font-bold tracking-widest uppercase hover:bg-[#F5E0A3] transition-colors duration-300 shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              Cotizar
            </a>
            <a
              href="#catalogo"
              className="text-[11px] font-semibold tracking-widest uppercase text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-2"
            >
              Ver catálogo
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Bottom thin rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.9, ease: 'easeOut' }}
          className="mt-10 h-px bg-white/15 origin-left"
        />

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.05, ease: 'easeOut' }}
          className="mt-5 flex gap-10"
        >
          {[
            { value: '12+', label: 'Años' },
            { value: '50M+', label: 'Piezas / año' },
            { value: '500', label: 'Pzs mínimo' },
          ].map((s) => (
            <div key={s.label} className="flex flex-col">
              <span className="font-serif-luxury text-xl text-white font-bold leading-none">{s.value}</span>
              <span className="text-[10px] text-white/40 tracking-widest uppercase mt-1">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="absolute bottom-10 right-8 md:right-12 z-10 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-x-0 h-1/2 bg-[#D4AF37]"
          />
        </div>
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/30">Scroll</span>
      </motion.div>
    </section>
  );
}
