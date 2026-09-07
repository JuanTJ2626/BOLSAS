'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/types';

// Locale-safe number formatter
const fmtN = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectForQuote: (product: Product) => void;
}

export function ProductModal({ product, onClose, onSelectForQuote }: ProductModalProps) {
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-[28px] shadow-[0_40px_100px_-20px_rgba(9,9,11,0.4)] border border-[#E4E4E7] animate-[fadeIn_0.3s_ease-out]">
        {/* Header image */}
        <div className="relative h-56 overflow-hidden rounded-t-[28px] bg-[#F4F4F6]">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/50 via-transparent to-transparent" />
          {/* Close btn */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#09090B] hover:bg-white transition-colors shadow-lg"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          {/* Code badge */}
          <div className="absolute bottom-4 left-5 flex flex-col gap-1">
            <span className="text-[10px] font-mono text-white/70 tracking-widest">{product.code}</span>
            <h2 className="font-serif-luxury text-xl font-bold text-white leading-tight">{product.name}</h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-6">
          {/* Tagline */}
          <p className="text-[#52525B] text-sm leading-relaxed">{product.description}</p>

          {/* Key Features */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8C6A10]">Características clave</p>
            <ul className="flex flex-col gap-2">
              {product.keyFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[#52525B]">
                  <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-[#D4AF37]/15 flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Specs */}
          <div className="rounded-2xl border border-[#E4E4E7] overflow-hidden">
            <div className="px-5 py-3 bg-[#F9F9F9] border-b border-[#E4E4E7]">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#A1A1AA]">Especificaciones técnicas</p>
            </div>
            <div className="divide-y divide-[#F4F4F6]">
              {[
                ['Barrera O₂', product.technicalSpecs.barrierO2],
                ['Barrera H₂O', product.technicalSpecs.barrierH2O],
                ['Fuerza de sello', product.technicalSpecs.sealStrength],
                ['Gramaje / Micras', product.technicalSpecs.grammageMicrons],
                ['Carga máx.', `${product.technicalSpecs.maxWeightKg} kg`],
                ['Reciclabilidad', product.technicalSpecs.recyclability],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between px-5 py-3">
                  <span className="text-xs text-[#A1A1AA] font-medium">{label}</span>
                  <span className="text-xs text-[#09090B] font-medium text-right max-w-[60%]">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="flex flex-wrap gap-2">
            {product.technicalSpecs.certifications.map((c) => (
              <span key={c} className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#D4AF37]/08 text-[#8C6A10] border border-[#D4AF37]/25">
                {c}
              </span>
            ))}
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between pt-2 border-t border-[#F4F4F6]">
            <div>
              <p className="text-xs text-[#A1A1AA]">Precio base desde</p>
              <p className="font-serif-luxury text-2xl font-bold text-[#09090B]">
                ${product.basePrice.toFixed(2)}
                <span className="text-sm font-normal text-[#71717A] ml-1">MXN / pz</span>
              </p>
              <p className="text-[11px] text-[#A1A1AA]">Mín. {fmtN(product.minOrderQuantity)} piezas</p>
            </div>
            <button
              onClick={() => { onClose(); onSelectForQuote(product); }}
              className="px-6 py-3 rounded-full bg-[#09090B] text-white text-sm font-bold hover:bg-[#D4AF37] transition-colors duration-300 flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              Cotizar este producto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
