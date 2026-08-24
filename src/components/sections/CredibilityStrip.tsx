import { credibility } from '@/data/portfolio';
import Reveal from '@/components/ui/Reveal';

export default function CredibilityStrip() {
  // Duplicate the array for a seamless marquee loop
  const items = [...credibility, ...credibility];

  return (
    <section className="border-y border-paper-300 bg-paper-200/50 py-6">
      <div className="container-content">
        <Reveal className="flex items-center gap-8">
          <span className="hidden shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-ink-400 sm:block">
            Working across
          </span>
          <div className="relative flex-1 overflow-hidden">
            {/* Edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper-200 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper-200 to-transparent" />
            <div className="flex w-max animate-marquee gap-12">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-12">
                  <span className="whitespace-nowrap font-display text-lg font-400 text-ink-600">
                    {item}
                  </span>
                  <span className="text-ink-300">/</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
