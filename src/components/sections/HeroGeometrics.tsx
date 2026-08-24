/**
 * Subtle animated geometric elements surrounding the hero photo container.
 * Conceptually maps to BUILD → ANALYZE → EXPLORE:
 *   - BUILD: structural lines / grid fragments (rectilinear)
 *   - ANALYZE: data-like dots and connecting lines (scattered points)
 *   - EXPLORE: orbiting ring / rotating arc (circular motion)
 *
 * All movement is slow and subtle. Never competes with the photo or headline.
 * Animations are reduced on mobile via Tailwind's responsive prefixes.
 */
export default function HeroGeometrics() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* === BUILD — structural rectilinear elements === */}

      {/* Thin horizontal line — top left, slow draw */}
      <div
        className="absolute left-0 top-[8%] h-px w-24 origin-left bg-ink-300 animate-draw-line hidden sm:block"
        style={{ animationDelay: '0s' }}
      />

      {/* Small square outline — floating */}
      <div
        className="absolute left-[2%] top-[55%] h-12 w-12 border border-paper-400 animate-float-slow hidden lg:block"
        style={{ animationDelay: '1s' }}
      />

      {/* Vertical line fragment — right side */}
      <div
        className="absolute right-[6%] top-[10%] h-20 w-px bg-ink-200 animate-float-slower hidden sm:block"
        style={{ animationDelay: '0.5s' }}
      />

      {/* Corner bracket — bottom left */}
      <div className="absolute bottom-[6%] left-[3%] hidden lg:block">
        <div className="h-6 w-6 border-l border-b border-paper-400 animate-float-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* === ANALYZE — scattered data points and connectors === */}

      {/* Dot cluster — top right area */}
      <svg
        className="absolute right-[10%] top-[20%] h-24 w-24 animate-float-slow hidden sm:block"
        style={{ animationDelay: '1.5s' }}
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="20" cy="20" r="2" className="fill-ink-300" />
        <circle cx="60" cy="15" r="2" className="fill-ink-300" />
        <circle cx="80" cy="50" r="2" className="fill-ink-300" />
        <circle cx="40" cy="60" r="2" className="fill-ink-300" />
        <circle cx="15" cy="75" r="2" className="fill-ink-300" />
        <line x1="20" y1="20" x2="60" y2="15" stroke="currentColor" strokeWidth="0.5" className="text-ink-200" />
        <line x1="60" y1="15" x2="80" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-ink-200" />
        <line x1="40" y1="60" x2="15" y2="75" stroke="currentColor" strokeWidth="0.5" className="text-ink-200" />
      </svg>

      {/* Small bar chart fragment — bottom right */}
      <div
        className="absolute bottom-[12%] right-[4%] flex items-end gap-1 animate-float-slower hidden lg:flex"
        style={{ animationDelay: '0.8s' }}
      >
        <div className="h-4 w-1.5 bg-paper-400" />
        <div className="h-7 w-1.5 bg-paper-400" />
        <div className="h-5 w-1.5 bg-paper-400" />
        <div className="h-10 w-1.5 bg-ink-300" />
        <div className="h-6 w-1.5 bg-paper-400" />
      </div>

      {/* === EXPLORE — orbiting circular element === */}

      {/* Rotating ring — left middle */}
      <div
        className="absolute left-[5%] top-[25%] h-16 w-16 rounded-full border border-paper-400 animate-rotate-slow hidden lg:block"
        style={{ animationDelay: '0s' }}
      >
        <div className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent-400" />
      </div>

      {/* Pulsing soft circle — behind photo, top right */}
      <div
        className="absolute right-[2%] top-[5%] h-20 w-20 rounded-full bg-accent-200/30 animate-pulse-soft hidden sm:block"
        style={{ animationDelay: '0s' }}
      />

      {/* Thin diagonal line — drifting */}
      <div
        className="absolute bottom-[20%] left-[8%] h-px w-32 origin-left rotate-12 bg-ink-200 animate-drift hidden lg:block"
        style={{ animationDelay: '1s' }}
      />

      {/* Small triangle outline — floating near bottom right */}
      <svg
        className="absolute bottom-[25%] right-[15%] h-8 w-8 animate-float-slow hidden lg:block"
        style={{ animationDelay: '2.5s' }}
        viewBox="0 0 32 32"
        fill="none"
      >
        <polygon points="16,4 28,28 4,28" stroke="currentColor" strokeWidth="1" className="text-paper-400" />
      </svg>
    </div>
  );
}
