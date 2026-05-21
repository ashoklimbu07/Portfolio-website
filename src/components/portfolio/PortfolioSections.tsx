"use client";

import { useEffect, useRef, useState } from "react";
import {
  contactDetails,
  education,
  experience,
  interests,
  profilePhotoUrl,
  projects,
  skills,
  stats,
} from "./data";
import Image from "next/image";
import Link from "next/link";
import {
  Bot,
  Clapperboard,
  Code2,
  Database,
  ExternalLink,
  FileUser,
  Globe,
  Mail,
  MapPin,
  Phone,
  Settings,
  Smartphone,
} from "lucide-react";

/* ── Social SVG icons ── */
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden width={18} height={18}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.31 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden width={18} height={18}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/* ── Scroll-reveal hook ── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}


const skillIcons = {
  smartphone: Smartphone,
  globe: Globe,
  settings: Settings,
  database: Database,
  bot: Bot,
  clapperboard: Clapperboard,
} as const;

/* ── Animated Terminal ── */
type TermLine =
  | { type: "cmd"; text: string }
  | { type: "comment"; text: string }
  | { type: "text"; text: string }
  | { type: "kv"; key: string; val: string; valColor?: string }
  | { type: "gap" }
  | { type: "divider" }
  | { type: "prompt-end" };

const TERM_LINES: TermLine[] = [
  { type: "cmd",     text: "cat intro.md" },
  { type: "gap" },
  { type: "comment", text: "# App & Full Stack Developer" },
  { type: "gap" },
  { type: "text",    text: "I build apps and automation pipelines" },
  { type: "text",    text: "that make workflows smarter with AI." },
  { type: "gap" },
  { type: "comment", text: "Located in Nepal. Passionate about" },
  { type: "comment", text: "React, React Native, Node.js & AI Automation." },
  { type: "prompt-end" },
];

const CHAR_SPEED = 28;  // ms per character
const LINE_PAUSE = 120; // ms between lines

function AnimatedTerminal() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [typedText, setTypedText]       = useState<string>("");
  const [phase, setPhase]               = useState<"typing" | "lines">("typing");

  const cmdText = "cat intro.md";

  // Phase 1 — type the command character by character
  useEffect(() => {
    if (phase !== "typing") return;
    if (typedText.length < cmdText.length) {
      const t = setTimeout(
        () => setTypedText(cmdText.slice(0, typedText.length + 1)),
        CHAR_SPEED,
      );
      return () => clearTimeout(t);
    }
    // command fully typed → pause then reveal lines
    const t = setTimeout(() => setPhase("lines"), 400);
    return () => clearTimeout(t);
  }, [phase, typedText]);

  // Phase 2 — reveal remaining lines one by one
  useEffect(() => {
    if (phase !== "lines") return;
    // lines after the command (index 0 is cmd, skip it + gap)
    const remaining = TERM_LINES.length - 2; // skip cmd + first gap
    if (visibleLines < remaining) {
      const t = setTimeout(
        () => setVisibleLines((v) => v + 1),
        LINE_PAUSE,
      );
      return () => clearTimeout(t);
    }
  }, [phase, visibleLines]);

  const restLines = TERM_LINES.slice(2); // after cmd + gap
  const showCursor = phase === "typing" || visibleLines < restLines.length;

  function renderLine(line: TermLine, idx: number) {
    const shown = phase === "lines" && visibleLines > idx;
    if (!shown) return null;

    switch (line.type) {
      case "gap":
        return <div key={idx} className="h-2" />;
      case "divider":
        return <div key={idx} className="my-3 border-t border-[#1e1e2e]" />;
      case "comment":
        return (
          <p key={idx} className="terminal-comment animate-[fadeIn_0.2s_ease_forwards]">
            {line.text}
          </p>
        );
      case "text":
        return (
          <p key={idx} className="text-[#cdd6f4] animate-[fadeIn_0.2s_ease_forwards]">
            {line.text}
          </p>
        );
      case "kv":
        return (
          <p key={idx} className="animate-[fadeIn_0.2s_ease_forwards]">
            <span className="terminal-key">{line.key}</span>
            <span className="text-[#3d3d55]">{" : "}</span>
            <span style={{ color: line.valColor ?? "#a6e3a1" }}>{line.val}</span>
          </p>
        );
      case "prompt-end":
        return (
          <p key={idx} className="mt-3 animate-[fadeIn_0.2s_ease_forwards]">
            <span className="terminal-prompt">$ </span>
            <span className="terminal-cursor" />
          </p>
        );
      default:
        return null;
    }
  }

  const allDone = phase === "lines" && visibleLines >= restLines.length;

  return (
    /* Outer wrapper — positions the small terminal overlapping bottom-left of main */
    <div className="relative w-full max-w-[480px]">

      {/* ── Main terminal ── */}
      <div className="terminal terminal-float shadow-2xl shadow-black/50">
        <div className="terminal-bar">
          <span className="terminal-dot" style={{ background: "#ff5f57" }} />
          <span className="terminal-dot" style={{ background: "#febc2e" }} />
          <span className="terminal-dot" style={{ background: "#28c840" }} />
          <span className="terminal-title">BASH — WHOAMI</span>
        </div>

        <div className="terminal-body space-y-0.5" style={{ minHeight: 240 }}>
          {/* $ command line with typewriter */}
          <p className="mb-3">
            <span className="terminal-prompt">$ </span>
            <span className="text-[#cdd6f4]">{typedText}</span>
            {phase === "typing" && <span className="terminal-cursor" />}
          </p>

          {/* Animated content lines */}
          {restLines.map((line, idx) => renderLine(line, idx))}
        </div>
      </div>

      {/* ── Small status terminal — overlapping bottom-left ── */}
      <div
        className="terminal terminal-float-small absolute -bottom-10 -left-6 w-56 shadow-2xl shadow-black/60 transition-all duration-700"
        style={{
          opacity: allDone ? 1 : 0,
          transform: allDone ? "translateY(0) scale(1)" : "translateY(12px) scale(0.97)",
        }}
      >
        {/* Minimal bar — only red + yellow dots */}
        <div className="terminal-bar gap-1.5 py-2.5">
          <span className="terminal-dot" style={{ background: "#ff5f57" }} />
          <span className="terminal-dot" style={{ background: "#febc2e" }} />
        </div>

        {/* Two-row key : value table, values right-aligned in accent */}
        <div className="terminal-body py-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="terminal-key text-[0.78rem]">Uptime:</span>
            <span className="text-[0.78rem] font-semibold" style={{ color: "var(--accent)" }}>99.9%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="terminal-key text-[0.78rem]">Status:</span>
            <span className="text-[0.78rem] font-semibold" style={{ color: "var(--accent)" }}>Active</span>
          </div>
        </div>
      </div>

      {/* Bottom padding so the overlapping mini-terminal doesn't clip */}
      <div className="h-8" />
    </div>
  );
}

