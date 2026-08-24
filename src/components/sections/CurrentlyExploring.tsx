import { exploring } from '@/data/portfolio';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { Compass } from 'lucide-react';

export default function CurrentlyExploring() {
  return (
    <section id="exploring" className="section-padding">
      <div className="container-content">
        <SectionHeading
          eyebrow="CURRENTLY EXPLORING"
          title={<>Active Exploration & Research</>}
          description="Specific emerging domains, architectures, and engineering methods I am actively studying and testing."
        />

        <div className="mt-14 flex flex-col gap-3">
          {exploring.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 60}
              className="flex flex-col gap-3 rounded-2xl border border-paper-300 bg-paper-100 p-5 transition-all duration-200 hover:border-ink-300 hover:bg-paper-50 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-500 border border-accent-200">
                  <Compass className="h-4 w-4" />
                </div>
                <h3 className="font-display text-lg font-500 text-ink-900">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-ink-600 sm:max-w-md text-pretty">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
