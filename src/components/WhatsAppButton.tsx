'use client';

import { useEffect, useState } from 'react';

export function WhatsAppButton() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const phone = '521XXXXXXXXXX'; // ← reemplaza con tu número
  const message = encodeURIComponent('Hola, me interesa cotizar empaques de lujo.');
  const href = `https://wa.me/${phone}?text=${message}`;

  if (!mounted) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="
        fixed bottom-6 right-6 z-[999]
        flex items-center justify-center
        w-14 h-14 rounded-full
        bg-[#25D366] shadow-[0_4px_24px_rgba(37,211,102,0.5)]
        hover:scale-110 hover:shadow-[0_6px_32px_rgba(37,211,102,0.7)]
        active:scale-95
        transition-all duration-300 ease-out
        group
      "
    >
      {/* Ping ring animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 group-hover:opacity-0" />

      {/* WhatsApp SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-7 h-7 fill-white relative z-10"
        aria-hidden
      >
        <path d="M16.003 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.347.613 4.64 1.773 6.667L2.667 29.333l6.88-1.76A13.28 13.28 0 0 0 16.003 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16.003 2.667zm0 24a11.013 11.013 0 0 1-5.6-1.533l-.4-.24-4.08 1.04 1.067-3.973-.267-.413A10.947 10.947 0 0 1 5.333 16c0-5.893 4.8-10.667 10.67-10.667S26.667 10.107 26.667 16 21.88 26.667 16.003 26.667zm5.853-7.973c-.32-.16-1.893-.933-2.187-1.04-.293-.107-.507-.16-.72.16-.213.32-.827 1.04-.987 1.227-.16.186-.32.213-.64.053-.32-.16-1.347-.493-2.56-1.573-.947-.84-1.587-1.88-1.773-2.2-.187-.32-.02-.493.14-.653.147-.147.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.26-.627-.52-.533-.72-.547-.187-.013-.4-.013-.613-.013a1.175 1.175 0 0 0-.853.4c-.293.32-1.12 1.093-1.12 2.667s1.147 3.093 1.307 3.307c.16.213 2.253 3.44 5.467 4.827.763.333 1.36.533 1.827.68.767.24 1.467.207 2.013.127.613-.093 1.893-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373z" />
      </svg>

      {/* Tooltip */}
      <span className="
        absolute right-16 top-1/2 -translate-y-1/2
        bg-[#09090B] text-white text-[11px] font-semibold
        tracking-wide whitespace-nowrap
        px-3 py-1.5 rounded-lg
        opacity-0 pointer-events-none
        group-hover:opacity-100
        transition-opacity duration-200
        shadow-lg
      ">
        Escribenos
      </span>
    </a>
  );
}
