'use client';

const ECO_TABLE = [
  { material: 'Papel Kraft FSC®', o2: 'Media', h2o: 'Baja', recycle: '100%', badge: 'eco', star: 5 },
  { material: 'Oxo-Bio d2w HDPE', o2: 'Alta', h2o: 'Alta', recycle: 'Oxo-Bio', badge: 'eco', star: 5 },
  { material: 'Tri-Laminado PET+AL', o2: 'Máxima', h2o: 'Total', recycle: 'Industrial', badge: 'durable', star: 4 },
  { material: 'Courier Coex 3L', o2: 'Alta', h2o: 'Alta', recycle: '50% PCR', badge: 'recycled', star: 4 },
  { material: 'TNT Spunbond 90g', o2: 'Media', h2o: 'Media', recycle: '100%', badge: 'durable', star: 5 },
];

const BADGE_COLORS: Record<string, string> = {
  eco: 'bg-green-100 text-green-700',
  recycled: 'bg-blue-100 text-blue-700',
  durable: 'bg-zinc-100 text-zinc-600',
};

export function EcoComparisonTable() {
  return (
    <section className="bg-[#F9F9FB] py-20 border-t border-[#E4E4E7]">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 xl:px-20">
        <div className="flex flex-col gap-3 mb-10">
          <h2 className="font-serif-luxury text-[clamp(1.8rem,3.5vw,2.8rem)] text-[#09090B]">
            Materiales & <span className="gold-gradient-text">sustentabilidad</span>
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#E4E4E7] shadow-sm bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E4E4E7] bg-[#F9F9F9]">
                {['Material', 'Barrera O₂', 'Barrera H₂O', 'Reciclabilidad', 'Valoración'].map((h) => (
                  <th key={h} className="px-5 py-4 text-left text-[10px] uppercase tracking-widest text-[#A1A1AA] font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ECO_TABLE.map((row, i) => (
                <tr key={i} className="eco-row border-b border-[#F4F4F6] last:border-0 hover:bg-[#FFFDF5] transition-colors duration-200">
                  <td className="px-5 py-4 font-medium text-[#09090B] whitespace-nowrap">{row.material}</td>
                  <td className="px-5 py-4 text-[#52525B]">{row.o2}</td>
                  <td className="px-5 py-4 text-[#52525B]">{row.h2o}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${BADGE_COLORS[row.badge]}`}>
                      {row.recycle}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <span key={si} className={`text-sm ${si < row.star ? 'text-[#D4AF37]' : 'text-[#E4E4E7]'}`}>★</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
