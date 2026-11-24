import { MapPin, Scissors, Truck } from 'lucide-react';

const details = [
  {
    Icon: Scissors,
    title: 'Printed and hand-cut',
    copy: 'Each order starts on an Epson EcoTank and is finished with careful cuts by hand.',
  },
  {
    Icon: Truck,
    title: 'Packed so it arrives flat',
    copy: 'Rigid board mailers keep your stickers from bending on the way to you.',
  },
  {
    Icon: MapPin,
    title: 'Made in Barrackpore',
    copy: 'A small college-student-run studio in Kolkata, making things we want to use too.',
  },
];

export default function AboutUs() {
  return (
    <section id="our-story" className="border-b border-[#1F4A52] bg-[#0D2F36]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-12 lg:items-center lg:px-8">
        <div className="lg:col-span-6">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#FFFACD]">
            Our story
          </p>
          <h2 className="mt-2 max-w-lg font-serif text-3xl font-black tracking-tight text-white sm:text-4xl">
            Started at a college desk in Barrackpore.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[#8B8F8E]">
            PEELRO started with a simple problem: most fun stickers looked great for a week,
            then peeled or faded. So we began making our own. We print on waterproof vinyl
            with Epson EcoTank archival inks, hand-cut every sheet with precision craft
            scissors, and pack orders in rigid board mailers so they reach you flat.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#8B8F8E]">
            It is a small studio, not a giant collection. That means every design gets made,
            checked, and packed by a real person before it leaves Barrackpore.
          </p>
        </div>

        <div className="grid gap-3 lg:col-span-6">
          {details.map(({ Icon, title, copy }) => (
            <div
              key={title}
              className="group flex gap-4 border border-[#1F4A52] bg-[#1A1F22] p-4 transition-colors hover:border-[#B50B16] sm:p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#1F4A52] bg-[#0A1518] text-[#FFFACD] transition-colors group-hover:border-[#B50B16] group-hover:bg-[#B50B16] group-hover:text-white">
                <Icon size={18} />
              </div>
              <div>
                <h3 className="font-serif text-sm font-bold text-white">{title}</h3>
                <p className="mt-1 text-xs leading-5 text-[#8B8F8E]">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}