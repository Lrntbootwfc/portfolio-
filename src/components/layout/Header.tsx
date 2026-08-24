import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, FileDown, Menu, X } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useActiveSection } from '@/hooks/useActiveSection';
import { profile } from '@/data/portfolio';

const navLinks = [
  { label: 'Work', href: '/#work' },
  { label: 'Experience', href: '/#experience' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

const sectionIds = ['work', 'experience', 'about', 'contact'];

export default function Header() {
  const scrolled = useScrollPosition(20);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const active = useActiveSection(sectionIds);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isActive = (href: string) => {
    const id = href.replace('/#', '');
    return active === id;
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled
          ? 'border-b border-paper-300 bg-paper-100/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
        }`}
    >
      <div className="container-content flex h-16 items-center justify-between lg:h-20">
        {/* Name / logo */}
        <Link
          to="/"
          className="font-display text-lg font-500 tracking-tight text-ink-900 transition-opacity hover:opacity-70"
        >
          {profile.name.toUpperCase()}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`text-sm transition-colors duration-200 ${isActive(link.href)
                  ? 'text-ink-900 font-medium'
                  : 'text-ink-500 hover:text-ink-900'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-5 md:flex">
          <a
            href={profile.resumeUrl}
            download="Divya_Sharma_Resume.pdf"
            className="group inline-flex items-center gap-1 text-sm text-ink-500 transition-colors hover:text-ink-900"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Resume
            <FileDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
          </a>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-1 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-paper-100 transition-all duration-200 hover:bg-accent-400"
          >
            Let's talk
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="flex items-center justify-center p-2 text-ink-900 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-paper-100 md:hidden">
          <nav className="container-content flex flex-col gap-2 pt-8">
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                to={link.href}
                className="border-b border-paper-300 py-4 font-display text-2xl font-400 text-ink-900 transition-colors hover:text-accent-400"
                style={{ animation: `fadeUp 0.4s ease-out ${i * 60}ms both` }}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-6 flex flex-col gap-4">
              <a
                href={profile.resumeUrl}
                download="Divya_Sharma_Resume.pdf"
                className="inline-flex items-center gap-2 text-base text-ink-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume <FileDown className="h-4 w-4" />
              </a>
              <Link
                to="/#contact"
                className="inline-flex w-fit items-center gap-1.5 rounded-full bg-ink-900 px-6 py-3 text-base font-medium text-paper-100"
              >
                Let's talk <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