/* ── Cycling role typewriter ── */
const ROLES = [
  "Full Stack Dev",
  "App Developer",
  "AI Automation",
  "AI Video Creator",
];

const TYPE_SPEED   = 60;   // ms per char typed
const DELETE_SPEED = 35;   // ms per char deleted
const HOLD_MS      = 1800; // ms to hold full word
const PAUSE_MS     = 400;  // ms pause before typing next

function CyclingRole() {
  const [roleIdx, setRoleIdx]   = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase]       = useState<"typing"|"holding"|"deleting"|"pausing">("typing");

  useEffect(() => {
    const target = ROLES[roleIdx];

    if (phase === "typing") {
      if (displayed.length < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), TYPE_SPEED);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("holding"), HOLD_MS);
      return () => clearTimeout(t);
    }

    if (phase === "holding") {
      const t = setTimeout(() => setPhase("deleting"), 100);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), DELETE_SPEED);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setPhase("pausing");
      }, 100);
      return () => clearTimeout(t);
    }

    if (phase === "pausing") {
      const t = setTimeout(() => setPhase("typing"), PAUSE_MS);
      return () => clearTimeout(t);
    }
  }, [phase, displayed, roleIdx]);

  return (
    <span className="fade-up delay-2 font-mono mt-4 inline-flex items-center gap-2 text-[0.7rem] tracking-[0.2em] text-[var(--fg-muted)] uppercase">
      <span
        className="inline-block min-w-[16ch] transition-none"
        aria-live="polite"
        aria-label={ROLES[roleIdx]}
      >
        {displayed}
      </span>
      <span
        className="inline-block w-[2px] h-[0.9em] bg-[var(--accent)] align-middle"
        style={{ animation: "blink 1s step-end infinite" }}
      />
    </span>
  );
}

