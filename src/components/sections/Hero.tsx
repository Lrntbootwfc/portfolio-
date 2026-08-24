import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { hero, heroCredibility, profile } from '@/data/portfolio';
import HeroGeometrics from './HeroGeometrics';

export default function Hero() {
  const [photoIdx, setPhotoIdx] = useState(0);
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const [allFailed, setAllFailed] = useState(false);

  const photoCandidates = hero.photoCandidates || [
    'pro pic.png',
    'pro pic.jpg',
    'pro pic.jpeg',
    'pro pic.webp',
    'propic.png',
    'propic.jpg',
    'pro_pic.png',
    'pro_pic.jpg',
    'pro-pic.png',
    'pro-pic.jpg',
    'images/pro pic.png',
    'images/propic.png',
  ];

  const handleImageError = () => {
    if (photoIdx < photoCandidates.length - 1) {
      setPhotoIdx((prev) => prev + 1);
    } else {
      setAllFailed(true);
    }
  };

  const currentPhotoSrc = photoCandidates[photoIdx] ? `/${photoCandidates[photoIdx]}` : '';
  return (
    <section className="relative overflow-hidden pt-20 lg:min-h-screen lg:flex lg:items-center">
      {/* Subtle background texture — faint grid fading outward */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #F8FAFC 1px, transparent 1px), linear-gradient(to bottom, #F8FAFC 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
        aria-hidden
      />

      <div className="container-content relative w-full py-12 lg:py-0">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 xl:gap-20">
          {/* === LEFT SIDE === */}
          <div className="flex flex-col gap-7">
            {/* Eyebrow */}
            <div
              className="animate-fade-in flex items-center gap-3"
              style={{ animationDelay: '100ms' }}
            >
              <span className="h-px w-10 bg-ink-300" />
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-500">
                {hero.eyebrow}
              </span>
            </div>

            {/* Main headline */}
            <h1
              className="animate-fade-up font-display text-display-2xl font-400 text-ink-900 text-balance"
              style={{ animationDelay: '200ms' }}
            >
              {hero.headline}
            </h1>

            {/* Supporting text */}
            <p
              className="animate-fade-up max-w-prose text-lg leading-relaxed text-ink-500 text-pretty sm:text-xl"
              style={{ animationDelay: '400ms' }}
            >
              {hero.supportingText}
            </p>

            {/* Capability line */}
            <div
              className="animate-fade-up flex items-center gap-3"
              style={{ animationDelay: '500ms' }}
            >
              <span className="font-mono text-sm font-medium text-accent-400">
                {hero.capabilityLine}
              </span>
            </div>

            {/* CTAs */}
            <div
              className="animate-fade-up flex flex-wrap items-center gap-4 pt-2"
              style={{ animationDelay: '600ms' }}
            >
              <Link
                to={hero.primaryCta.href}
                className="group inline-flex items-center gap-2 rounded-full bg-ink-900 px-7 py-3.5 text-sm font-medium text-paper-100 transition-all duration-200 hover:bg-accent-400"
              >
                {hero.primaryCta.label}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to={hero.secondaryCta.href}
                className="group inline-flex items-center gap-2 rounded-full border border-ink-200 px-7 py-3.5 text-sm font-medium text-ink-700 transition-all duration-200 hover:border-ink-900 hover:text-ink-900"
              >
                {hero.secondaryCta.label}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* === RIGHT SIDE — Photo container === */}
          <div
            className="animate-fade-in-slow relative"
            style={{ animationDelay: '300ms' }}
          >
            <HeroGeometrics />

            {/* Photo container — integrated, not a flat rectangle */}
            <div className="relative mx-auto aspect-[4/5] max-w-sm sm:max-w-md lg:mx-0 lg:ml-auto">
              {/* Offset background frame — adds depth */}
              <div className="absolute -right-3 -top-3 h-full w-full rounded-[2rem] border border-paper-400" />
              <div className="absolute -bottom-3 -left-3 h-full w-full rounded-[2rem] bg-paper-200" />

              {/* Main photo area */}
              <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-paper-300 bg-paper-200">
                {!allFailed && currentPhotoSrc ? (
                  <>
                    <img
                      src={currentPhotoSrc}
                      alt={profile.name}
                      onLoad={() => setPhotoLoaded(true)}
                      onError={handleImageError}
                      className={`h-full w-full object-cover object-center transition-all duration-500 ${photoLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        }`}
                    />
                    {!photoLoaded && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center bg-paper-200">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-paper-300 animate-pulse">
                          <span className="font-display text-3xl font-400 text-ink-400">
                            {profile.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="font-display text-lg font-500 text-ink-600">
                            {profile.name}
                          </span>
                          <span className="font-mono text-xs text-ink-400">
                            Loading profile photo...
                          </span>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center bg-paper-200">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-paper-300">
                      <span className="font-display text-3xl font-400 text-ink-400">
                        {profile.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-display text-lg font-500 text-ink-600">
                        {profile.name}
                      </span>
                      <span className="font-mono text-xs text-ink-400">
                        pro pic ({photoCandidates[0]})
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Floating label tag — bottom right */}
              <div className="absolute -bottom-4 right-6 rounded-full bg-ink-900 px-4 py-2 shadow-lg">
                <span className="font-mono text-xs text-paper-100">
                  {profile.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* === Compact credibility strip === */}
        <div
          className="animate-fade-in mt-16 border-t border-paper-300 pt-6 lg:mt-20"
          style={{ animationDelay: '800ms' }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3">
            {heroCredibility.map((item, i) => (
              <div key={i} className="flex items-center gap-4 sm:gap-x-8">
                <span className="text-sm text-ink-600">{item}</span>
                {i < heroCredibility.length - 1 && (
                  <span className="hidden h-1 w-1 shrink-0 rounded-full bg-ink-200 sm:inline-block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator — desktop only */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="text-xs text-ink-400">Scroll</span>
        <ArrowDown className="h-3.5 w-3.5 animate-bounce text-ink-400" />
      </div>
    </section>
  );
}
