"use client";

import { useState } from "react";
import { navLinks } from "./data";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="#hero" className="font-heading text-xl font-extrabold tracking-tight text-white">
            HSL<span className="text-[#7c6af7]">.</span>
          </a>
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs font-medium uppercase tracking-[0.2em] text-[#8a85aa] transition hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="hidden rounded-md bg-[#7c6af7] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#a89cf8] md:inline-flex"
          >
            Hire Me
          </a>
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex flex-col gap-1.5 p-1 md:hidden"
            aria-label="Open menu"
          >
            <span className="h-0.5 w-6 rounded bg-white" />
            <span className="h-0.5 w-6 rounded bg-white" />
            <span className="h-0.5 w-6 rounded bg-white" />
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-[#0a0a0f]/95 backdrop-blur-xl md:hidden">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-6 top-5 text-4xl text-white"
            aria-label="Close menu"
          >
            &times;
          </button>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-heading text-4xl font-bold text-white transition hover:text-[#a89cf8]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
