"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  contactDetails,
  videoEditingSkills,
  videoEditingStats,
} from "./data";
import {
  Mail,
  MapPin,
  Moon,
  Sun,
  Video,
  Eye,
  Users,
  Zap,
  BookOpen,
  Building2,
  Film,
  ExternalLink,
  X,
  Play,
} from "lucide-react";
import Link from "next/link";

/* ── Video page nav links ── */
const videoNavLinks = [
  { href: "#ve-hero",    label: "Home" },
  { href: "#ve-about",   label: "About" },
  { href: "#ve-works",   label: "Works" },
  { href: "#ve-skills",  label: "Tools" },
  { href: "#ve-contact", label: "Contact" },
];

/* ── Video-specific Navbar ── */
export function VideoNavbar() {
  const [isOpen, setIsOpen]   = useState(false);
  const [isDark, setIsDark]   = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const stored = window.localStorage.getItem("theme");
    const dark = stored ? stored === "dark" : false;
    root.classList.toggle("dark", dark);
    setIsDark(dark);

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-xl" : "bg-transparent"
      }`}>
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
          {/* Logo — links back to main portfolio */}
          <Link href="/" className="font-heading text-lg font-bold tracking-tight text-[var(--fg)]">
            HSL<span className="text-[var(--accent)]">.</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-6 md:flex">
            <ul className="flex items-center gap-6">
              {videoNavLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="nav-link">{link.label}</a>
                </li>
              ))}
            </ul>
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
            <button onClick={toggleTheme} aria-label="Toggle theme"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--fg-muted)]">
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button onClick={() => setIsOpen(true)} aria-label="Open menu" className="flex flex-col gap-1.5 p-1">
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
          <button onClick={() => setIsOpen(false)}
            className="absolute right-6 top-5 text-3xl text-[var(--fg-muted)] hover:text-[var(--fg)]"
            aria-label="Close menu">&times;</button>
          <ul className="flex flex-col gap-8">
            {videoNavLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setIsOpen(false)}
                  className="font-heading text-3xl font-bold text-[var(--fg)] transition hover:text-[var(--accent)]">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}



/* ─────────────────────────────────────────
   Summary / About strip
───────────────────────────────────────── */
export function VideoEditingSummarySection() {
  const highlights = [
    { icon: <Video size={16} className="text-[#7c6af7]" />, label: "1,000+ AI Videos Created" },
    { icon: <Eye size={16} className="text-[#7c6af7]" />, label: "250M+ Total Views" },
    { icon: <Users size={16} className="text-[#7c6af7]" />, label: "500K+ Followers Grown" },
    { icon: <Zap size={16} className="text-[#7c6af7]" />, label: "10x Faster with Automation" },
  ];

  return (
    <section id="ve-about" className="scroll-section-fx mx-auto w-full max-w-6xl px-5 pb-16 pt-16 md:px-8 md:pb-20 md:pt-20">
      <div className="fade-in-up rounded-2xl border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/5 md:p-10">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {/* Left — summary text */}
          <div>
            <p className="section-tag mb-3">/about</p>
            <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              AI Video Creator &amp; Automation Engineer
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-[#8a85aa]">
              I have been doing content creation for the last 4 years. But when AI video
              models like Hailuo and Kling started dropping jaw-dropping results, I was
              genuinely amazed. That was the turning point — I went all in on AI content
              creation. Since then I have created 1,000+ AI videos across educational,
              commercial, and entertainment niches.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-[#8a85aa]">
              Backed by my engineering background, I also built automation pipelines that
              help me produce AI videos 10x faster and better — from prompt libraries and
              bulk generation to fully automated publishing workflows.
            </p>
          </div>
          {/* Right — highlight pills */}
          <div className="flex flex-col justify-center gap-4">
            {highlights.map((h) => (
              <div
                key={h.label}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 px-5 py-3.5 dark:border-white/10 dark:bg-white/5"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#7c6af7]/10 dark:bg-[#7c6af7]/20">
                  {h.icon}
                </span>
                <span className="text-sm font-medium text-slate-800 dark:text-[#c9c5e8]">
                  {h.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Viral Phone Mockup (hero right column)
───────────────────────────────────────── */
const viralClips = [
  { views: "25M", label: "views in last 90 days",       scale: "scale-[0.80] origin-bottom", zIndex: "z-0",  translateY: "translate-y-2", img: "/images/screenshot/facebookstats.jpeg" },
  { views: "80M+", label: "~300K followers in 2 years", scale: "scale-100 origin-bottom",    zIndex: "z-10", translateY: "",              img: "/images/screenshot/tiktokcat.jpg" },
  { views: "37K",  label: "followers in last 30 days",  scale: "scale-[0.80] origin-bottom", zIndex: "z-0",  translateY: "translate-y-2", img: "/images/screenshot/facebook.jpeg" },
];

function PhoneMockup({
  views,
  label,
  scale,
  zIndex,
  translateY,
  img,
}: (typeof viralClips)[0]) {
  return (
    <div className={`flex shrink-0 flex-col items-center gap-1.5 ${scale} ${zIndex} ${translateY} transition-transform duration-300`}>
      {/* View count above phone */}
      <div className="text-center">
        <p className="font-heading text-base font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-xl md:text-3xl">
          {views}
        </p>
        <p className="text-[7px] uppercase tracking-widest text-slate-500 dark:text-[#8a85aa] sm:text-[9px] md:text-[11px]">
          {label}
        </p>
      </div>
      {/* Phone frame */}
      <div className="relative h-[200px] w-[94px] overflow-hidden rounded-[22px] border-[2.5px] border-slate-800 bg-slate-900 shadow-xl dark:border-white/20 sm:h-[260px] sm:w-[122px] sm:rounded-[26px] sm:border-[3px] md:h-[340px] md:w-[158px] md:rounded-[30px] md:border-[3.5px]">
        {/* Notch */}
        <div className="absolute inset-x-0 top-0 z-10 flex justify-center pt-1">
          <div className="h-[4px] w-9 rounded-full bg-slate-700 dark:bg-white/20 sm:h-[5px] sm:w-12 md:h-[6px] md:w-16" />
        </div>
        {/* Actual screenshot image */}
        <Image
          src={img}
          alt={`${views} viral video`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 94px, (max-width: 768px) 122px, 158px"
        />
        {/* Side action icons */}
        <div className="absolute bottom-10 right-1.5 z-10 flex flex-col items-center gap-2 sm:bottom-10 sm:right-2 md:bottom-14 md:right-2 md:gap-3">
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm sm:h-6 sm:w-6 md:h-7 md:w-7">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-2 w-2 text-white md:h-3.5 md:w-3.5">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <span className="text-[6px] font-medium text-white drop-shadow md:text-[9px]">2.1M</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm sm:h-6 sm:w-6 md:h-7 md:w-7">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-2 w-2 text-white md:h-3.5 md:w-3.5">
                <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
              </svg>
            </div>
            <span className="text-[6px] font-medium text-white drop-shadow md:text-[9px]">48K</span>
          </div>
        </div>
        {/* Bottom caption bar overlay */}
        <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/60 px-2 pb-2.5 pt-6 md:pb-4 md:pt-8">
          <div className="mb-1 h-1 w-12 rounded-full bg-white/50 sm:w-16 md:h-1.5 md:w-20" />
          <div className="h-1 w-8 rounded-full bg-white/30 sm:w-12 md:w-14" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Hero
───────────────────────────────────────── */
export function VideoEditingHeroSection() {
  return (
    <section
      id="ve-hero"
      className="scroll-hero mx-auto grid w-full max-w-6xl px-5 pt-[68px] pb-6 md:grid-cols-[1fr_460px] md:gap-x-12 md:px-8 md:pt-[72px] md:pb-10"
    >
      {/* ── Left: text content ── */}
      <div className="fade-in-up py-4 md:py-0 md:self-center">
        <h1 className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          AI Video Content
          <br />
          Creator &amp; Editor
          <br />
          <span className="mt-1 block text-2xl font-semibold tracking-normal text-slate-500 dark:text-[#8a85aa] sm:text-3xl">
            Hari Shankar Limbu
          </span>
        </h1>
        <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 dark:text-[#8a85aa]">
          2+ years creating 1,000+ AI-generated videos across educational, commercial,
          and entertainment niches. Generating 250M+ views and 500K+ followers. From
          fast-cut reels to AI avatar brand videos, bridging technical AI systems with
          compelling visual storytelling.
        </p>
        <div className="mt-7 flex flex-wrap gap-4">
          <a
            href="#ve-works"
            className="rounded-lg border border-slate-900 bg-slate-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-slate-800 dark:border-[#7c6af7] dark:bg-[#7c6af7] dark:hover:bg-transparent dark:hover:text-[#a89cf8]"
          >
            See My Work
          </a>
          <a
            href="#ve-contact"
            className="rounded-lg border border-slate-200 px-8 py-3 text-sm font-medium text-slate-900 transition hover:border-slate-300 dark:border-white/15 dark:text-white dark:hover:text-[#a89cf8]"
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* ── Right: viral phone mockups ── */}
      <div className="fade-in-up flex w-full items-end justify-center gap-2 overflow-visible pb-0 pt-4 md:self-center md:items-end md:justify-center md:gap-3 md:pt-0">
        {viralClips.map((clip) => (
          <PhoneMockup key={clip.views} {...clip} />
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Stats bar
───────────────────────────────────────── */
/* ─────────────────────────────────────────
   Animated counter hook
───────────────────────────────────────── */
function useCountUp(target: number, duration = 1800, started: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    let raf: number;

    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return count;
}

/* ─────────────────────────────────────────
   Single stat cell
───────────────────────────────────────── */
function StatCell({
  value,
  suffix,
  label,
  index,
  total,
  started,
  isStatic,
}: {
  value: string;
  suffix: string;
  label: string;
  index: number;
  total: number;
  started: boolean;
  isStatic: boolean;
}) {
  const target = isStatic ? 0 : parseInt(value.replace(/,/g, ""), 10);
  const count = useCountUp(target, 1800, !isStatic && started);

  const formatted = isStatic
    ? value
    : count >= 1000
    ? count.toLocaleString()
    : count.toString();

  const borderClasses = [
    index % 2 === 0 ? "border-r border-slate-200 dark:border-white/10" : "",
    index < 2 ? "border-b border-slate-200 dark:border-white/10 pb-8 md:border-b-0 md:pb-0" : "",
    index < total - 1 ? "md:border-r md:border-slate-200 dark:md:border-white/10" : "md:border-r-0",
  ].join(" ");

  return (
    <div className={`flex flex-col items-center gap-1 py-8 text-center md:py-0 ${borderClasses}`}>
      <p className="font-heading text-4xl font-extrabold tracking-tight text-slate-900 dark:text-[#a89cf8]">
        {formatted}
        <span>{suffix}</span>
      </p>
      <p className="text-xs uppercase tracking-[0.15em] text-slate-500 dark:text-[#8a85aa]">
        {label}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────
   Stats bar
───────────────────────────────────────── */
export function VideoEditingStatsBar() {
  const ref = useRef<HTMLElement | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="scroll-section-fx border-y border-slate-200 bg-slate-50 px-5 py-10 md:px-8 dark:border-[#7c6af7]/20 dark:bg-[#111118]"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-y-0 md:grid-cols-4">
        {videoEditingStats.map((stat, index) => (
          <StatCell
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            index={index}
            total={videoEditingStats.length}
            started={started}
            isStatic={stat.static}
          />
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Works / Projects
───────────────────────────────────────── */
type VideoSample = { title: string; category: string; url: string };

const workCategories = [
  {
    icon: <Zap size={18} className="text-pink-500" />,
    iconBg: "bg-pink-50 dark:bg-pink-500/10",
    glow: "dark:hover:border-pink-500/50",
    title: "Short-Form Content",
    description:
      "Best for TikTok, Facebook, Instagram, and YouTube Shorts. Fast-cut AI videos with platform-tuned hooks, tight edits, and high-retention storytelling. Grew multiple faceless accounts to 500K+ followers using 100% AI-generated content.",
    samples: [
      { title: "AI Cat Drama — Viral TikTok", category: "TikTok / Faceless", url: "https://www.tiktok.com/@catstories.07/video/7519901351233539383?lang=en" },
      { title: "Nepali Drama — Animal Characters", category: "Facebook Reel", url: "https://www.facebook.com/reel/1284719263809466" },
      { title: "Skeleton What If", category: "YouTube Shorts", url: "https://www.youtube.com/shorts/kM8a8IE1cgU" },
      { title: "2D Animation — AI + Manual", category: "TikTok", url: "https://www.tiktok.com/@usalegendsdark/video/7568932564795247886?lang=en" },
      { title: "Educational — Reproductive Health", category: "TikTok / Faceless", url: "https://www.tiktok.com/@framedin2d/video/7617081677075991822?lang=en" },
      { title: "DIY Gardening & Making", category: "Facebook Reel", url: "https://www.facebook.com/reel/2343839096105966" },
    ] as VideoSample[],
  },
  {
    icon: <BookOpen size={18} className="text-amber-500" />,
    iconBg: "bg-amber-50 dark:bg-amber-500/10",
    glow: "dark:hover:border-amber-500/50",
    title: "Long-Form",
    description:
      "I have worked on some series and also edit my personal vlog. My focus is on storytelling. I edit real footage and make it feel cinematic and engaging.",
    samples: [
      { title: "Personal Vlog — Storytelling", category: "YouTube", url: "https://youtu.be/czKc8TOcs44" },
    ] as VideoSample[],
  },
  {
    icon: <Building2 size={18} className="text-sky-500" />,
    iconBg: "bg-sky-50 dark:bg-sky-500/10",
    glow: "dark:hover:border-sky-500/50",
    title: "Agency & Client Work",
    description:
      "I use AI to create brand videos, ads, promotional and marketing content for clients through 360 Automation Agency. The goal is simple: content that actually engages their audience and gets results.",
    samples: [
      { title: "Client Work Drive — 50+ Videos (Dental to Apps)", category: "Google Drive", url: "https://drive.google.com/drive/folders/1NYpWUctehOD26hwaT0IF-17PiRND30Af?usp=sharing" },
    ] as VideoSample[],
    modalNote: "I am the creator of this content but do not hold sole rights. This work was produced for clients through 360 Automation Agency.",
  },
  {
    icon: <Film size={18} className="text-violet-500" />,
    iconBg: "bg-violet-50 dark:bg-violet-500/10",
    glow: "dark:hover:border-violet-500/50",
    title: "Series & Short Films",
    description:
      "I have already worked with companies like Nimbuzz to produce their series. Consistent character design, cinematic pacing, and scene continuity across every episode. This is the work I enjoy most.",
    samples: [
      { title: "Short Glimpse", category: "Series Sample", url: "https://drive.google.com/file/d/1oVFPM5gWyz7aDg2bIu4nK1HhGBaPT0So/view?usp=sharing" },
    ] as VideoSample[],
    modalNote: "I am the creator of this content but do not hold sole rights for what I produce for clients and companies. I can only share a short glimpse.",
  },
];

/* ─────────────────────────────────────────
   Samples Modal
───────────────────────────────────────── */
function SamplesModal({
  title,
  samples,
  modalNote,
  onClose,
}: {
  title: string;
  samples: VideoSample[];
  modalNote?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#13131a]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-white/10">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-[var(--accent)]">Sample Videos</p>
            <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
            <p className="mt-1.5 inline-block rounded-lg bg-[#7c6af7]/10 px-3 py-1.5 text-xs font-medium leading-5 text-[#7c6af7] dark:bg-[#7c6af7]/20 dark:text-[#a89cf8]">
              {modalNote ?? "The content you see via these links. I am the creator and owner of those accounts and pages."}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-800 dark:border-white/10 dark:text-[#8a85aa] dark:hover:text-white"
          >
            <X size={15} />
          </button>
        </div>
        {/* Video list */}
        <ul className="max-h-[60vh] overflow-y-auto divide-y divide-slate-100 dark:divide-white/5">
          {samples.map((s, i) => (
            <li key={i}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-6 py-3.5 transition hover:bg-slate-50 dark:hover:bg-white/5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#7c6af7]/10 dark:bg-[#7c6af7]/20">
                  <Play size={14} className="translate-x-0.5 text-[#7c6af7]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{s.title}</p>
                  <p className="text-xs text-slate-500 dark:text-[#8a85aa]">{s.category}</p>
                </div>
                <ExternalLink size={13} className="shrink-0 text-slate-400 dark:text-[#8a85aa]" />
              </a>
            </li>
          ))}
        </ul>
      
      </div>
    </div>
  );
}

export function VideoEditingWorksSection() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const activeCategory = workCategories.find((w) => w.title === activeModal);

  return (
    <section
      id="ve-works"
      className="scroll-section-fx mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-24"
    >
      <header className="fade-in-up mb-10 md:mb-14">
        <p className="section-tag">/work</p>
        <h2 className="section-title">What I&apos;ve Produced</h2>
        <p className="mt-3 max-w-xl text-base text-slate-600 dark:text-[#8a85aa]">
          1,000+ AI-generated videos across four content categories. Each built with cutting-edge AI tools and automation pipelines.
        </p>
      </header>
      <div className="grid gap-5 sm:grid-cols-2">
        {workCategories.map((work) => (
          <article
            key={work.title}
            className={`fade-in-up group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 ${work.glow} sm:p-8`}
          >
            <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${work.iconBg}`}>
              {work.icon}
            </div>
            <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white">{work.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-[#8a85aa]">{work.description}</p>
            <div className="mt-6">
              <button
                onClick={() => setActiveModal(work.title)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-[#c9c5e8] dark:hover:border-[#7c6af7]/50 dark:hover:text-[#a89cf8]"
              >
                <Play size={13} />
                View Samples
              </button>
            </div>
          </article>
        ))}
      </div>

      {activeModal && activeCategory && (
        <SamplesModal
          title={activeCategory.title}
          samples={activeCategory.samples}
          modalNote={"modalNote" in activeCategory ? (activeCategory as {modalNote?: string}).modalNote : undefined}
          onClose={() => setActiveModal(null)}
        />
      )}
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
      className="scroll-section-fx bg-slate-50 px-5 py-16 md:px-8 md:py-24 dark:bg-[#111118]"
    >
      <div className="mx-auto w-full max-w-6xl">
        <header className="fade-in-up mb-10 text-center md:mb-14">
          <p className="section-tag">Skills</p>
          <h2 className="section-title">Tools &amp; Proficiency</h2>
          <p className="mt-3 text-base text-slate-600 dark:text-[#8a85aa]">
            Mastery across the full AI video production stack. From generation to automation.
          </p>
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
      className="scroll-section-fx mx-auto w-full max-w-5xl px-4 pb-14 pt-8 text-center sm:px-5 md:px-8 md:pb-20 md:pt-12"
    >
      <div className="fade-in-up">
        <p className="section-tag">Work Together</p>
        <h2 className="section-title">Need AI video content?</h2>
        <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-slate-600 dark:text-[#8a85aa] sm:text-lg">
          Short-form content, promotional ads, AI avatar videos, series, or full automation pipelines. Let&apos;s talk and build something together.
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
              <svg className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500 dark:text-[#a89cf8]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-600 dark:text-[#7c6af7]">
                  WhatsApp
                </p>
                <a
                  href={`https://wa.me/${contactDetails.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
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

        
        <p className="mt-6 text-xs text-slate-400 dark:text-[#8a85aa]">
          Also a software developer.{" "}
          <Link href="/" className="underline underline-offset-2 transition hover:text-slate-700 dark:hover:text-[#c9c5e8]">
            View software portfolio
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   Footer
───────────────────────────────────────── */
export function VideoEditingFooter() {
  return (
    <footer className="border-t border-[var(--border)] px-5 py-8">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center">
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--fg-muted)]">
          Hari Shankar Limbu · Video Editing Portfolio · © 2026
        </p>
      </div>
    </footer>
  );
}