/* ── Hero Section ── */
export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative grid min-h-[100svh] w-full items-center"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 px-5 pb-20 pt-14 md:grid-cols-2 md:px-8 lg:gap-20">
        {/* Left */}
        <div className="flex flex-col">
          <div className="status-badge fade-up mb-8 self-start">
            <span className="status-dot" />
            Available for opportunities
          </div>

          <h1 className="fade-up delay-1 font-heading text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[1.0] tracking-tight text-[var(--fg)]">
            Hari Shankar
            <br />
            <span className="text-[var(--accent)]">Limbu</span>
          </h1>

          <CyclingRole />

          <p className="fade-up delay-3 mt-6 max-w-[460px] text-[0.95rem] leading-[1.85] text-[var(--fg-muted)]">
            I build{" "}
            <strong className="font-semibold text-[var(--fg)]">
              full-stack web apps, mobile applications
            </strong>{" "}
            and AI automation pipelines. Turning complex problems into clean,
            scalable solutions that actually ship.
          </p>

          <div className="fade-up delay-4 mt-10 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary px-7 py-3 text-[0.82rem]">
              View Projects
            </a>
            <a href="#contact" className="btn-outline px-7 py-3 text-[0.82rem]">
              Initialize Contact
            </a>
          </div>
        </div>

        {/* Right — animated terminal */}
        <div className="fade-up delay-2 flex justify-center md:justify-end">
          <AnimatedTerminal />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40">
        <span className="font-mono text-[0.6rem] uppercase tracking-widest text-[var(--fg-muted)]">scroll</span>
        <span className="h-8 w-px bg-[var(--fg-muted)]" style={{ animation: "scrollFade 2s ease-in-out infinite" }} />
      </div>
    </section>
  );
}

