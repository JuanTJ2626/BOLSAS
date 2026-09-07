'use client';

import { useState, useRef, useEffect } from 'react';
import { Product } from '@/types';

interface PackagingMockupCanvasProps {
  product: Product;
  heightCm: number;
  widthCm: number;
  gussetCm: number;
  printName: string;
  finishName: string;
  isGoldFoil: boolean;
  hasWindow: boolean;
}

type ViewMode = '3d' | 'front' | 'gusset';

export function PackagingMockupCanvas({
  product,
  heightCm,
  widthCm,
  gussetCm,
  printName,
  finishName,
  isGoldFoil,
  hasWindow,
}: PackagingMockupCanvasProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('3d');
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  // Dimensional calculations for visual proportions
  const maxH = 50;
  const maxW = 40;
  const maxG = 15;

  const relH = Math.min(Math.max((heightCm / maxH) * 220, 150), 250);
  const relW = Math.min(Math.max((widthCm / maxW) * 180, 130), 210);
  const relG = Math.min(Math.max((gussetCm / maxG) * 40, 8), 50);

  // Mouse tilt angles
  const rotY = viewMode === '3d' ? (isHovered ? (mousePos.x - 50) * 0.35 : -12) : 0;
  const rotX = viewMode === '3d' ? (isHovered ? (50 - mousePos.y) * 0.25 : 8) : 0;

  // Determine packaging type category
  const isPaperBoutique = product.materialCategory === 'papel';
  const isZipperStandup = product.id.includes('zipper') || product.id.includes('hermetica');
  const isCourier = product.id.includes('courier') || product.useCategory === 'ecommerce';
  const isBiodegradable = product.materialCategory === 'biodegradable';
  const isTNT = product.materialCategory === 'tela';

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Top Header & View Mode Switcher */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="text-xs font-semibold text-[#09090B] tracking-wide uppercase">
            Simulador 3D en vivo
          </span>
        </div>

        <div className="flex gap-1 p-1 rounded-xl bg-[#F4F4F6] border border-[#E4E4E7]">
          <button
            onClick={() => setViewMode('3d')}
            className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all duration-200 ${
              viewMode === '3d'
                ? 'bg-[#09090B] text-white shadow-sm'
                : 'text-[#71717A] hover:text-[#09090B]'
            }`}
          >
            Vista 3D
          </button>
          <button
            onClick={() => setViewMode('front')}
            className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all duration-200 ${
              viewMode === 'front'
                ? 'bg-[#09090B] text-white shadow-sm'
                : 'text-[#71717A] hover:text-[#09090B]'
            }`}
          >
            Frontal
          </button>
          <button
            onClick={() => setViewMode('gusset')}
            className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all duration-200 ${
              viewMode === 'gusset'
                ? 'bg-[#09090B] text-white shadow-sm'
                : 'text-[#71717A] hover:text-[#09090B]'
            }`}
          >
            Fuelle
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePos({ x: 50, y: 50 });
        }}
        className="relative w-full h-[360px] rounded-[24px] bg-gradient-to-b from-[#18181B] via-[#09090B] to-[#09090B] border border-[#D4AF37]/30 overflow-hidden flex items-center justify-center p-6 shadow-[0_20px_50px_-10px_rgba(9,9,11,0.5)] cursor-grab active:cursor-grabbing select-none"
      >
        {/* Background Radial Light */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(212,175,55,0.14), transparent 70%)`,
          }}
        />

        {/* Grid pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, #FFFFFF 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* 3D Transform Wrapper */}
        <div
          className="relative transition-transform duration-300 ease-out flex items-center justify-center"
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          }}
        >
          {/* Packaging Model Canvas Render */}
          <div
            className="relative flex flex-col items-center justify-center transition-all duration-500"
            style={{
              width: `${relW}px`,
              height: `${relH}px`,
            }}
          >
            {/* 1. BOUTIQUE PAPER BAG MODEL */}
            {isPaperBoutique && (
              <div className="relative w-full h-full rounded-2xl bg-[#111113] border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col items-center justify-between p-6">
                {/* Silk Cord Handles */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex gap-10">
                  <div className="w-12 h-14 rounded-t-full border-2 border-[#D4AF37] border-b-0 opacity-90 shadow-sm" />
                </div>
                <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-inner border border-black/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-inner border border-black/40" />
                </div>

                {/* Top Fold Lip Line */}
                <div className="w-full h-4 border-b border-white/10 bg-white/02" />

                {/* Main Logo & Gold Foil Stamping Area */}
                <div className="flex flex-col items-center gap-2 my-auto text-center px-4">
                  <div
                    className="font-serif-luxury text-xl font-bold tracking-wider uppercase transition-all duration-300"
                    style={{
                      color: isGoldFoil ? '#D4AF37' : '#FFFFFF',
                      textShadow: isGoldFoil
                        ? `0 0 20px rgba(212,175,55,0.6), 0 0 2px rgba(255,255,255,0.8)`
                        : 'none',
                    }}
                  >
                    LUXPACK
                  </div>
                  <div className="text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold border-t border-b border-[#D4AF37]/40 py-0.5">
                    Haute Couture Packaging
                  </div>
                </div>

                {/* Bottom Base Fold Indicator */}
                <div className="w-full flex items-center justify-between text-[8px] font-mono text-white/30 pt-2 border-t border-white/06">
                  <span>{widthCm} × {heightCm} cm</span>
                  <span>Fuelle: {gussetCm} cm</span>
                </div>

                {/* Soft-Touch Matte Surface Shimmer */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-40"
                  style={{
                    background: `linear-gradient(${mousePos.x * 3.6}deg, transparent 40%, rgba(212,175,55,0.15) 50%, transparent 60%)`,
                  }}
                />
              </div>
            )}

            {/* 2. ZIPPER STAND-UP POUCH MODEL */}
            {isZipperStandup && (
              <div className="relative w-full h-full rounded-3xl bg-gradient-to-b from-[#1C1C1F] to-[#0A0A0C] border border-[#D4AF37]/40 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col items-center justify-between p-5">
                {/* Zipper Tear Notch Line */}
                <div className="w-full flex items-center justify-between border-b border-[#D4AF37]/30 pb-2">
                  <div className="w-3 h-1.5 rounded-r-full bg-[#D4AF37]/50" />
                  <span className="text-[8px] font-mono uppercase tracking-widest text-[#D4AF37]">
                    Zipper Hermético
                  </span>
                  <div className="w-3 h-1.5 rounded-l-full bg-[#D4AF37]/50" />
                </div>

                {/* Optional Transparent Window */}
                {hasWindow ? (
                  <div className="w-24 h-16 rounded-full border-2 border-[#D4AF37] bg-white/05 backdrop-blur-md flex items-center justify-center shadow-inner my-2">
                    <span className="text-[8px] text-[#D4AF37] font-semibold uppercase tracking-wider">
                      Ventana Marco Gold
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1.5 my-auto text-center">
                    <span className="font-serif-luxury text-lg font-bold text-[#D4AF37] tracking-wider">
                      STAND-UP ZIPPER
                    </span>
                    <span className="text-[8px] text-white/50 tracking-widest uppercase">
                      Triple Barrera AL+PET
                    </span>
                  </div>
                )}

                {/* Bottom Stand-Up Gusset Fold */}
                <div className="w-full h-6 rounded-b-xl border-t border-[#D4AF37]/30 bg-[#D4AF37]/05 flex items-center justify-center">
                  <span className="text-[8px] font-mono text-[#D4AF37]/70">
                    Fuelle Base Oval: {gussetCm} cm
                  </span>
                </div>
              </div>
            )}

            {/* 3. COURIER INVIOLABLE MODEL */}
            {isCourier && (
              <div className="relative w-full h-full rounded-xl bg-[#141416] border border-white/12 shadow-2xl overflow-hidden flex flex-col items-center justify-between p-5">
                {/* Double Seal Strip */}
                <div className="w-full flex flex-col gap-1 border-b border-white/10 pb-2">
                  <div className="w-full h-1.5 rounded bg-[#D4AF37]/70" />
                  <div className="w-full h-1.5 rounded bg-white/20" />
                  <span className="text-[7px] font-mono text-center text-white/40 uppercase tracking-widest">
                    Cinta Adhesiva Inviolable Dual
                  </span>
                </div>

                {/* Courier Logo */}
                <div className="my-auto text-center">
                  <p className="font-serif-luxury text-base font-bold text-white tracking-widest">
                    EXPRESS COURIER
                  </p>
                  <p className="text-[8px] text-[#D4AF37] tracking-widest uppercase mt-0.5">
                    Coex 3 Capas Antirrobo
                  </p>
                </div>

                <div className="w-full flex justify-between text-[8px] font-mono text-white/30 pt-2 border-t border-white/06">
                  <span>Inviolable</span>
                  <span>{widthCm}×{heightCm} cm</span>
                </div>
              </div>
            )}

            {/* 4. BIODEGRADABLE D2W MODEL */}
            {isBiodegradable && (
              <div className="relative w-full h-full rounded-2xl bg-[#0D150F] border border-green-500/30 shadow-2xl overflow-hidden flex flex-col items-center justify-between p-5">
                {/* Die Cut Handle */}
                <div className="w-16 h-4 rounded-full border border-green-500/40 bg-black/40 my-1" />

                <div className="my-auto text-center flex flex-col items-center gap-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-green-400 bg-green-950/60 px-3 py-0.5 rounded-full border border-green-500/30">
                    Oxo-Biodegradable d2w
                  </span>
                  <p className="font-serif-luxury text-lg font-bold text-white mt-1">
                    ECO-SMART BAG
                  </p>
                </div>

                <div className="w-full flex justify-between text-[8px] font-mono text-green-400/60 pt-2 border-t border-green-900/40">
                  <span>Degradable 24M</span>
                  <span>{widthCm}×{heightCm} cm</span>
                </div>
              </div>
            )}

            {/* 5. REUTILIZABLE TNT MODEL */}
            {isTNT && (
              <div className="relative w-full h-full rounded-2xl bg-[#161618] border border-[#D4AF37]/30 shadow-2xl overflow-hidden flex flex-col items-center justify-between p-5">
                {/* Shoulder Straps */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-8">
                  <div className="w-3 h-16 bg-[#D4AF37]/80 rounded-t-md shadow" />
                  <div className="w-3 h-16 bg-[#D4AF37]/80 rounded-t-md shadow" />
                </div>

                <div className="w-full border-b border-dashed border-white/20 pt-4 pb-1 text-center">
                  <span className="text-[8px] font-mono text-[#D4AF37]">
                    Tela No Tejida Spunbond 90g
                  </span>
                </div>

                <div className="my-auto text-center">
                  <p className="font-serif-luxury text-lg font-bold text-white tracking-wider">
                    TNT EXECUTIVE
                  </p>
                  <p className="text-[8px] text-[#D4AF37] tracking-widest uppercase mt-0.5">
                    +200 Ciclos de Reuso
                  </p>
                </div>

                <div className="w-full flex justify-between text-[8px] font-mono text-white/40 pt-2 border-t border-white/06">
                  <span>Reutilizable</span>
                  <span>{widthCm}×{heightCm} cm</span>
                </div>
              </div>
            )}

            {/* 3D Side Gusset Preview Overlay (When viewMode === 'gusset') */}
            {viewMode === 'gusset' && (
              <div className="absolute inset-0 bg-[#09090B]/90 backdrop-blur-md rounded-2xl border border-[#D4AF37] flex flex-col items-center justify-center p-4 text-center">
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2">
                  Vista de Fuelle Profundo
                </span>
                <div
                  className="border-2 border-dashed border-[#D4AF37]/60 rounded-xl bg-[#D4AF37]/05 flex items-center justify-center my-2 transition-all duration-300"
                  style={{ width: `${relG * 2.5}px`, height: '120px' }}
                >
                  <span className="text-xs font-mono text-white">
                    {gussetCm} cm
                  </span>
                </div>
                <span className="text-[10px] text-white/60">
                  Ampliación estructural de volumen interno
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Floating Spec Badge Overlay */}
        <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-[10px] text-white flex items-center gap-3">
          <div>
            <span className="text-white/40">Impresión:</span>{' '}
            <span className="text-[#D4AF37] font-semibold">{printName}</span>
          </div>
          <div className="w-px h-3 bg-white/20" />
          <div>
            <span className="text-white/40">Acabado:</span>{' '}
            <span className="text-white font-semibold">{finishName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
