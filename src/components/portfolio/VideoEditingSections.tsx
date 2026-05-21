"use client";

import { useEffect, useRef, useState } from "react";
import {
  contactDetails,
  videoEditingSkills,
  videoEditingStats,
  videoEditingWorks,
} from "./data";
import {
  Clapperboard,
  Mail,
  MapPin,
  Phone,
  FileUser,
} from "lucide-react";
import Link from "next/link";

/* ─────────────────────────────────────────
   Social icon helpers (reused from main)
───────────────────────────────────────── */
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden width={20} height={20}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.31 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   Work-type accent colours
───────────────────────────────────────── */
const typeAccent: Record<string, { badge: string; glow: string }> = {
  reel: {
    badge: "border-pink-200 bg-pink-50 text-pink-700 dark:border-pink-500/35 dark:bg-pink-500/10 dark:text-pink-300",
    glow: "dark:hover:border-pink-500/50",
  },
  faceless: {
    badge: "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/35 dark:bg-violet-500/10 dark:text-violet-300",
    glow: "dark:hover:border-violet-500/50",
  },
  brand: {
    badge: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/35 dark:bg-sky-500/10 dark:text-sky-300",
    glow: "dark:hover:border-sky-500/50",
  },
  explainer: {
    badge: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/35 dark:bg-amber-500/10 dark:text-amber-300",
    glow: "dark:hover:border-amber-500/50",
  },
};

const defaultAccent = {
  badge: "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-[#7c6af7]/35 dark:bg-[#7c6af7]/15 dark:text-[#a89cf8]",
  glow: "dark:hover:border-[#7c6af7]/50",
};

