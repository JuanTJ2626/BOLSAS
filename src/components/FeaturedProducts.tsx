'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const FEATURED_BAGS = [
  {
    id: 1,
    name: 'Bolsa Boutique Luxury',
    code: 'PKG-LUX-01',
    tag: 'Bestseller',
    tagColor: '#D4AF37',
    desc: 'Cartón Estucado 250g con Hot-Stamping Oro 24K y laminado Soft-Touch.',
    img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    price: 'Desde $0.38 / pz',
    features: ['Hot-Stamping 24K', 'Soft-Touch Mate', 'FSC® Certified'],
  },
  {
    id: 2,
    name: 'Zipper Stand-Up Black & Gold',
    code: 'PKG-ZIP-03',
    tag: 'Alimentos',
    tagColor: '#09090B',
    desc: 'Tri-laminado PET+AL+PE con barrera absoluta para café gourmet y semillas.',
    img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
    price: 'Desde $0.26 / pz',
    features: ['Triple Barrera', 'Zipper Hermético', 'FDA Approved'],
  },
  {
    id: 3,
    name: 'Courier Inviolable Black',
    code: 'PKG-COURIER-04',
    tag: 'E-commerce',
    tagColor: '#52525B',
    desc: 'Polietileno coextruido 3 capas con cinta inviolable estilo premium.',
    img: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=800&q=80',
    price: 'Desde $0.14 / pz',
    features: ['Cinta Inviolable', 'PCR Reciclado', 'GRS Certified'],
  },
  {
    id: 4,
    name: 'Reutilizable TNT Executive',
    code: 'PKG-TNT-EXE',
    tag: '+200 usos',
    tagColor: '#16A34A',
    desc: 'Tela no tejida spunbond 90g con serigrafía dorada metálica y asa de hombro.',
    img: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=800&q=80',
    price: 'Desde $0.32 / pz',
    features: ['200+ reusos', 'OEKO-TEX® S100', 'Serigrafía Gold'],
  },
];

export function FeaturedProducts() {
  return (
    <section id="coleccion" className="relative bg-white py-28 overflow-hidden">
      {/* BG texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-screen-xl mx-auto px-6 md:px-12 xl:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col gap-4 mb-16"
        >
          <h2 className="font-serif-luxury text-[clamp(2rem,4vw,3.5rem)] leading-tight text-[#09090B]">
            Nuestros empaques{' '}
            <span className="gold-gradient-text">estrella</span>
          </h2>
          <p className="text-[#71717A] text-lg max-w-xl leading-relaxed">
            Cada bolsa es fabricada con estándares internacionales, tintas premium y acabados que hacen que tu marca destaque en anaquel y en línea.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_BAGS.map((bag, i) => (
            <motion.div
              key={bag.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -8 }}
              className="product-card group relative flex flex-col rounded-[24px] overflow-hidden bg-white border border-[#E4E4E7] shadow-[0_4px_24px_-4px_rgba(9,9,11,0.08)] hover:shadow-[0_16px_48px_-8px_rgba(212,175,55,0.22)] hover:border-[#D4AF37]/50 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-[#F9F9F9]">
                <div className="card-img-inner absolute inset-0 group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={bag.img}
                    alt={bag.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center"
                  />
                </div>
                {/* Top overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10" />
                {/* Tag */}
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-[10px] font-bold tracking-wider uppercase shadow"
                  style={{ backgroundColor: bag.tagColor }}
                >
                  {bag.tag}
                </div>
                {/* Code badge */}
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-[10px] font-mono font-bold text-[#71717A] border border-[#E4E4E7]">
                  {bag.code}
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 gap-3 p-5">
                <h3 className="font-serif-luxury text-base font-bold text-[#09090B] leading-tight group-hover:text-[#8C6A10] transition-colors duration-300">
                  {bag.name}
                </h3>
                <p className="text-[#71717A] text-xs leading-relaxed flex-1">
                  {bag.desc}
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-1.5">
                  {bag.features.map((f) => (
                    <span
                      key={f}
                      className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#D4AF37]/08 text-[#8C6A10] border border-[#D4AF37]/20"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between pt-2 border-t border-[#F4F4F6]">
                  <span className="text-xs font-semibold text-[#09090B]">{bag.price}</span>
                  <a
                    href="#cotizador"
                    className="text-[11px] font-bold text-[#D4AF37] hover:text-[#8C6A10] transition-colors tracking-wide uppercase flex items-center gap-1"
                  >
                    Cotizar
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all CTA */}
        <div className="flex justify-center mt-14">
          <a
            href="#catalogo"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[#09090B] text-[#09090B] text-sm font-semibold tracking-wide hover:bg-[#09090B] hover:text-white transition-all duration-300 group"
          >
            Ver catálogo completo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform duration-300"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
