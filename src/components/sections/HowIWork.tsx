import { howIWork } from '@/data/portfolio';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

export default function HowIWork() {
  return (
    <section id="process" className="section-padding">
      <div className="container-content">
        <SectionHeading
          eyebrow="HOW I WORK"
          title={<>From Requirement to Delivery</>}
          description="A structured, predictable 5-step process designed to give freelance and business clients complete confidence in project delivery."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {howIWork.map((item, i) => (
            <Reveal
              key={item.step}
              delay={i * 80}
              className="flex flex-col justify-between rounded-2xl border border-paper-300 bg-paper-100 p-6 transition-all duration-300 hover:border-ink-300 hover:shadow-xs"
            >
              <div className="flex flex-col gap-3">
                <span className="font-mono text-xs font-semibold text-accent-500">
                  {item.step}
                </span>
                <h3 className="font-display text-xl font-400 text-ink-900">
                  {item.title}
                </h3>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-ink-600 text-pretty">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