/* ─────────────────────────────────────────
   Hero
───────────────────────────────────────── */
export function VideoEditingHeroSection() {
  return (
    <section
      id="ve-hero"
      className="scroll-hero mx-auto grid min-h-[70vh] w-full max-w-6xl items-center gap-10 px-5 pb-16 pt-28 md:px-8"
    >
      <div className="fade-in-up max-w-3xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-slate-600 dark:border-[#7c6af7]/40 dark:bg-[#7c6af7]/15 dark:text-[#a89cf8]">
          <Clapperboard size={13} className="text-[#7c6af7]" />
          Video Editing Portfolio
        </div>
        <h1 className="font-heading text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl">
          Crafting Stories
          <br />
          <span className="text-transparent stroke-text">Frame by Frame</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-[#8a85aa]">
          From fast-cut reels to AI brand videos — I produce content that holds
          attention, drives engagement, and tells your story with clarity and style.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#ve-works"
            className="rounded-lg border border-slate-900 bg-slate-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-slate-800 dark:border-[#7c6af7] dark:bg-[#7c6af7] dark:hover:bg-transparent dark:hover:text-[#a89cf8]"
          >
            See My Work
          </a>
          <Link
            href="/"
            className="rounded-lg border border-slate-200 px-8 py-3 text-sm font-medium text-slate-900 transition hover:border-slate-300 dark:border-white/15 dark:text-white dark:hover:text-[#a89cf8]"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Stats bar
───────────────────────────────────────── */
export function VideoEditingStatsBar() {
  return (
    <section className="scroll-section-fx border-y border-slate-200 bg-slate-50 px-5 py-8 md:px-8 dark:border-[#7c6af7]/20 dark:bg-[#111118]">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-y-6 md:grid-cols-4">
        {videoEditingStats.map((stat, index) => (
          <div
            key={stat.label}
            className={`text-center ${index < 3 ? "md:border-r md:border-slate-300 dark:md:border-white/10" : ""}`}
          >
            <p className="font-heading text-4xl font-extrabold tracking-tight text-slate-900 dark:text-[#a89cf8]">
              {stat.value}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.15em] text-slate-600 dark:text-[#8a85aa]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Works / Projects
───────────────────────────────────────── */
export function VideoEditingWorksSection() {
  return (
    <section
      id="ve-works"
      className="scroll-section-fx mx-auto w-full max-w-6xl px-5 py-24 md:px-8"
    >
      <header className="fade-in-up mb-14">
        <p className="section-tag">/work</p>
        <h2 className="section-title">What I&apos;ve Produced</h2>
        <p className="mt-3 max-w-xl text-base text-slate-600 dark:text-[#8a85aa]">
          A selection of video work across short-form, brand, faceless, and
          explainer content.
        </p>
      </header>
      <div className="grid gap-5 lg:grid-cols-2">
        {videoEditingWorks.map((work) => {
          const accent = typeAccent[work.type] ?? defaultAccent;
          return (
            <article
              key={work.title}
              className={`fade-in-up group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 ${accent.glow} sm:p-8`}
            >
              <span
                className={`rounded-md border px-3 py-1 text-xs font-medium uppercase tracking-[0.08em] ${accent.badge}`}
              >
                {work.category}
              </span>
              <h3 className="mt-4 font-heading text-xl font-bold">{work.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-[#8a85aa]">
                {work.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {work.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-[#8a85aa]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Skills / Proficiency bars
───────────────────────────────────────── */
function SkillBar({ label, level, visible }: { label: string; level: number; visible: boolean }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-800 dark:text-[#c9c5e8]">{label}</span>
        <span className="text-xs text-slate-500 dark:text-[#8a85aa]">{level}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#7c6af7] to-[#a89cf8] transition-[width] duration-1000 ease-out"
          style={{ width: visible ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export function VideoEditingSkillsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="ve-skills"
      ref={sectionRef}
      className="scroll-section-fx bg-slate-50 px-5 py-24 md:px-8 dark:bg-[#111118]"
    >
      <div className="mx-auto w-full max-w-6xl">
        <header className="fade-in-up mb-14 text-center">
          <p className="section-tag">Skills</p>
          <h2 className="section-title">Tools &amp; Proficiency</h2>
        </header>
        <div className="fade-in-up mx-auto grid max-w-3xl gap-5">
          {videoEditingSkills.map((skill) => (
            <SkillBar
              key={skill.label}
              label={skill.label}
              level={skill.level}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Contact
───────────────────────────────────────── */
export function VideoEditingContactSection() {
  return (
    <section
      id="ve-contact"
      className="scroll-section-fx mx-auto w-full max-w-5xl px-4 pb-16 pt-10 text-center sm:px-5 md:px-8 md:pb-20 md:pt-12"
    >
      <div className="fade-in-up">
        <p className="section-tag">Work Together</p>
        <h2 className="section-title">Need a video editor?</h2>
        <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-slate-600 dark:text-[#8a85aa] sm:text-lg">
          Whether it&apos;s a short-form reel, an AI brand video, or a full-length
          explainer — let&apos;s talk and make something great.
        </p>

        <div className="mx-auto mt-8 max-w-3xl">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left dark:border-white/10 dark:bg-white/5">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500 dark:text-[#a89cf8]" aria-hidden />
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-600 dark:text-[#7c6af7]">
                  Email
                </p>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="mt-1 block break-all text-sm font-medium text-slate-900 transition hover:text-slate-700 dark:text-white dark:hover:text-[#e8c5ff]"
                >
                  {contactDetails.email}
                </a>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left dark:border-white/10 dark:bg-white/5">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500 dark:text-[#a89cf8]" aria-hidden />
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-600 dark:text-[#7c6af7]">
                  Phone
                </p>
                <a
                  href={`tel:${contactDetails.phone.replace(/\D/g, "")}`}
                  className="mt-1 block text-sm font-medium text-slate-900 transition hover:text-slate-700 dark:text-white dark:hover:text-[#e8c5ff]"
                >
                  {contactDetails.phone}
                </a>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left sm:col-span-2 lg:col-span-1 dark:border-white/10 dark:bg-white/5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500 dark:text-[#a89cf8]" aria-hidden />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-600 dark:text-[#7c6af7]">
                  Location
                </p>
                <p className="mt-1 text-sm text-slate-700 dark:text-[#c9c5e8]">
                  Based in Lalitpur, Nepal
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://github.com/ashoklimbu07"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            title="GitHub"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-[#8a85aa] dark:hover:text-white"
          >
            <GitHubIcon className="text-indigo-500 dark:text-[#a89cf8]" />
          </a>
          <a
            href={contactDetails.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open resume PDF"
            title="Resume (PDF)"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-[#8a85aa] dark:hover:border-[#7c6af7] dark:hover:bg-[#7c6af7]/10 dark:hover:text-white"
          >
            <FileUser className="h-5 w-5 shrink-0 text-indigo-500 dark:text-[#a89cf8]" aria-hidden />
            <span className="text-slate-900 dark:text-white">Resume</span>
            <span className="text-xs font-normal text-slate-600 dark:text-[#8a85aa]">PDF</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Footer
───────────────────────────────────────── */
export function VideoEditingFooter() {
  return (
    <footer className="scroll-section-fx border-t border-slate-200 px-5 py-8 text-center text-sm text-slate-600 dark:border-white/10 dark:text-[#8a85aa]">
      <span className="text-[#7c6af7]">Hari Shankar Limbu</span> · Video Editing ·{" "}
      <Link href="/" className="underline-offset-2 transition hover:text-slate-900 hover:underline dark:hover:text-white">
        Back to Portfolio
      </Link>{" "}
      · &copy; 2026
    </footer>
  );
}
