'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { PRODUCTS_DATA, MATERIAL_FILTERS, USE_FILTERS } from '@/data/products';
import { Product } from '@/types';

// Locale-safe number formatter — identical output on server & client
const fmtN = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

interface ProductCatalogProps {
  onOpenSpecs: (product: Product) => void;
  onSelectForQuote: (product: Product) => void;
}

const ECO_COLORS: Record<string, string> = {
  eco: 'bg-green-50 text-green-700 border-green-200',
  recycled: 'bg-blue-50 text-blue-700 border-blue-200',
  kraft: 'bg-amber-50 text-amber-700 border-amber-200',
  durable: 'bg-zinc-100 text-zinc-700 border-zinc-300',
};

export function ProductCatalog({ onOpenSpecs, onSelectForQuote }: ProductCatalogProps) {
  const [activeMaterial, setActiveMaterial] = useState<string>('all');
  const [activeUse, setActiveUse] = useState<string>('all');

  const filtered = PRODUCTS_DATA.filter((p) => {
    const matOk = activeMaterial === 'all' || p.materialCategory === activeMaterial;
    const useOk = activeUse === 'all' || p.useCategory === activeUse;
    return matOk && useOk;
  });

  return (
    <section id="catalogo" className="bg-[#F9F9FB] py-28">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 xl:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="catalog-title-block flex flex-col gap-4 mb-12"
        >
          <h2 className="font-serif-luxury text-[clamp(2rem,4vw,3.2rem)] text-[#09090B] leading-tight">
            Todos nuestros <span className="gold-gradient-text">empaques</span>
          </h2>
          <p className="text-[#71717A] text-base max-w-xl">
            Filtra por material o uso para encontrar el empaque ideal para tu negocio.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-4">
          {MATERIAL_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveMaterial(f.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide border transition-all duration-200 ${
                activeMaterial === f.id
                  ? 'bg-[#09090B] text-white border-[#09090B]'
                  : 'bg-white text-[#52525B] border-[#E4E4E7] hover:border-[#D4AF37] hover:text-[#8C6A10]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-10">
          {USE_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveUse(f.id)}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-medium border transition-all duration-200 ${
                activeUse === f.id
                  ? 'bg-[#D4AF37] text-white border-[#D4AF37]'
                  : 'bg-white text-[#71717A] border-[#E4E4E7] hover:border-[#D4AF37]/50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid with Framer Motion Layout Animation */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                key={product.id}
                className="catalog-card group bg-white rounded-[20px] border border-[#E4E4E7] overflow-hidden hover:border-[#D4AF37]/50 hover:shadow-[0_16px_48px_-8px_rgba(212,175,55,0.18)] transition-all duration-400"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-[#F4F4F6]">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.featured && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#D4AF37] text-white text-[10px] font-bold tracking-wider uppercase shadow flex items-center gap-1">
                      Destacado
                    </div>
                  )}
                  <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${ECO_COLORS[product.ecoBadgeType]}`}>
                    {product.ecoBadge}
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col gap-3">
                  <div>
                    <p className="text-[10px] font-mono text-[#A1A1AA] tracking-widest mb-1">{product.code}</p>
                    <h3 className="font-serif-luxury text-base font-bold text-[#09090B] group-hover:text-[#8C6A10] transition-colors duration-300 leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-[#71717A] text-xs mt-1 leading-relaxed line-clamp-2">{product.tagline}</p>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-0.5 rounded-md bg-[#F4F4F6] text-[#52525B] border border-[#E4E4E7] font-medium">
                      {product.materialLabel.split(' ').slice(0, 3).join(' ')}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#F4F4F6] text-[#52525B] border border-[#E4E4E7] font-medium">
                      {product.useLabel}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-[#F4F4F6] flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-[#A1A1AA]">Desde</p>
                      <p className="font-serif-luxury text-lg font-bold text-[#09090B]">
                        ${product.basePrice.toFixed(2)}
                        <span className="text-xs font-normal text-[#71717A]"> / pz</span>
                      </p>
                      <p className="text-[10px] text-[#A1A1AA]">Mín. {fmtN(product.minOrderQuantity)} pz</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => onSelectForQuote(product)}
                        className="px-4 py-2 rounded-full bg-[#09090B] text-white text-[11px] font-bold hover:bg-[#D4AF37] transition-colors duration-300 whitespace-nowrap"
                      >
                        Cotizar
                      </button>
                      <button
                        onClick={() => onOpenSpecs(product)}
                        className="px-4 py-1.5 rounded-full border border-[#E4E4E7] text-[#71717A] text-[11px] hover:border-[#D4AF37] hover:text-[#8C6A10] transition-colors duration-200 whitespace-nowrap"
                      >
                        Ver specs
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#F4F4F6] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A1A1AA" strokeWidth="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>
            </div>
            <p className="text-[#71717A] text-sm">No hay productos con estos filtros.</p>
            <button onClick={() => { setActiveMaterial('all'); setActiveUse('all'); }} className="px-5 py-2 rounded-full bg-[#09090B] text-white text-sm font-medium">
              Ver todos
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
