import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  description: 'Fábrica de bolsas de plástico de alta densidad, empaques boutique con stamping dorado, bolsas oxo-biodegradables d2w y herméticas zipper. Cotizador interactivo en vivo.',
  keywords: ['bolsas de plastico', 'bolsas de lujo', 'hot stamping dorado', 'bolsas biodegradables', 'd2w', 'empaques hermeticos', 'bolsas boutique', 'cotizador bolsas'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <body className="antialiased bg-white text-[#09090B] selection:bg-[#D4AF37] selection:text-white">
        {children}
      </body>
    </html>
  );
}
