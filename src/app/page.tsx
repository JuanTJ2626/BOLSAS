'use client';

import React, { useState } from 'react';
import { Product, QuoteCalculationResult } from '@/types';
import { Navbar } from '@/components/Navbar';
import { HeroGSAP } from '@/components/HeroGSAP';
import { BrandMarquee } from '@/components/BrandMarquee';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { WhyUs } from '@/components/WhyUs';
import { ProductCatalog } from '@/components/ProductCatalog';
import { QuotationSimulator } from '@/components/QuotationSimulator';
import { EcoComparisonTable } from '@/components/EcoComparisonTable';
import { TrustBadges } from '@/components/TrustBadges';
import { Footer } from '@/components/Footer';
import { ProductModal } from '@/components/ProductModal';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export default function Home() {
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [quoteProduct, setQuoteProduct] = useState<Product | null>(null);
  const [savedQuotesCount, setSavedQuotesCount] = useState<number>(0);

  const handleOpenSpecs = (product: Product) => {
    setModalProduct(product);
  };

  const handleSelectForQuote = (product: Product) => {
    setQuoteProduct(product);
    setTimeout(() => {
      const el = document.getElementById('cotizador');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSaveQuote = (quote: QuoteCalculationResult) => {
    setSavedQuotesCount(prev => prev + 1);
  };

  return (
    <main className="min-h-screen bg-white text-[#09090B] selection:bg-[#D4AF37] selection:text-white font-sans">
      {/* ── Navigation ──────────────────────────────────────────── */}
      <Navbar savedQuotesCount={savedQuotesCount} />

      {/* ── GSAP Hero Section ───────────────────────────────────── */}
      <HeroGSAP />

      {/* ── Marquee Ticker ──────────────────────────────────────── */}
      <BrandMarquee />

      {/* ── Featured Products (GSAP scroll) ─────────────────────── */}
      <FeaturedProducts />

      {/* ── Why Us (GSAP reveal + stats) ────────────────────────── */}
      <WhyUs />

      {/* ── Full Interactive Catalog ─────────────────────────────── */}
      <ProductCatalog
        onOpenSpecs={handleOpenSpecs}
        onSelectForQuote={handleSelectForQuote}
      />

      {/* ── Quotation Simulator ──────────────────────────────────── */}
      <QuotationSimulator
        selectedProductFromCatalog={quoteProduct}
        onSaveQuote={handleSaveQuote}
      />

      {/* ── Eco Comparison Table ─────────────────────────────────── */}
      <EcoComparisonTable />

      {/* ── Trust & Certifications ───────────────────────────────── */}
      <TrustBadges />

      {/* ── Footer ───────────────────────────────────────────────── */}
      <Footer />

      {/* ── Product Modal ────────────────────────────────────────── */}
      <ProductModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
        onSelectForQuote={handleSelectForQuote}
      />

      {/* ── WhatsApp Floating Button ────────────────────────────── */}
      <WhatsAppButton />
    </main>
  );
}
