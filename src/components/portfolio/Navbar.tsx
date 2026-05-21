"use client";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks } from "./data";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = window.localStorage.getItem("theme");
    const shouldUseDark = storedTheme ? storedTheme === "dark" : true;
    root.classList.toggle("dark", shouldUseDark);
    setIsDark(shouldUseDark);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = !isDark;
    root.classList.toggle("dark", next);
    window.localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <a
            href="#hero"
            className="font-heading text-lg font-bold tracking-tight text-[var(--fg)]"
          >
            HSL<span className="text-[var(--accent)]">.</span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-6 md:flex">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="nav-link">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/video-editing"
                  className="nav-link"
                  style={{ color: "var(--accent)" }}
                >
                  Video
                </Link>
              </li>
            </ul>

            {/* Resume button */}
            <a
              href="/HARI_SHANKAR_LIMBU_2026CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs"
            >
              Resume
            </a>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--fg-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>

          {/* Mobile row */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--fg-muted)]"
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              className="flex flex-col gap-1.5 p-1"
            >
              <span className="h-0.5 w-5 rounded bg-[var(--fg)]" />
              <span className="h-0.5 w-5 rounded bg-[var(--fg)]" />
              <span className="h-0.5 w-3 rounded bg-[var(--fg)]" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-[var(--bg)] px-8 pt-24 pb-12 md:hidden">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-6 top-5 text-3xl text-[var(--fg-muted)] hover:text-[var(--fg)]"
            aria-label="Close menu"
          >
            &times;
          </button>
          <ul className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-heading text-3xl font-bold text-[var(--fg)] transition hover:text-[var(--accent)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/video-editing"
                onClick={() => setIsOpen(false)}
                className="font-heading text-3xl font-bold text-[var(--accent)]"
              >
                Video
              </Link>
            </li>
          </ul>
          <div className="mt-auto">
            <a
              href="/HARI_SHANKAR_LIMBU_2026CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center text-sm"
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </>
  );
}
