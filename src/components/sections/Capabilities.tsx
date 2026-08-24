import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { capabilities } from '@/data/portfolio';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

export default function Capabilities() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <section id="capabilities" className="section-padding">
      <div className="container-content">
        <SectionHeading
          eyebrow="CAPABILITIES"
          title={<>What I Build</>}
          description="Web Development, Data Analytics, and AI/ML are not isolated disciplines — they are three connected capabilities I bring together to turn complex requirements into robust, useful digital solutions."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-paper-300 bg-paper-300 sm:grid-cols-3">
          {capabilities.map((cap, i) => {
            const isHovered = activeCard === cap.id;

            return (
              <Reveal
                key={cap.id}
                delay={i * 120}
                className="group relative flex flex-col justify-between bg-paper-100 p-7 transition-all duration-300 hover:bg-paper-50 focus-within:bg-paper-50 lg:p-9"
              >
                <div
                  className="flex flex-col gap-6"
                  onMouseEnter={() => setActiveCard(cap.id)}
                  onMouseLeave={() => setActiveCard(null)}
                  onTouchStart={() => setActiveCard(cap.id)}
                >
                  {/* Top metadata & Number */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs uppercase tracking-widest text-accent-400 font-semibold">
                        {cap.number} — {cap.label}
                      </span>
                    </div>
                    <span className="font-display text-lg font-300 text-paper-400">
                      /{cap.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-display-md font-400 text-ink-900 leading-tight">
                    {cap.title}
                  </h3>

                  {/* Visual Preview Container — reveals on hover / focus / tap */}
                  <div className="relative h-28 w-full overflow-hidden rounded-xl border border-paper-300 bg-paper-200/70 p-3 transition-all duration-300 group-hover:border-ink-200 group-hover:bg-paper-200">
                    {cap.id === 'build' && <BuildVisual isHovered={isHovered} />}
                    {cap.id === 'analyze' && <AnalyzeVisual isHovered={isHovered} />}
                    {cap.id === 'explore' && <ExploreVisual isHovered={isHovered} />}
                  </div>

                  {/* Items list */}
                  <ul className="flex flex-col gap-2.5 pt-2">
                    {cap.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-ink-600 transition-colors group-hover:text-ink-800"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400/80" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Link */}
                <div className="pt-8 mt-auto">
                  <Link
                    to={cap.cta.href}
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-900 font-semibold transition-all duration-200 group-hover:text-accent-400 group-hover:translate-x-1"
                  >
                    <span>{cap.cta.label}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * 01 — BUILD: Abstract browser/interface wireframe visual
 */
function BuildVisual({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between" aria-hidden>
      {/* Browser bar */}
      <div className="flex items-center justify-between border-b border-paper-300 pb-1.5">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-paper-400" />
          <div className="h-2 w-2 rounded-full bg-paper-400" />
          <div className="h-2 w-2 rounded-full bg-paper-400" />
        </div>
        <div
          className={`h-2 rounded-full bg-paper-300 transition-all duration-500 ${
            isHovered ? 'w-24 bg-accent-200' : 'w-16'
          }`}
        />
      </div>

      {/* Wireframe interface elements */}
      <div className="grid grid-cols-3 gap-2 pt-1.5">
        {/* Left column / sidebar */}
        <div className="flex flex-col gap-1">
          <div className="h-2 w-full rounded bg-paper-300" />
          <div className="h-2 w-3/4 rounded bg-paper-300" />
          <div className="h-2 w-1/2 rounded bg-paper-300" />
        </div>

        {/* Center / main content block */}
        <div className="col-span-2 flex flex-col gap-1.5">
          <div
            className={`h-6 w-full rounded border border-paper-300 bg-paper-100 transition-all duration-300 ${
              isHovered ? 'border-accent-300 bg-paper-50 shadow-xs' : ''
            } flex items-center px-2`}
          >
            <div
              className={`h-1.5 rounded bg-ink-300 transition-all duration-500 ${
                isHovered ? 'w-3/4 bg-accent-400' : 'w-1/2'
              }`}
            />
          </div>
          <div className="grid grid-cols-2 gap-1">
            <div className="h-3 rounded bg-paper-300/80" />
            <div className="h-3 rounded bg-paper-300/80" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 02 — ANALYZE: Abstract chart/dashboard visual
 */
function AnalyzeVisual({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between" aria-hidden>
      {/* Top metrics summary line */}
      <div className="flex items-center justify-between text-[10px] font-mono text-ink-400">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
          METRIC
        </span>
        <span className={isHovered ? 'text-accent-400 font-semibold' : ''}>
          {isHovered ? '+34.8%' : 'AVG.DATA'}
        </span>
      </div>

      {/* Bar chart + sparkline composition */}
      <div className="flex items-end justify-between gap-1.5 pt-2 pb-1 border-b border-paper-300">
        <div className="flex items-end gap-1.5 flex-1 h-12">
          {[40, 65, 30, 85, 55, 95, 70].map((val, idx) => {
            const activeHeight = isHovered ? Math.min(100, val + 10) : val;
            return (
              <div
                key={idx}
                className="flex-1 rounded-xs transition-all duration-500 ease-out"
                style={{
                  height: `${activeHeight}%`,
                  backgroundColor:
                    idx === 5 && isHovered
                      ? '#C2410C'
                      : isHovered
                      ? '#D4CFC5'
                      : '#E4E0D9',
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Axis tags */}
      <div className="flex justify-between font-mono text-[9px] text-ink-400">
        <span>Q1</span>
        <span>Q2</span>
        <span>Q3</span>
        <span>Q4</span>
      </div>
    </div>
  );
}

/**
 * 03 — EXPLORE: Abstract knowledge graph / neural network visual
 */
function ExploreVisual({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center" aria-hidden>
      <svg className="h-full w-full" viewBox="0 0 200 80" fill="none">
        {/* Connection lines */}
        <line
          x1="30"
          y1="40"
          x2="80"
          y2="20"
          stroke={isHovered ? '#C2410C' : '#D4CFC5'}
          strokeWidth="1"
          strokeDasharray={isHovered ? '2 2' : 'none'}
          className="transition-colors duration-300"
        />
        <line
          x1="30"
          y1="40"
          x2="80"
          y2="60"
          stroke={isHovered ? '#DC8E6B' : '#E4E0D9'}
          strokeWidth="1"
          className="transition-colors duration-300"
        />
        <line
          x1="80"
          y1="20"
          x2="140"
          y2="30"
          stroke={isHovered ? '#C2410C' : '#D4CFC5'}
          strokeWidth="1.2"
          className="transition-colors duration-300"
        />
        <line
          x1="80"
          y1="60"
          x2="140"
          y2="50"
          stroke={isHovered ? '#DC8E6B' : '#E4E0D9'}
          strokeWidth="1"
          className="transition-colors duration-300"
        />
        <line
          x1="140"
          y1="30"
          x2="180"
          y2="40"
          stroke={isHovered ? '#C2410C' : '#D4CFC5'}
          strokeWidth="1"
          className="transition-colors duration-300"
        />
        <line
          x1="140"
          y1="50"
          x2="180"
          y2="40"
          stroke={isHovered ? '#DC8E6B' : '#E4E0D9'}
          strokeWidth="1"
          className="transition-colors duration-300"
        />
        <line
          x1="80"
          y1="20"
          x2="80"
          y2="60"
          stroke={isHovered ? '#E9B59E' : '#EFECE7'}
          strokeWidth="0.8"
        />
        <line
          x1="140"
          y1="30"
          x2="140"
          y2="50"
          stroke={isHovered ? '#E9B59E' : '#EFECE7'}
          strokeWidth="0.8"
        />

        {/* Nodes */}
        <circle cx="30" cy="40" r="3.5" fill={isHovered ? '#1A1A1A' : '#8A8A8A'} />
        <circle cx="80" cy="20" r="4" fill={isHovered ? '#C2410C' : '#A8A8A8'} />
        <circle cx="80" cy="60" r="3" fill={isHovered ? '#1A1A1A' : '#8A8A8A'} />
        <circle
          cx="140"
          cy="30"
          r={isHovered ? '5' : '4'}
          fill={isHovered ? '#C2410C' : '#6B6B6B'}
          className="transition-all duration-300"
        />
        <circle cx="140" cy="50" r="3.5" fill={isHovered ? '#1A1A1A' : '#A8A8A8'} />
        <circle
          cx="180"
          cy="40"
          r={isHovered ? '4.5' : '3.5'}
          fill={isHovered ? '#C2410C' : '#8A8A8A'}
          className="transition-all duration-300"
        />

        {/* Orbit pulse when hovered */}
        {isHovered && (
          <circle
            cx="140"
            cy="30"
            r="9"
            stroke="#C2410C"
            strokeWidth="0.75"
            strokeOpacity="0.4"
            className="animate-ping origin-center"
          />
        )}
      </svg>
    </div>
  );
}
