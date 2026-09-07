'use client';

import Image from 'next/image';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#09090B] text-white pt-16 pb-8 border-t border-[#D4AF37]/15">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 xl:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-[#D4AF37] p-1 flex items-center justify-center shadow-lg overflow-hidden">
                <Image
                  src="/LOGO BOLSA.png"
                  alt="Logo Bolsas Empresa"
                  width={36}
                  height={36}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="font-serif-luxury text-xl font-bold tracking-tight">
                LUX<span className="text-[#D4AF37]">PACK</span>
              </span>
            </div>
            <p className="text-[#71717A] text-sm leading-relaxed max-w-sm">
              Fabricante premium de bolsas y empaques personalizados. Más de 12 años creando experiencias de empaque que elevan tu marca.
            </p>
            <div className="flex gap-3 mt-1">
              <a href="mailto:contacto@luxpack.mx" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors duration-200" title="Email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              </a>
              <a href="tel:+525500000000" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors duration-200" title="Teléfono">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              </a>
              <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors duration-200" title="Ubicación">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">Productos</p>
            {['Bolsas Boutique Luxury', 'Oxo-Biodegradables d2w', 'Zipper Stand-Up', 'Courier Inviolable', 'Reutilizables TNT'].map(l => (
              <a key={l} href="#catalogo" className="text-[#71717A] text-sm hover:text-white transition-colors duration-200">{l}</a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">Empresa</p>
            {['Nosotros', 'Certifications', 'Cotizador', 'Contacto', 'Política de privacidad'].map(l => (
              <a key={l} href="#" className="text-[#71717A] text-sm hover:text-white transition-colors duration-200">{l}</a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/08 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-[#52525B] text-xs">Fábrica activa · Entregas en toda la República</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
