import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '@/data/portfolio';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-paper-300 bg-paper-100">
      <div className="container-content py-16">
        {/* Main Footer Row */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Identity */}
          <div className="flex flex-col gap-2">
            <span className="font-display text-lg font-500 tracking-tight text-ink-900">
              {profile.name.toUpperCase()}
            </span>
            <p className="font-mono text-xs text-ink-500 max-w-xs">
              {profile.role}
            </p>
          </div>

          {/* Navigation Links */}
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6 font-mono text-xs font-medium text-ink-700">
            <a href="/#work" className="transition-colors hover:text-ink-900">
              Work
            </a>
            <a href="/#experience" className="transition-colors hover:text-ink-900">
              Experience
            </a>
            <a href="/#about" className="transition-colors hover:text-ink-900">
              About
            </a>
            <a href="/#contact" className="transition-colors hover:text-ink-900">
              Contact
            </a>
          </nav>

          {/* Contact Channels */}
          <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-ink-600">
            <a
              href={`https://github.com/${profile.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-ink-900"
            >
              GitHub
              <ArrowUpRight className="h-3 w-3 opacity-60" />
            </a>
            <a
              href={`https://www.linkedin.com/in/${profile.linkedinUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-ink-900"
            >
              LinkedIn
              <ArrowUpRight className="h-3 w-3 opacity-60" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-1 transition-colors hover:text-ink-900"
            >
              Email
              <ArrowUpRight className="h-3 w-3 opacity-60" />
            </a>
          </div>
        </div>

        {/* Bottom subtle copyright */}
        <div className="mt-12 border-t border-paper-300 pt-6 flex items-center justify-between font-mono text-[11px] text-ink-400">
          <span>© {year} {profile.name}. All rights reserved.</span>
          <span>Build · Analyze · Explore</span>
        </div>
      </div>
    </footer>
  );
}
