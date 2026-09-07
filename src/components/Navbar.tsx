'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface NavbarProps {
  savedQuotesCount?: number;
}

const NAV_LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#coleccion', label: 'Colección' },
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#cotizador', label: 'Cotizar' },
];

export function Navbar({ savedQuotesCount = 0 }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`navbar-inner fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-white/92 backdrop-blur-xl border-b border-[#D4AF37]/20 shadow-[0_2px_24px_rgba(9,9,11,0.08)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 xl:px-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex items-center group">
          <div className="relative w-10 h-10 rounded-xl bg-[#09090B] p-1 flex items-center justify-center shadow-lg group-hover:bg-[#D4AF37] transition-all duration-300 overflow-hidden">
            <Image
              src="/LOGO BOLSA.png"
              alt="Logo"
              width={36}
              height={36}
              className="object-contain w-full h-full"
              priority
            />
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#52525B] hover:text-[#09090B] transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {savedQuotesCount > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              <span className="text-xs font-semibold text-[#8C6A10]">{savedQuotesCount}</span>
            </div>
          )}
          <a
            href="#cotizador"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#09090B] text-white text-sm font-semibold hover:bg-[#D4AF37] transition-colors duration-300"
          >
            Cotizar
          </a>
          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <span className={`w-5 h-px bg-[#09090B] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`w-5 h-px bg-[#09090B] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-px bg-[#09090B] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-[#E4E4E7] shadow-xl px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-[#09090B] py-1 border-b border-[#F4F4F6] last:border-0"
            >
              {link.label}
            </a>
          ))}
          <a href="#cotizador" onClick={() => setMenuOpen(false)} className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#09090B] text-white text-sm font-semibold mt-1">
            Cotizar Ahora
          </a>
        </div>
      )}
    </header>
  );
}
