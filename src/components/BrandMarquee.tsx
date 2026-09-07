'use client';

const TAGS = [
  'Hot-Stamping 24K',
  'Laminado Soft-Touch',
  'Biodegradable d2w',
  'Zipper Hermético',
  'Triple Barrera AL+PET',
  'Oxo-Biodegradable',
  'FSC® Certificado',
  'ISO 22000',
  'TNT Executive Gold',
  'Courier Inviolable',
];

export function BrandMarquee() {
  // Duplicate for seamless infinite loop
  const items = [...TAGS, ...TAGS];

  return (
    <div className="relative bg-[#09090B] border-y border-[#D4AF37]/20 overflow-hidden py-4">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#09090B] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#09090B] to-transparent pointer-events-none" />

      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'marquee-spin 28s linear infinite' }}
      >
        {items.map((tag, i) => (
          <div key={i} className="flex items-center gap-6 px-6">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#D4AF37]">
              {tag}
            </span>
            <span className="text-[#D4AF37]/30 text-lg select-none">◆</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee-spin {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
