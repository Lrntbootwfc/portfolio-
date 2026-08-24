import { useState, useEffect } from 'react';
import { ExternalLink, Maximize2, Image as ImageIcon } from 'lucide-react';

interface ProjectScreenshotProps {
  candidates?: string[];
  src?: string;
  alt: string;
  caption?: string;
  aspectRatio?: 'video' | 'wide' | 'auto' | 'square' | 'tall';
  fit?: 'cover' | 'contain';
  className?: string;
  badge?: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
  priority?: boolean;
  allowZoom?: boolean;
}

export default function ProjectScreenshot({
  candidates = [],
  src,
  alt,
  caption,
  aspectRatio = 'video',
  fit = 'cover',
  className = '',
  badge,
  fallbackTitle,
  fallbackDescription,
  allowZoom = true,
}: ProjectScreenshotProps) {
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState<number>(0);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  // Generate full candidate list (with multiple standard extensions and path prefixes)
  const allCandidates: string[] = [];
  if (src) {
    allCandidates.push(src);
    try {
      allCandidates.push(encodeURI(src));
    } catch {
      // ignore
    }
  }

  candidates.forEach((name) => {
    if (!name) return;
    // raw name
    allCandidates.push(name);
    try {
      allCandidates.push(encodeURI(name));
    } catch {
      // ignore
    }

    // with prefixes if not starting with /
    const cleanName = name.replace(/^\/+/, '');
    const cleanNoExt = cleanName.replace(/\.[^/.]+$/, '');

    const prefixes = ['images/', 'projects/', 'assets/images/', '', 'assets/'];
    const extensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];

    prefixes.forEach((p) => {
      // direct with existing ext
      allCandidates.push(`/${p}${cleanName}`);
      try {
        allCandidates.push(encodeURI(`/${p}${cleanName}`));
      } catch {
        // ignore
      }

      // without ext + extensions
      extensions.forEach((ext) => {
        allCandidates.push(`/${p}${cleanNoExt}${ext}`);
        try {
          allCandidates.push(encodeURI(`/${p}${cleanNoExt}${ext}`));
        } catch {
          // ignore
        }
      });
    });
  });

  // Remove duplicates while preserving order
  const uniqueCandidates = Array.from(new Set(allCandidates));

  const activeSrc = uniqueCandidates[currentCandidateIndex];

  useEffect(() => {
    setCurrentCandidateIndex(0);
    setHasLoaded(false);
    setHasError(false);
  }, [src, JSON.stringify(candidates)]);

  // ESC key handler for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsZoomed(false);
    };
    if (isZoomed) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomed]);

  const handleError = () => {
    if (currentCandidateIndex < uniqueCandidates.length - 1) {
      setCurrentCandidateIndex((prev) => prev + 1);
    } else {
      setHasError(true);
    }
  };

  const aspectClasses = {
    video: 'aspect-[16/10]',
    wide: 'aspect-[21/9]',
    auto: 'min-h-[220px]',
    square: 'aspect-square',
    tall: 'aspect-[4/3]',
  }[aspectRatio];

  return (
    <>
      <div
        className={`group relative overflow-hidden rounded-2xl border border-paper-300 bg-paper-100 shadow-xs transition-all duration-300 hover:border-ink-400 ${className}`}
      >
        {/* Top Chrome / Label bar if badge is provided */}
        {badge && (
          <div className="flex items-center justify-between border-b border-paper-300 bg-paper-200/80 px-4 py-2 text-xs font-mono">
            <span className="font-semibold text-ink-800">{badge}</span>
            {hasLoaded && allowZoom && (
              <button
                type="button"
                onClick={() => setIsZoomed(true)}
                className="flex items-center gap-1 text-[11px] text-ink-500 hover:text-ink-900 transition-colors cursor-pointer"
                title="View full-size screenshot"
              >
                <Maximize2 className="h-3 w-3" />
                <span>Full Res</span>
              </button>
            )}
          </div>
        )}

        {/* Image Display Area */}
        <div
          onClick={() => {
            if (hasLoaded && allowZoom) setIsZoomed(true);
          }}
          className={`relative w-full ${aspectClasses} overflow-hidden bg-paper-200/40 flex items-center justify-center ${
            hasLoaded && allowZoom ? 'cursor-zoom-in' : ''
          }`}
        >
          {!hasError && activeSrc ? (
            <img
              src={activeSrc}
              alt={alt}
              referrerPolicy="no-referrer"
              onLoad={() => setHasLoaded(true)}
              onError={handleError}
              className={`h-full w-full ${
                fit === 'contain' ? 'object-contain p-2' : 'object-cover'
              } transition-transform duration-500 group-hover:scale-[1.01] ${
                hasLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : null}

          {/* When image is not present or while attempting resolution */}
          {(!hasLoaded || hasError) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-paper-200 border border-paper-300 text-ink-600 mb-2">
                <ImageIcon className="h-6 w-6" />
              </div>
              <span className="font-display text-sm font-500 text-ink-900">
                {fallbackTitle || alt}
              </span>
              {fallbackDescription && (
                <p className="mt-1 max-w-sm text-xs text-ink-500 leading-relaxed font-sans">
                  {fallbackDescription}
                </p>
              )}
              {badge && (
                <span className="mt-3 rounded-full bg-paper-200 px-3 py-1 font-mono text-[10px] text-ink-600 border border-paper-300">
                  {badge}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Bottom Caption */}
        {caption && (
          <div className="border-t border-paper-200 bg-paper-50 px-4 py-2.5">
            <p className="text-xs text-ink-600 leading-relaxed">{caption}</p>
          </div>
        )}
      </div>

      {/* Lightbox Zoom Modal for Raw Full-Resolution Screenshot */}
      {isZoomed && activeSrc && (
        <div
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/90 p-3 sm:p-6 backdrop-blur-sm cursor-zoom-out animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[95vh] max-w-6xl w-full flex flex-col overflow-hidden rounded-2xl border border-paper-400 bg-paper-100 shadow-2xl"
          >
            {/* Header bar in modal */}
            <div className="flex items-center justify-between border-b border-paper-300 bg-paper-200/90 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-ink-900">
                  {badge || alt}
                </span>
                <span className="rounded bg-paper-300 px-2 py-0.5 font-mono text-[10px] text-ink-600">
                  Original Raw Asset
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsZoomed(false)}
                className="rounded-lg bg-ink-900 px-3 py-1 text-xs font-mono text-paper-100 hover:bg-accent-500 transition-colors cursor-pointer"
              >
                Close (ESC)
              </button>
            </div>

            {/* Modal Image container */}
            <div className="flex-1 overflow-auto bg-ink-950 p-2 sm:p-4 flex items-center justify-center min-h-[50vh] max-h-[82vh]">
              <img
                src={activeSrc}
                alt={alt}
                referrerPolicy="no-referrer"
                className="max-h-[78vh] w-auto max-w-full rounded-lg object-contain shadow-md"
              />
            </div>

            {caption && (
              <div className="border-t border-paper-300 bg-paper-100 px-4 py-2.5 text-xs text-ink-600">
                {caption}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
