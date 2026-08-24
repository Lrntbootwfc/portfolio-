import { useState } from 'react';
import { about, profile, hero } from '@/data/portfolio';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { CheckCircle2 } from 'lucide-react';

export default function About() {
  const [photoIdx, setPhotoIdx] = useState(0);
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const [allFailed, setAllFailed] = useState(false);

  const photoCandidates = hero.photoCandidates || [
    'pro pic.png',
    'pro pic.jpg',
    'pro pic.jpeg',
    'propic.png',
    'propic.jpg',
    'pro_pic.png',
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
    <section id="about" className="section-padding bg-paper-200/40">
      <div className="container-content">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:items-start">
          {/* Left: Heading + Identity visual container */}
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="ABOUT"
              title={<>The person behind the work</>}
            />

            {/* Photo / Identity card */}
            <Reveal className="relative overflow-hidden rounded-3xl border border-paper-300 bg-paper-100 p-8">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-accent-100/80 border border-accent-200">
                    {!allFailed && currentPhotoSrc ? (
                      <img
                        src={currentPhotoSrc}
                        alt={profile.name}
                        onLoad={() => setPhotoLoaded(true)}
                        onError={handleImageError}
                        className={`h-full w-full object-cover ${
                          photoLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    ) : null}
                    {(!photoLoaded || allFailed) && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display text-2xl font-500 text-accent-500">
                          {profile.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-500 text-ink-900">
                      {profile.name}
                    </h3>
                    <p className="font-mono text-xs text-ink-500">{profile.role}</p>
                    <p className="font-mono text-[11px] text-accent-500 mt-0.5">
                      {profile.location}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-paper-300 bg-paper-50 p-4">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-ink-400 block mb-1">
                    Core Philosophy
                  </span>
                  <p className="font-display text-base text-ink-800 font-400 italic">
                    "{about.headline}"
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: Natural storytelling + Focus areas */}
          <div className="flex flex-col gap-8">
            <Reveal className="flex flex-col gap-5">
              <h3 className="font-display text-display-lg font-400 text-ink-900 leading-tight">
                {about.headline}
              </h3>
              {about.paragraphs.map((para, i) => (
                <p key={i} className="text-base leading-relaxed text-ink-600 text-pretty">
                  {para}
                </p>
              ))}
            </Reveal>

            {/* Focus areas */}
            <Reveal delay={100} className="flex flex-col gap-4 pt-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-500">
                Core Competencies & Interests
              </span>
              <ul className="grid gap-3 sm:grid-cols-1">
                {about.focusAreas.map((area, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-paper-300 bg-paper-100 px-4 py-3 text-sm text-ink-800"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-500" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
