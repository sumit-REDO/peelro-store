import { useState } from 'react';
import { ArrowRight, Bike, CheckCircle2, Laptop, Sparkles, Smartphone, Waves } from 'lucide-react';

const surfaces = [
  {
    id: '01',
    title: 'Laptops & MacBooks',
    material: 'Anodized Aluminum & Matte Plastic',
    badge: 'Zero Residue Peel',
    description:
      'Cover your lid with designs that survive sliding in and out of crowded college backpacks every day.',
    tip: 'Safe on MacBook aluminum and ThinkPad matte lids—leaves zero sticky ghosting when removed.',
    image: '/surfaces/laptop-setup.jpg',
    Icon: Laptop,
  },
  {
    id: '02',
    title: 'Hydro Flasks & Tumblers',
    material: 'Powder-Coated & Stainless Steel',
    badge: 'Dish-Soap Safe',
    description:
      'Iced coffee condensation, sink washes, and gym bags are fine. The waterproof vinyl stays locked on.',
    tip: 'Flexible vinyl hugs curved bottle walls without lifting at the edges.',
    image: '/surfaces/bottle-setup.jpg',
    Icon: Waves,
  },
  {
    id: '03',
    title: 'Phones, Kindles & iPads',
    material: 'Smooth TPU, Polycarbonate & Cases',
    badge: 'Scratch-Shielded',
    description:
      'Add personality to your clear case or Kindle cover without ink rubbing off in your pocket.',
    tip: 'Swap stickers anytime you want a fresh aesthetic—peels off in one clean sheet.',
    image: '/surfaces/peel-demo.jpg',
    Icon: Smartphone,
  },
  {
    id: '04',
    title: 'Helmets, Bikes & Gear',
    material: 'Painted Shells & Hard Cases',
    badge: 'Sun & Rain Ready',
    description:
      'Weather-resistant vinyl built for Kolkata monsoons, sunny campus rides, and daily commutes.',
    tip: 'Wipe the shell dry before sticking and press firmly from the center outward.',
    image: '/surfaces/in-hand.jpg',
    Icon: Bike,
  },
];

const applicationSteps = [
  {
    step: 'STEP 01',
    title: 'Wipe clean & dry',
    detail: 'Clean dust or oil off your laptop, bottle, or case so the adhesive bonds evenly.',
  },
  {
    step: 'STEP 02',
    title: 'Peel & press flat',
    detail: 'Peel the backing and smooth from the center to the edges—no air bubbles.',
  },
  {
    step: 'STEP 03',
    title: 'Swap whenever you want',
    detail: 'Lift a corner slowly to peel it off in one piece with zero gummy residue.',
  },
];

export default function Surfaces() {
  const [activeId, setActiveId] = useState('01');

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="surfaces" className="border-b border-[#1F4A52] bg-[#0A1518]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#FFFACD]">
              Field-Tested Surfaces
            </p>
            <h2 className="mt-2 font-serif text-3xl font-black tracking-tight text-white sm:text-4xl">
              Made for the gear you carry every day.
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#8B8F8E]">
              Stick them on, wash them, toss them in your bag. Select any surface below to
              see how our vinyl performs on real materials.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start border border-[#1F4A52] bg-[#1A1F22] px-3 py-2 text-xs font-semibold text-[#8B8F8E] md:self-auto">
            <Sparkles size={14} className="text-[#FFFACD]" />
            <span>Tested on smooth metal, plastic & glass</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {surfaces.map(({ id, title, material, badge, description, tip, image, Icon }) => {
            const isSelected = activeId === id;

            return (
              <article
                key={id}
                className={`group flex flex-col justify-between overflow-hidden border transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(255,14,26,0.12)] ${
                  isSelected ? 'border-[#FF0E1A] bg-[#1A1F22] ring-1 ring-[#FF0E1A]' : 'border-[#1F4A52] bg-[#1A1F22]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveId(id)}
                  aria-pressed={isSelected}
                  className="flex flex-1 flex-col justify-between text-left focus-visible:outline-2 focus-visible:outline-[#FF0E1A]"
                >
                  <div className="w-full">
                    <div className="relative aspect-4/3 overflow-hidden bg-[#0A1518]">
                      <img
                        src={image}
                        alt={title}
                        width={400}
                        height={300}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
                        <span className="bg-[#0A1518] px-2 py-0.5 font-mono text-[10px] font-bold text-white">
                          {id}
                        </span>
                        <span className="border border-[#1F4A52] bg-[#0A1518]/95 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#FFFACD]">
                          {badge}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#0A1518] text-[#FFFACD] group-hover:bg-[#B50B16] group-hover:text-white">
                          <Icon size={15} />
                        </div>
                        <h3 className="font-serif text-sm font-bold text-white">{title}</h3>
                      </div>

                      <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-[#8B8F8E]">
                        {material}
                      </p>
                      <p className="mt-2 text-xs leading-5 text-[#8B8F8E]">{description}</p>
                    </div>
                  </div>

                  <div className="w-full border-t border-[#1F4A52] bg-[#0A1518] px-4 py-3 text-[11px] leading-4 text-white">
                    <span className="font-bold text-[#FFFACD]">Studio tip: </span>
                    <span className="text-[#8B8F8E]">{tip}</span>
                  </div>
                </button>
              </article>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 items-center gap-6 border border-[#1F4A52] bg-[#1A1F22] p-5 text-white sm:p-6 lg:grid-cols-12">
          <div className="flex items-center gap-4 lg:col-span-4">
            <img
              src="/surfaces/sticker-hand.jpg"
              alt="Hand-cut PEELRO sticker in hand"
              width={80}
              height={80}
              loading="lazy"
              decoding="async"
              className="h-20 w-20 shrink-0 border border-[#1F4A52] object-cover"
            />
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#FFFACD]">
                3-Step Application
              </span>
              <h3 className="mt-1 font-serif text-lg font-bold text-white">
                How to get a bubble-free stick.
              </h3>
              <p className="mt-1 text-xs text-[#8B8F8E]">
                Works on any smooth, non-textured surface.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:col-span-6">
            {applicationSteps.map((item) => (
              <div key={item.step} className="border border-[#1F4A52] bg-[#0A1518] p-3">
                <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-[#FFFACD]">
                  <CheckCircle2 size={12} className="text-[#A38C5A]" />
                  <span>{item.step}</span>
                </div>
                <div className="mt-1 text-xs font-bold text-white">{item.title}</div>
                <p className="mt-1 text-[11px] leading-4 text-[#8B8F8E]">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="flex lg:col-span-2 lg:justify-end">
            <button
              type="button"
              onClick={scrollToCatalog}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 bg-[#FF0E1A] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#B50B16] lg:w-auto"
            >
              <span>Pick stickers</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}