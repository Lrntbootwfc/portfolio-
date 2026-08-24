import type { ReactNode } from 'react';
import Reveal from './Reveal';

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'mx-auto text-center items-center' : 'text-left items-start';
  return (
    <Reveal className={`flex max-w-prose flex-col gap-4 ${alignClass} ${className}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="font-display text-display-lg font-400 text-ink-900 text-balance">{title}</h2>
      {description && (
        <p className="text-lg leading-relaxed text-ink-500 text-pretty">{description}</p>
      )}
    </Reveal>
  );
}
