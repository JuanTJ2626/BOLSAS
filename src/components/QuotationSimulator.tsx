'use client';

import { useEffect, useState } from 'react';
import { PRODUCTS_DATA, VOLUME_DISCOUNT_TIERS } from '@/data/products';
import { Product, QuoteCalculationResult } from '@/types';
import { PackagingMockupCanvas } from './PackagingMockupCanvas';

// Locale-safe formatters — identical on server & client
const fmtN = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const fmtCur = (n: number) => '$' + fmtN(Math.floor(n)) + '.' + (n % 1).toFixed(2).slice(2);

interface QuotationSimulatorProps {
  selectedProductFromCatalog: Product | null;
  onSaveQuote: (quote: QuoteCalculationResult) => void;
}

export function QuotationSimulator({ selectedProductFromCatalog, onSaveQuote }: QuotationSimulatorProps) {
  const [selectedId, setSelectedId] = useState(PRODUCTS_DATA[0].id);
  const [quantity, setQuantity] = useState(5000);
  const [printId, setPrintId] = useState('');
  const [finishId, setFinishId] = useState('');
  const [savedMsg, setSavedMsg] = useState(false);

  const product = PRODUCTS_DATA.find(p => p.id === selectedId) ?? PRODUCTS_DATA[0];

  // Dimension states
  const [heightCm, setHeightCm] = useState(product.availableDimensions.defaultHeight);
  const [widthCm, setWidthCm] = useState(product.availableDimensions.defaultWidth);
  const [gussetCm, setGussetCm] = useState(product.availableDimensions.defaultGusset);

  useEffect(() => {
    if (selectedProductFromCatalog) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedId(selectedProductFromCatalog.id);
    }
  }, [selectedProductFromCatalog]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrintId(product.printOptions[0]?.id ?? '');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFinishId(product.finishOptions[0]?.id ?? '');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeightCm(product.availableDimensions.defaultHeight);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWidthCm(product.availableDimensions.defaultWidth);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGussetCm(product.availableDimensions.defaultGusset);
  }, [selectedId, product]);

  // Calculation
  const printOpt = product.printOptions.find(o => o.id === printId);
  const finishOpt = product.finishOptions.find(o => o.id === finishId);
  const printMult = printOpt?.multiplier ?? 1;
  const finishMult = (finishOpt as { multiplier?: number })?.multiplier ?? 1;
  const volTier = [...VOLUME_DISCOUNT_TIERS].reverse().find(t => quantity >= t.minQty);
  const discount = volTier?.discountPercent ?? 0;
  const rawUnit = product.basePrice * printMult * finishMult;
  const finalUnit = rawUnit * (1 - discount / 100);
  const subtotal = finalUnit * quantity;
  const savings = (rawUnit - finalUnit) * quantity;
  const days = quantity >= 25000 ? 21 : quantity >= 10000 ? 14 : quantity >= 5000 ? 10 : 7;

  const quote: QuoteCalculationResult = {
    product,
    quantity,
    dimensionsText: `${widthCm}×${heightCm} cm (Fuelle ${gussetCm} cm)`,
    basePricePerUnit: product.basePrice,
    customizationFactor: printMult * finishMult,
    volumeDiscountPercent: discount,
    finalUnitPrice: finalUnit,
    subtotal,
    savingsAmount: savings,
    estimatedCo2SavedKg: quantity * 0.0008,
    productionDays: days,
  };

  const handleSave = () => {
    onSaveQuote(quote);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  };

  const isGoldFoil = printId.includes('gold') || printId.includes('stamping') || finishId.includes('gold') || finishId.includes('stamping');
  const hasWindow = finishId.includes('ventana');

  return (
    <section id="cotizador" className="bg-white py-28 border-t border-[#E4E4E7]">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 xl:px-20">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-12">

          <h2 className="font-serif-luxury text-[clamp(2rem,4vw,3.2rem)] text-[#09090B] leading-tight">
            Diseña tu empaque en <span className="gold-gradient-text">tiempo real</span>
          </h2>
          <p className="text-[#71717A] text-base max-w-xl">
            Ajusta las dimensiones, materiales y acabados. El modelo 3D responderá instantáneamente a tus configuraciones.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left — form controls */}
          <div className="flex flex-col gap-6">
            {/* Product select */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#52525B] uppercase tracking-widest">Producto & Material</label>
              <select
                value={selectedId}
                onChange={e => setSelectedId(e.target.value)}
                className="glass-gold-input w-full px-4 py-3 rounded-xl text-sm font-medium"
              >
                {PRODUCTS_DATA.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Dimension Sliders */}
            <div className="flex flex-col gap-4 p-5 rounded-2xl bg-[#F9F9FB] border border-[#E4E4E7]">
              <span className="text-xs font-semibold text-[#09090B] uppercase tracking-wider">
                Dimensiones Personalizadas (cm)
              </span>
              <div className="grid grid-cols-3 gap-4">
                {/* Alto */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#71717A]">Alto</span>
                    <span className="font-bold text-[#09090B]">{heightCm} cm</span>
                  </div>
                  <input
                    type="range"
                    min={product.availableDimensions.heightRange[0]}
                    max={product.availableDimensions.heightRange[1]}
                    value={heightCm}
                    onChange={e => setHeightCm(parseInt(e.target.value))}
                    className="accent-[#D4AF37] w-full"
                  />
                </div>

                {/* Ancho */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#71717A]">Ancho</span>
                    <span className="font-bold text-[#09090B]">{widthCm} cm</span>
                  </div>
                  <input
                    type="range"
                    min={product.availableDimensions.widthRange[0]}
                    max={product.availableDimensions.widthRange[1]}
                    value={widthCm}
                    onChange={e => setWidthCm(parseInt(e.target.value))}
                    className="accent-[#D4AF37] w-full"
                  />
                </div>

                {/* Fuelle */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#71717A]">Fuelle</span>
                    <span className="font-bold text-[#09090B]">{gussetCm} cm</span>
                  </div>
                  <input
                    type="range"
                    min={product.availableDimensions.gussetRange[0]}
                    max={product.availableDimensions.gussetRange[1]}
                    value={gussetCm}
                    onChange={e => setGussetCm(parseInt(e.target.value))}
                    className="accent-[#D4AF37] w-full"
                  />
                </div>
              </div>
            </div>

            {/* Quantity slider */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <label className="text-xs font-semibold text-[#52525B] uppercase tracking-widest">Cantidad de piezas</label>
                <span className="font-serif-luxury font-bold text-[#09090B] text-lg">{fmtN(quantity)} pz</span>
              </div>
              <input
                type="range"
                min={product.minOrderQuantity}
                max={50000}
                step={500}
                value={quantity}
                onChange={e => setQuantity(parseInt(e.target.value))}
                className="w-full accent-[#D4AF37]"
              />
              <div className="flex justify-between text-[11px] text-[#A1A1AA]">
                <span>Mín. {fmtN(product.minOrderQuantity)}</span>
                <span>50,000+</span>
              </div>
              {/* Volume tiers */}
              <div className="flex flex-wrap gap-2">
                {VOLUME_DISCOUNT_TIERS.map(t => (
                  <button
                    key={t.minQty}
                    onClick={() => setQuantity(t.minQty)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-medium border transition-all duration-200 ${quantity >= t.minQty && (VOLUME_DISCOUNT_TIERS.find(x => x.minQty > t.minQty && quantity >= x.minQty) === undefined || t === [...VOLUME_DISCOUNT_TIERS].reverse().find(x => quantity >= x.minQty))
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#8C6A10]'
                        : 'border-[#E4E4E7] text-[#71717A] hover:border-[#D4AF37]/50'
                      }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Print */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#52525B] uppercase tracking-widest">Tecnología de Impresión</label>
              <select
                value={printId}
                onChange={e => setPrintId(e.target.value)}
                className="glass-gold-input w-full px-4 py-3 rounded-xl text-sm"
              >
                {product.printOptions.map(o => (
                  <option key={o.id} value={o.id}>{o.name}</option>
                ))}
              </select>
            </div>

            {/* Finish */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#52525B] uppercase tracking-widest">Acabado de Superficie</label>
              <select
                value={finishId}
                onChange={e => setFinishId(e.target.value)}
                className="glass-gold-input w-full px-4 py-3 rounded-xl text-sm"
              >
                {product.finishOptions.map(o => (
                  <option key={o.id} value={o.id}>{o.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Right — 3D Mockup & result card */}
          <div className="flex flex-col gap-6">
            {/* 3D Mockup Canvas */}
            <PackagingMockupCanvas
              product={product}
              heightCm={heightCm}
              widthCm={widthCm}
              gussetCm={gussetCm}
              printName={printOpt?.name ?? ''}
              finishName={finishOpt?.name ?? ''}
              isGoldFoil={isGoldFoil}
              hasWindow={hasWindow}
            />

            {/* Result card */}
            <div className="rounded-[24px] border border-[#D4AF37]/25 bg-gradient-to-br from-[#09090B] to-[#1A1A1A] p-7 flex flex-col gap-5 shadow-[0_20px_60px_-10px_rgba(9,9,11,0.35)]">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-luxury text-white text-lg font-bold">Resumen de Cotización</h3>
                {discount > 0 && (
                  <span className="px-3 py-1 rounded-full bg-[#D4AF37] text-black text-[11px] font-bold tracking-wider">
                    -{discount}% Descuento
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-3">
                {[
                  { label: 'Producto', value: product.name },
                  { label: 'Dimensiones', value: `${widthCm} × ${heightCm} × ${gussetCm} cm` },
                  { label: 'Cantidad', value: `${fmtN(quantity)} piezas` },
                  { label: 'Precio unitario', value: `$${finalUnit.toFixed(4)} MXN` },
                  { label: 'Tiempo de entrega', value: `${days} días hábiles` },
                ].map(row => (
                  <div key={row.label} className="flex justify-between items-start gap-4">
                    <span className="text-[#71717A] text-xs uppercase tracking-widest">{row.label}</span>
                    <span className="text-white text-xs font-medium text-right max-w-[55%] leading-tight">{row.value}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-5 flex items-end justify-between">
                <div>
                  <p className="text-[#71717A] text-xs uppercase tracking-widest mb-1">Total estimado</p>
                  <p className="font-serif-luxury text-4xl font-bold text-white">
                    ${fmtN(Math.floor(subtotal))}.{(subtotal % 1).toFixed(2).slice(2)}
                    <span className="text-base font-normal text-[#A1A1AA] ml-1">MXN</span>
                  </p>
                  {savings > 0 && (
                    <p className="text-[#D4AF37] text-xs mt-1">
                      Ahorro: {fmtCur(savings)} MXN
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={handleSave}
                className="w-full py-4 rounded-2xl bg-[#D4AF37] text-black font-bold text-sm tracking-wide hover:bg-[#F5E0A3] transition-colors duration-300 shadow-[0_0_24px_rgba(212,175,55,0.35)] flex items-center justify-center gap-2"
              >
                {savedMsg ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    Cotización guardada
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                    Guardar Cotización
                  </>
                )}
              </button>
            </div>

            {/* Eco note */}
            <div className="flex items-start gap-3 px-5 py-4 rounded-xl bg-green-50 border border-green-200">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
              <div>
                <p className="text-green-800 text-xs font-semibold">Impacto ambiental estimado</p>
                <p className="text-green-700 text-xs mt-0.5">
                  {quote.estimatedCo2SavedKg.toFixed(1)} kg CO₂ ahorrado vs. empaque convencional no certificado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