/* ── Stats Bar ── */
export function StatsBar() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--bg-card)]">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-0 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center justify-center px-6 py-10 text-center
              ${i % 2 === 0 && i < 2 ? "border-r border-[var(--border)] md:border-r-0" : ""}
              ${i < 3 ? "md:border-r md:border-[var(--border)]" : ""}
              ${i >= 2 ? "border-t border-[var(--border)] md:border-t-0" : ""}
            `}
          >
            <p className="font-heading text-[2.4rem] font-bold leading-none text-[var(--accent)]">
              {stat.value}
            </p>
            <p className="font-mono mt-2 text-[0.62rem] uppercase tracking-[0.18em] text-[var(--fg-muted)]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── About Section ── */
export function AboutSection() {
  return (
    <section id="about" className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr]">
        {/* Left card */}
        <div className="card flex flex-col justify-between p-8">
          <div>
            <div className="mb-6 h-14 w-14 rounded-xl bg-[var(--accent-dim)] flex items-center justify-center border border-[var(--accent)]/20">
              <Code2 size={26} style={{ color: "var(--accent)" }} />
            </div>
            <h3 className="font-heading text-2xl font-bold text-[var(--fg)] leading-tight">
              Building with
              <br />
              <span className="text-[var(--accent)]">Purpose &amp; Precision.</span>
            </h3>
            <p className="copy mt-4 text-sm">
              Every line of code is intentional — built to solve real problems and scale without friction.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {interests.map((item) => (
              <span key={item} className="skill-pill">{item}</span>
            ))}
          </div>
        </div>

        {/* Right text */}
        <div>
          <p className="section-tag">/about me</p>
          <h2 className="section-title">Who I am</h2>
          <p className="copy mt-4">
            I&apos;m <strong className="text-[var(--fg)]">Hari Shankar Limbu</strong>, an app and full-stack
            developer based in Nepal. I love building things that are fast, functional, and a little bit smart.
          </p>
          <p className="copy">
            My core focus is at the intersection of{" "}
            <strong className="text-[var(--fg)]">mobile &amp; web development</strong> and{" "}
            <strong className="text-[var(--fg)]">AI-driven automation</strong> — designing systems that don&apos;t
            just work, but actually think.
          </p>
          <p className="copy">
            When I&apos;m not shipping code, I&apos;m editing videos or experimenting with AI content pipelines.
            I believe automation is the future and I want to build it.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-6 border-t border-[var(--border)] pt-8">
            {stats.slice(0, 2).map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-3xl font-bold text-[var(--accent)]">{stat.value}</p>
                <p className="font-mono mt-1 text-[0.65rem] uppercase tracking-widest text-[var(--fg-muted)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="mb-3 flex items-center gap-2">
              <Image
                src={profilePhotoUrl}
                alt="Hari Shankar Limbu"
                width={44}
                height={44}
                className="rounded-full object-cover border-2 border-[var(--accent)]/30"
              />
              <div>
                <p className="text-sm font-semibold text-[var(--fg)]">Hari Shankar Limbu</p>
                <p className="font-mono text-[0.65rem] text-[var(--fg-muted)]">Lalitpur, Nepal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Experience / Journey Section ── */
export function JourneySection() {
  return (
    <section id="journey" className="border-t border-[var(--border)] bg-[var(--bg-card)]">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <p className="section-tag">/journey</p>
        <h2 className="section-title mb-14">Professional Experience</h2>

        {/* Experience timeline */}
        <div className="mb-16 space-y-0">
          {experience.map((item, i) => (
            <div key={`${item.company}-${i}`} className="relative flex gap-6 pb-10 last:pb-0">
              {/* Line */}
              {i < experience.length - 1 && (
                <div className="absolute left-[7px] top-[20px] bottom-0 w-px bg-[var(--border)]" />
              )}
              {/* Dot */}
              <div
                className={`timeline-dot mt-1 shrink-0 ${i === 0 ? "active" : ""}`}
              />
              {/* Card */}
              <div className="card flex-1 p-6 hover:-translate-y-0.5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-[var(--accent)]">
                      {item.role}
                    </h3>
                    <p className="font-mono mt-0.5 text-sm font-medium text-[var(--fg)]">
                      {item.company}
                    </p>
                  </div>
                  <span className="font-mono shrink-0 rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-1 text-[0.65rem] uppercase tracking-wider text-[var(--fg-muted)]">
                    {item.period}
                  </span>
                </div>
                <p className="copy mt-3 text-sm">{item.details}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-heading mb-6 text-xl font-semibold text-[var(--fg)]">Education</h3>
            {education.map((item) => (
              <div key={item.school} className="relative flex gap-6">
                <div className="timeline-dot mt-1 shrink-0" />
                <div>
                  <span className="font-mono text-[0.65rem] uppercase tracking-widest text-[var(--accent)]">
                    {item.period}
                  </span>
                  <h4 className="mt-1 font-semibold text-[var(--fg)]">{item.degree}</h4>
                  <p className="text-sm text-[var(--fg-muted)]">{item.school}</p>
                  <p className="font-mono mt-1 text-xs text-[var(--fg-muted)]">{item.details}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Interests panel */}
          <div>
            <h3 className="font-heading mb-6 text-xl font-semibold text-[var(--fg)]">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {interests.map((item) => (
                <span key={item} className="skill-pill">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Skills Section ── */
export function SkillsSection() {
  return (
    <section id="skills" className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <p className="section-tag">/skills</p>
      <h2 className="section-title mb-12">Tools I work with</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {skills.map((skill) => {
          const Icon = skillIcons[skill.icon as keyof typeof skillIcons];
          return (
            <div key={skill.title} className="card p-6 hover:-translate-y-1">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--accent-dim)]">
                <Icon size={20} style={{ color: "var(--accent)" }} />
              </div>
              <h3 className="font-heading font-semibold text-[var(--fg)]">{skill.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span key={item} className="skill-pill">{item}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── Projects Section ── */
export function ProjectsSection() {
  return (
    <section id="projects" className="border-t border-[var(--border)] bg-[var(--bg-card)]">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <p className="section-tag">/projects</p>
        <h2 className="section-title mb-12">Featured Projects</h2>
        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project) => (
            <article key={project.title} className="card group p-7 hover:-translate-y-1">
              <span className="font-mono inline-block rounded border border-[var(--accent)]/30 bg-[var(--accent-dim)] px-3 py-1 text-[0.68rem] uppercase tracking-wider text-[var(--accent)]">
                {project.label}
              </span>
              <h3 className="font-heading mt-4 text-xl font-bold text-[var(--fg)]">
                {project.title}
              </h3>
              <p className="copy mt-3 text-sm">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="skill-pill">{t}</span>
                ))}
              </div>
              <div className="mt-6">
                {project.statusCta ? (
                  <span className="font-mono inline-block rounded border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[0.68rem] uppercase tracking-wider text-amber-400">
                    {project.statusCta}
                  </span>
                ) : (
                  <a
                    href={project.projectUrl ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] transition hover:opacity-75"
                  >
                    View Project <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="https://github.com/ashoklimbu07"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            <GitHubIcon />
            More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Contact Section ── */
export function ContactSection() {
  return (
    <section id="contact" className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <div className="card overflow-hidden">
        <div className="grid md:grid-cols-[1fr_1.1fr]">
          {/* Left */}
          <div className="border-b border-[var(--border)] p-8 md:border-b-0 md:border-r">
            <p className="section-tag">/contact</p>
            <h2 className="font-heading mt-2 text-3xl font-bold leading-tight text-[var(--fg)]">
              Let&apos;s build something
              <br />
              <span className="text-[var(--accent)] italic">exceptional.</span>
            </h2>
            <p className="copy mt-4 text-sm">
              Available for freelance projects, full-time roles, and
              collaborations. Let&apos;s talk about what we can build together.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={`mailto:${contactDetails.email}`}
                className="flex items-center gap-3 text-sm text-[var(--fg-muted)] transition hover:text-[var(--accent)]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--accent-dim)]">
                  <Mail size={15} style={{ color: "var(--accent)" }} />
                </span>
                {contactDetails.email}
              </a>
              <a
                href={`tel:${contactDetails.phone.replace(/\D/g, "")}`}
                className="flex items-center gap-3 text-sm text-[var(--fg-muted)] transition hover:text-[var(--accent)]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--accent-dim)]">
                  <Phone size={15} style={{ color: "var(--accent)" }} />
                </span>
                {contactDetails.phone}
              </a>
              <div className="flex items-center gap-3 text-sm text-[var(--fg-muted)]">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--accent-dim)]">
                  <MapPin size={15} style={{ color: "var(--accent)" }} />
                </span>
                Lalitpur, Nepal
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://github.com/ashoklimbu07"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--fg-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <GitHubIcon />
              </a>
              <a
                href="https://www.linkedin.com/in/ashoklimbu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--fg-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <LinkedInIcon />
              </a>
              <a
                href={contactDetails.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center gap-2 text-xs"
              >
                <FileUser size={14} />
                Resume PDF
              </a>
            </div>
          </div>

          {/* Right — quick-contact terminal form */}
          <div className="p-8">
            <div className="terminal">
              <div className="terminal-bar">
                <span className="terminal-dot" style={{ background: "#ff5f57" }} />
                <span className="terminal-dot" style={{ background: "#febc2e" }} />
                <span className="terminal-dot" style={{ background: "#28c840" }} />
                <span className="terminal-title">CONTACT FORM</span>
              </div>
              <div className="terminal-body space-y-5">
                <p className="terminal-comment"># Send me a message directly</p>
                <div className="space-y-4">
                  <div>
                    <label className="font-mono block mb-1.5 text-[0.68rem] uppercase tracking-widest text-[#6272a4]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full rounded-md border border-[#1e1e2e] bg-[#0a0a12] px-4 py-2.5 font-mono text-sm text-[#cdd6f4] placeholder-[#555570] outline-none focus:border-[var(--accent)] transition"
                    />
                  </div>
                  <div>
                    <label className="font-mono block mb-1.5 text-[0.68rem] uppercase tracking-widest text-[#6272a4]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      className="w-full rounded-md border border-[#1e1e2e] bg-[#0a0a12] px-4 py-2.5 font-mono text-sm text-[#cdd6f4] placeholder-[#555570] outline-none focus:border-[var(--accent)] transition"
                    />
                  </div>
                  <div>
                    <label className="font-mono block mb-1.5 text-[0.68rem] uppercase tracking-widest text-[#6272a4]">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell me about your project..."
                      className="w-full resize-none rounded-md border border-[#1e1e2e] bg-[#0a0a12] px-4 py-2.5 font-mono text-sm text-[#cdd6f4] placeholder-[#555570] outline-none focus:border-[var(--accent)] transition"
                    />
                  </div>
                  <a
                    href={`mailto:${contactDetails.email}`}
                    className="btn-primary w-full justify-center font-mono text-xs uppercase tracking-widest"
                  >
                    Execute Contact
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ── */
export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-5 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-xs text-[var(--fg-muted)]">
          <span className="text-[var(--accent)]">HSL</span> · Hari Shankar Limbu · © 2026
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/video-editing"
            className="font-mono text-xs text-[var(--fg-muted)] transition hover:text-[var(--accent)] uppercase tracking-wider"
          >
            Video Portfolio →
          </Link>
          <a
            href="https://github.com/ashoklimbu07"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[var(--fg-muted)] transition hover:text-[var(--accent)] uppercase tracking-wider"
          >
            GitHub →
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ── HeroSection re-exports for page.tsx compatibility ── */
export { HeroSection as default };
