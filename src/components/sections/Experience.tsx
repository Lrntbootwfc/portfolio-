import { experience } from '@/data/portfolio';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { Calendar, Layers, Database } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="section-padding">
      <div className="container-content">
        <SectionHeading
          eyebrow="EXPERIENCE"
          title={<>Professional Experience</>}
          description="Practical internship roles focused on data analysis, software pipelines, and responsive web development."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {experience.map((entry, i) => (
            <Reveal
              key={entry.company}
              delay={i * 100}
              className="flex flex-col justify-between rounded-3xl border border-paper-300 bg-paper-100 p-7 sm:p-9 transition-all duration-300 hover:border-ink-300 hover:shadow-xs"
            >
              <div className="flex flex-col gap-5">
                {/* Header with Role, Company and Date */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-paper-300 pb-5">
                  <div>
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-500">
                      {entry.company}
                    </span>
                    <h3 className="font-display text-display-md font-400 text-ink-900 mt-0.5">
                      {entry.role}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-paper-200 px-3 py-1 font-mono text-xs font-medium text-ink-600">
                    <Calendar className="h-3 w-3 text-ink-400" />
                    <span>{entry.period}</span>
                  </div>
                </div>

                {/* Project / Context & Scope Highlight */}
                <div className="flex flex-col gap-1 rounded-xl border border-paper-300 bg-paper-50 p-4">
                  <div className="flex items-center gap-2">
                    {i === 0 ? (
                      <Database className="h-4 w-4 text-accent-500" />
                    ) : (
                      <Layers className="h-4 w-4 text-accent-500" />
                    )}
                    <span className="font-display text-sm font-500 text-ink-900">
                      {entry.context}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-ink-500 pl-6">
                    {entry.scope}
                  </span>
                </div>

                {/* Technologies */}
                <div className="flex flex-col gap-2 pt-1">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-400">
                    Technologies & Tools
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {entry.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-paper-300 bg-paper-200/80 px-3 py-1 font-mono text-xs text-ink-700 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
