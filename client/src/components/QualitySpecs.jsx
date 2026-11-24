import { Droplets, ShieldCheck, Check, Layers } from 'lucide-react';

export default function QualitySpecs() {
  const specs = [
    {
      id: '01',
      icon: <Droplets className="text-[#FFFACD]" size={20} />,
      tag: 'WATER-LOCK LAYER',
      title: '100% Waterproof',
      desc: 'Wash your water bottle with soap and cold water. The archival ink stays sharp and the vinyl stays sealed.',
    },
    {
      id: '02',
      icon: <ShieldCheck className="text-[#FFFACD]" size={20} />,
      tag: 'LAMINATED SHIELD',
      title: 'Ready for backpacks',
      desc: 'Chargers, keys, and daily travel are no problem. A protective overcoat prevents scratches and fading.',
    },
    {
      id: '03',
      icon: <Check className="text-[#FFFACD]" size={20} />,
      tag: 'REMOVABLE ADHESIVE',
      title: 'Zero sticky residue',
      desc: 'When you want to swap designs, peel it away in one piece without leaving gummy glue or torn paper behind.',
    },
    {
      id: '04',
      icon: <Layers className="text-[#FFFACD]" size={20} />,
      tag: 'FLEXIBLE PVC VINYL',
      title: 'Thick vinyl, not paper',
      desc: 'Durable vinyl flexes smoothly around curved bottles and helmets without tearing or wrinkling.',
    },
  ];

  return (
    <section id="why-peelro" className="border-b border-[#1F4A52] bg-[#0D2F36] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 border-b border-[#1F4A52] pb-5 md:flex-row md:items-end">
          <div>
            <span className="mb-1 block font-mono text-xs font-bold uppercase tracking-widest text-[#FFFACD]">
              Why they last
            </span>
            <h2 className="font-serif text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
              Built for everyday abuse.
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-[#8B8F8E]">
            We print on thick waterproof vinyl and seal every sheet with a protective clear layer so
            your stickers handle bottles, backpacks, and daily commutes.
          </p>
        </div>

        <div className="grid grid-cols-1 border-t border-l border-[#1F4A52] sm:grid-cols-2 lg:grid-cols-4">
          {specs.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between border-r border-b border-[#1F4A52] bg-[#1A1F22] p-5 transition-colors hover:bg-[#0D2F36]"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center border border-[#1F4A52] bg-[#0A1518] transition-colors group-hover:border-[#B50B16]">
                    {item.icon}
                  </div>
                  <span className="font-mono text-xs font-bold text-[#8B8F8E] group-hover:text-[#FFFACD]">
                    {item.id}
                  </span>
                </div>

                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#8B8F8E]">
                  {item.tag}
                </span>
                <h3 className="mt-1 mb-1.5 font-serif text-base font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-[#8B8F8E]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}