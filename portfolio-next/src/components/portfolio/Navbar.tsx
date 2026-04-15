"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "./data";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = window.localStorage.getItem("theme");
    const shouldUseDark = storedTheme ? storedTheme === "dark" : true;
    root.classList.toggle("dark", shouldUseDark);
    setIsDark(shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const nextIsDark = !isDark;
    root.classList.toggle("dark", nextIsDark);
    window.localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    setIsDark(nextIsDark);
  };

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-[#0a0a0f]/80">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="#hero" className="font-heading text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            HSL<span className="text-[#7c6af7]">.</span>
          </a>
          <div className="hidden items-center gap-3 md:flex">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 transition hover:text-slate-900 dark:text-[#8a85aa] dark:hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <button
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-900 dark:border-white/15 dark:bg-white/5 dark:text-[#a89cf8] dark:hover:bg-[#7c6af7]/10"
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              title={isDark ? "Switch to light theme" : "Switch to dark theme"}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-900 dark:border-white/15 dark:bg-white/5 dark:text-[#a89cf8] dark:hover:bg-[#7c6af7]/10"
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              title={isDark ? "Switch to light theme" : "Switch to dark theme"}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex flex-col gap-1.5 p-1"
              aria-label="Open menu"
            >
              <span className="h-0.5 w-6 rounded bg-slate-900 dark:bg-white" />
              <span className="h-0.5 w-6 rounded bg-slate-900 dark:bg-white" />
              <span className="h-0.5 w-6 rounded bg-slate-900 dark:bg-white" />
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-white/98 backdrop-blur-xl dark:bg-[#0a0a0f]/95 md:hidden">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-6 top-5 text-4xl text-slate-900 dark:text-white"
            aria-label="Close menu"
          >
            &times;
          </button>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-heading text-4xl font-bold text-slate-900 transition hover:text-slate-700 dark:text-white dark:hover:text-[#a89cf8]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
