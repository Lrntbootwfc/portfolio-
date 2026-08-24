import { skillGroups } from '@/data/portfolio';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

export default function Skills() {
  return (
    <section id="skills" className="section-padding bg-paper-200/40">
      <div className="container-content">
        <SectionHeading
          eyebrow="SKILLS"
          title={<>Technical Toolkit</>}
          description="Categorized technical competencies across modern web development, data analysis, machine learning algorithms, and engineering platforms."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal
              key={group.category}
              delay={i * 70}
              className="flex flex-col gap-4 rounded-2xl border border-paper-300 bg-paper-100 p-6 transition-colors duration-200 hover:border-ink-300"
            >
              <div className="border-b border-paper-300 pb-3">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-500">
                  {group.category}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-paper-300 bg-paper-200/70 px-3 py-1 font-mono text-xs text-ink-800 font-medium transition-colors hover:border-ink-400 hover:bg-paper-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
