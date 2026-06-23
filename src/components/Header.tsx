import React, { useEffect } from 'react';
import { Home, User, GraduationCap, Briefcase, Mail, Moon, Sun, Layers, Database } from 'lucide-react';

import { Biodata } from '../types';

interface HeaderProps {
  isLightTheme: boolean;
  setIsLightTheme: (val: boolean) => void;
  activeSection: string;
  onOpenAdmin: () => void;
  biodata?: Biodata;
}

export default function Header({ isLightTheme, setIsLightTheme, activeSection, onOpenAdmin, biodata }: HeaderProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'skills', icon: GraduationCap, label: 'Skills' },
    { id: 'services', icon: Briefcase, label: 'Experience' },
    { id: 'work', icon: Layers, label: 'Portfolio' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="header"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-400 ${
          isScrolled
            ? isLightTheme
              ? 'bg-white/80 shadow-md backdrop-blur-md py-4'
              : 'bg-[#0f172a]/80 shadow-lg shadow-black/30 backdrop-blur-md py-4'
            : 'bg-transparent py-5'
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="text-lg font-semibold tracking-tight transition-colors duration-300 flex items-center gap-2"
            style={{ color: 'var(--first-color)' }}
          >
            <span className="font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              {biodata?.fullName || 'Daniel Tulus'}
            </span>
          </a>

          {/* Mobile Admin Icon in Top Header */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={onOpenAdmin}
              className={`p-2 rounded-full border shadow-sm transition-all duration-300 flex items-center justify-center cursor-pointer ${
                isLightTheme 
                  ? 'bg-neutral-100/80 border-neutral-200 text-neutral-700 hover:text-blue-600 hover:bg-white' 
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-blue-400 hover:bg-slate-950/20'
              }`}
              aria-label="Admin Portal"
              title="Admin Portal"
            >
              <Database size={16} />
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className={`text-sm font-medium transition-all duration-300 hover:text-[var(--first-color)] relative py-1 px-2 ${
                        isActive
                          ? 'text-[var(--title-color)] font-semibold'
                          : 'text-[var(--text-color-light)]'
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <span
                          className="absolute bottom-0 left-0 w-full h-[2px] rounded-full"
                          style={{
                            background: 'linear-gradient(90deg, var(--first-color), transparent)',
                          }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Theme toggler */}
            <button
              onClick={() => setIsLightTheme(!isLightTheme)}
              className="p-2.5 rounded-full bg-[var(--container-color)] border border-gray-200/10 hover:border-[var(--first-color)] transition-all duration-300 shadow-md flex items-center justify-center text-[var(--title-color)] hover:text-[var(--first-color)] cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isLightTheme ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Database Admin panel toggle */}
            <button
              onClick={onOpenAdmin}
              className="p-2.5 rounded-full bg-[var(--container-color)] border border-gray-200/10 hover:border-[var(--first-color)] transition-all duration-300 shadow-md flex items-center justify-center text-[var(--title-color)] hover:text-blue-500 cursor-pointer"
              aria-label="Admin Portal"
              title="Admin Portal"
            >
              <Database size={18} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile floating dock menu (docked at bottom center, beautiful iOS style, now outside header to avoid stacking context bugs) */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] z-50">
        <div
          className={`flex items-center justify-between px-6 py-3 rounded-full shadow-2xl backdrop-blur-xl border border-white/10 ${
            isLightTheme
              ? 'bg-neutral-100/90 text-neutral-800'
              : 'bg-slate-900/90 text-slate-100'
          }`}
        >
          <ul className="flex items-center justify-between w-full">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const IconComponent = item.icon;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`p-2.5 rounded-full flex items-center justify-center transition-all duration-300 relative ${
                      isActive
                        ? 'text-white'
                        : isLightTheme
                        ? 'text-neutral-500 hover:text-neutral-900'
                        : 'text-slate-400 hover:text-slate-100'
                    }`}
                  >
                    {isActive && (
                      <span
                        className="absolute inset-0 rounded-full -z-10 shadow-lg shadow-blue-500/40"
                        style={{
                          background:
                            'linear-gradient(180deg, var(--first-color), rgba(var(--first-hue), 90%, 72%, 0.4))',
                        }}
                      />
                    )}
                    <IconComponent size={20} />
                  </a>
                </li>
              );
            })}

            {/* Theme toggle directly inside mobile dock */}
            <li>
              <button
                onClick={() => setIsLightTheme(!isLightTheme)}
                className={`p-2.5 rounded-full flex items-center justify-center cursor-pointer ${
                  isLightTheme ? 'text-neutral-500 hover:text-neutral-900' : 'text-slate-400 hover:text-slate-100'
                }`}
                aria-label="Toggle Theme"
              >
                {isLightTheme ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
