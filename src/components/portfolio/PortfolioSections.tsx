"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  aboutCards,
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
import {
  Bot,
  Clapperboard,
  Code2,
  Database,
  FileUser,
  Globe,
  Mail,
  MapPin,
  Phone,
  Settings,
  Smartphone,
  Sparkles,
  Wrench,
} from "lucide-react";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden width={20} height={20}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.31 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden width={20} height={20}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden width={20} height={20}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const connectIconLinkClass =
  "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-[#8a85aa] dark:hover:text-white";

const skillIcons = {
  smartphone: Smartphone,
  globe: Globe,
  settings: Settings,
  database: Database,
  bot: Bot,
  clapperboard: Clapperboard,
} as const;

const aboutIcons = {
  wrench: Wrench,
  bot: Bot,
  clapperboard: Clapperboard,
  sparkles: Sparkles,
} as const;

function AnimatedStatValue({ value, start }: { value: string; start: boolean }) {
  const parsed = useMemo(() => {
    const numericPart = Number.parseInt(value, 10);
    if (Number.isNaN(numericPart)) {
      return null;
    }

    const suffix = value.replace(String(numericPart), "");
    return { numericPart, suffix };
  }, [value]);

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!parsed || !start) return;

    let frameId = 0;
    const durationMs = 2000;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      // easeInOutCubic gives a softer start/end for smoother counting.
      const easedProgress =
        progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      const nextValue = Math.max(1, Math.round(parsed.numericPart * easedProgress));
      setDisplayValue(nextValue);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [parsed, start]);

  if (!parsed) {
    return <>{value}</>;
  }

  return (
    <>
      {displayValue}
      {parsed.suffix}
    </>
  );
}

export function HeroSection() {
  const heroBadges = [
    {
      label: "Full Stack Dev",
      Icon: Code2,
      className: "right-0 top-6 sm:-right-4 sm:top-8 [animation-delay:0ms]",
    },
    {
      label: "AI Automation",
      Icon: Bot,
      className: "right-0 bottom-14 sm:-right-6 sm:bottom-20 [animation-delay:700ms]",
    },
    {
      label: "Video Editor",
      Icon: Clapperboard,
      className: "-left-1 bottom-2 sm:-left-6 sm:bottom-8 [animation-delay:1400ms]",
    },
    {
      label: "App Developer",
      Icon: Smartphone,
      className: "-left-2 top-14 sm:-left-8 sm:top-20 [animation-delay:2100ms]",
    },
  ];

  return (
    <section id="hero" className="scroll-hero mx-auto grid min-h-screen w-full max-w-6xl items-center gap-12 px-5 pb-16 pt-28 md:grid-cols-2 md:px-8">
      <div className="scroll-hero-content fade-in-up">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-slate-600 dark:border-[#7c6af7]/40 dark:bg-[#7c6af7]/15 dark:text-[#a89cf8]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-500 dark:bg-[#7c6af7]" />
          Hello, it&apos;s me
        </div>
        <h1 className="font-heading text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl">
          Hari Shankar
          <br />
          <span className="text-transparent stroke-text">Limbu</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-[#8a85aa]">
          <strong className="font-medium text-slate-900 dark:text-white">App & Full Stack Developer</strong> - AI Automation
          Enthusiast
          <br />
          <br />I build full-stack apps, automate the boring stuff with AI, and create content that brings ideas to life.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#projects" className="rounded-lg border border-slate-900 bg-slate-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-slate-800 dark:border-[#7c6af7] dark:bg-[#7c6af7] dark:hover:bg-transparent dark:hover:text-[#a89cf8]">
            View Projects
          </a>
          <a href="#contact" className="rounded-lg border border-slate-200 px-8 py-3 text-sm font-medium text-slate-900 transition hover:border-slate-300 hover:text-slate-800 dark:border-white/15 dark:text-white dark:hover:text-[#a89cf8]">
            Let&apos;s Talk
          </a>
        </div>
      </div>

      <div className="scroll-hero-media fade-in-up flex justify-center md:justify-end [animation-delay:160ms]">
        <div className="scroll-avatar-wrap relative h-64 w-64 sm:h-80 sm:w-80">
          <div className="absolute -inset-3 animate-[spin_20s_linear_infinite] rounded-full border border-[#7c6af7]/40">
            <span className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#7c6af7]" />
          </div>
          <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-[#7c6af7]/30 bg-gradient-to-br from-[#7c6af7]/20 to-[#a89cf8]/10">
            <Image
              src={profilePhotoUrl}
              alt="Hari Shankar Limbu"
              fill
              priority
              quality={92}
              sizes="profile-photo.png"
              className="pointer-events-none select-none object-cover object-center width h-full"
            />
          </div>
          {heroBadges.map(({ label, Icon, className }) => (
            <span
              key={label}
            className={`scroll-hero-badge absolute inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white/95 px-2.5 py-1 text-[10px] font-medium text-slate-800 shadow-sm backdrop-blur-sm transition-transform duration-500 will-change-transform dark:border-[#7c6af7]/30 dark:bg-[#18181f]/95 dark:text-white dark:shadow-[0_0_0_1px_rgba(124,106,247,0.15)] sm:gap-2 sm:px-3 sm:text-xs animate-[floatTag_5.5s_ease-in-out_infinite] ${className}`}
            >
              <Icon size={13} className="text-[#a89cf8] sm:h-[14px] sm:w-[14px]" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StatsBar() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || shouldAnimate) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [shouldAnimate]);

  return (
    <section
      ref={sectionRef}
      className="scroll-section-fx border-y border-slate-200 bg-slate-50 px-5 py-8 md:px-8 dark:border-[#7c6af7]/20 dark:bg-[#111118]"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-y-6 md:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={stat.label} className={`text-center ${index < 3 ? "md:border-r md:border-slate-300 dark:md:border-white/10" : ""}`}>
            <p className="font-heading text-4xl font-extrabold tracking-tight text-slate-900 dark:text-[#a89cf8]">
              {stat.label === "Projects Built" || stat.label === "AI Automations" ? (
                <AnimatedStatValue value={stat.value} start={shouldAnimate} />
              ) : (
                stat.value
              )}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.15em] text-slate-600 dark:text-[#8a85aa]">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="scroll-section-fx mx-auto w-full max-w-6xl px-5 py-24 md:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="fade-in-up">
          <p className="section-tag">/about me</p>
          <h2 className="section-title">Developer by day, creator by night</h2>
          <p className="copy">Hey! I&apos;m <strong className="text-slate-900 dark:text-white">Hari Shankar Limbu</strong>, an app and full stack developer based in Nepal. I love building things that are fast, functional, and just a little bit smart.</p>
          <p className="copy">My sweet spot is at the intersection of <strong className="text-slate-900 dark:text-white">software development and AI automation</strong> - designing systems that do not just work but actually think.</p>
          <p className="copy">When I&apos;m not coding, you&apos;ll find me editing videos or brewing ideas for <strong className="text-slate-900 dark:text-white">AI-driven content</strong>. I believe automation is the future.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {interests.map((item) => (
              <span key={item} className="rounded-md border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:border-[#7c6af7]/30 dark:bg-[#7c6af7]/10 dark:text-[#a89cf8]">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="fade-in-up space-y-4 [animation-delay:120ms]">
          {aboutCards.map((card) => (
            <article key={card.title} className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:hover:border-[#7c6af7]/50 dark:hover:bg-[#7c6af7]/8">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-[#7c6af7]/20">
                  {(() => {
                    const Icon = aboutIcons[card.icon as keyof typeof aboutIcons];
                    return <Icon size={20} className="text-[#a89cf8]" />;
                  })()}
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold">{card.title}</h3>
                  <p className="mt-1 text-sm leading-7 text-slate-600 dark:text-[#8a85aa]">{card.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-section-fx bg-slate-50 px-5 py-24 md:px-8 dark:bg-[#111118]">
      <div className="mx-auto w-full max-w-6xl">
        <header className="fade-in-up mb-14 text-center">
          <p className="section-tag">Tech Stack</p>
          <h2 className="section-title">Tools I work with</h2>
        </header>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {skills.map((skill) => (
            <article key={skill.title} className="fade-in-up rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:hover:border-[#7c6af7]/50">
              <div className="text-3xl">
                {(() => {
                  const Icon = skillIcons[skill.icon as keyof typeof skillIcons];
                  return <Icon size={28} className="text-[#a89cf8]" />;
                })()}
              </div>
              <h3 className="mt-3 font-heading text-lg font-semibold">{skill.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span key={item} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600 transition hover:border-slate-300 hover:text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-[#8a85aa] dark:hover:border-[#7c6af7]/50 dark:hover:bg-[#7c6af7]/15 dark:hover:text-[#a89cf8]">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function JourneySection() {
  return (
    <section id="journey" className="scroll-section-fx mx-auto w-full max-w-6xl px-5 py-24 md:px-8">
      <header className="fade-in-up mb-12 text-center">
        <p className="section-tag">Journey</p>
        <h2 className="section-title">Education & Experience</h2>
      </header>
      <div className="space-y-14">
        <div className="fade-in-up">
          <h3 className="font-heading text-2xl font-semibold text-slate-900 dark:text-white">Education</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {education.map((item) => (
              <article key={`${item.school}-${item.period}`} className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:hover:border-[#7c6af7]/50">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-600 dark:text-[#a89cf8]">{item.period}</p>
                <h4 className="mt-2 font-heading text-lg font-semibold text-slate-900 dark:text-white">{item.degree}</h4>
                <p className="mt-1 text-sm font-medium text-slate-700 dark:text-[#c9c5e8]">{item.school}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-[#8a85aa]">{item.details}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="fade-in-up [animation-delay:120ms]">
          <h3 className="font-heading text-2xl font-semibold text-slate-900 dark:text-white">Experience</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {experience.map((item) => (
              <article key={`${item.company}-${item.period}`} className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:hover:border-[#7c6af7]/50">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-600 dark:text-[#a89cf8]">{item.period}</p>
                <h4 className="mt-2 font-heading text-lg font-semibold text-slate-900 dark:text-white">{item.role}</h4>
                <p className="mt-1 text-sm font-medium text-slate-700 dark:text-[#c9c5e8]">{item.company}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-[#8a85aa]">{item.details}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="scroll-section-fx mx-auto w-full max-w-6xl px-4 pb-6 pt-14 sm:px-5 md:px-8 md:pb-8 md:pt-20 lg:pt-24"
    >
      <header className="fade-in-up mb-8 md:mb-10">
        <p className="section-tag">My Work</p>
        <h2 className="section-title">Featured Projects</h2>
      </header>
      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="fade-in-up group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:hover:border-[#7c6af7]/45 sm:p-8"
          >
            <span className="rounded-md border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.08em] text-indigo-700 dark:border-[#7c6af7]/35 dark:bg-[#7c6af7]/15 dark:text-[#a89cf8]">
              {project.label}
            </span>
            <h3 className="mt-4 font-heading text-xl font-bold">{project.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-[#8a85aa]">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech} className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-[#8a85aa]">
                  {tech}
                </span>
              ))}
            </div>
            {project.statusCta ? (
              <p className="mt-6 text-sm font-medium tracking-wide text-slate-600 dark:text-[#8a85aa]">
                <span className="rounded-md border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-amber-700 dark:border-amber-500/35 dark:bg-amber-500/10 dark:text-amber-200/95">
                  {project.statusCta}
                </span>
              </p>
            ) : (
              <a
                href={project.projectUrl ?? "#"}
                target={project.projectUrl ? "_blank" : undefined}
                rel={project.projectUrl ? "noopener noreferrer" : undefined}
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[#7c6af7] transition group-hover:text-[#6b5ce0] dark:text-[#a89cf8] dark:group-hover:text-[#e8c5ff]"
              >
                View Project <span aria-hidden>↗</span>
              </a>
            )}
          </article>
        ))}
      </div>
      <div className="fade-in-up mt-6 flex justify-center [animation-delay:180ms] md:mt-8">
        <a
          href="https://github.com/ashoklimbu07"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-[#8a85aa] dark:hover:border-[#7c6af7]/50 dark:hover:bg-[#7c6af7]/10 dark:hover:text-white sm:w-auto sm:max-w-none"
        >
          <GitHubIcon className="shrink-0 text-indigo-500 dark:text-[#a89cf8]" />
          See more projects
        </a>
      </div>
    </section>
  );
}

const connectProfileIconLinks = [
  { ariaLabel: "GitHub profile", title: "GitHub", href: "https://github.com/ashoklimbu07", icon: "github" as const },
  { ariaLabel: "LinkedIn profile", title: "LinkedIn", href: "https://www.linkedin.com/in/ashoklimbu", icon: "linkedin" as const },
  { ariaLabel: "Facebook profile", title: "Facebook", href: "https://www.facebook.com/ashok1o", icon: "facebook" as const },
] as const;

export function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-section-fx mx-auto w-full max-w-5xl px-4 pb-16 pt-10 text-center sm:px-5 md:px-8 md:pb-20 md:pt-12"
    >
      <div className="fade-in-up mx-auto max-w-3xl md:max-w-none">
        <p className="section-tag">Get In Touch</p>
        <h2 className="section-title">Let&apos;s build something</h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-[#8a85aa] sm:text-lg">
          Whether you&apos;ve got a project, a startup idea, or just want to talk AI — my inbox is open. I work with teams and founders on web, mobile, and automation.
        </p>

        <div className="mx-auto mt-8 max-w-3xl text-left md:mx-0 md:max-w-none lg:mx-auto">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500 dark:text-[#a89cf8]" aria-hidden />
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-600 dark:text-[#7c6af7]">Email</p>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="mt-1 block break-all text-sm font-medium text-slate-900 transition hover:text-slate-700 dark:text-white dark:hover:text-[#e8c5ff]"
                >
                  {contactDetails.email}
                </a>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500 dark:text-[#a89cf8]" aria-hidden />
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-600 dark:text-[#7c6af7]">Phone</p>
                <a
                  href={`tel:${contactDetails.phone.replace(/\D/g, "")}`}
                  className="mt-1 block text-sm font-medium text-slate-900 transition hover:text-slate-700 dark:text-white dark:hover:text-[#e8c5ff]"
                >
                  {contactDetails.phone}
                </a>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:col-span-2 lg:col-span-1 dark:border-white/10 dark:bg-white/5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500 dark:text-[#a89cf8]" aria-hidden />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-600 dark:text-[#7c6af7]">Location</p>
                <p className="mt-1 text-sm text-slate-700 dark:text-[#c9c5e8]">Based in Lalitpur, Nepal</p>
              </div>
            </div>
          </div>
        </div>

        <p className="section-tag mt-10">Connect</p>
        <div className="mx-auto mt-4 flex flex-wrap items-center justify-center gap-3">
          {connectProfileIconLinks.map((link) => (
            <a
              key={link.ariaLabel}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.ariaLabel}
              title={link.title}
              className={connectIconLinkClass}
            >
              {link.icon === "github" ? (
                <GitHubIcon className="text-indigo-500 dark:text-[#a89cf8]" />
              ) : link.icon === "linkedin" ? (
                <LinkedInIcon className="text-indigo-500 dark:text-[#a89cf8]" />
              ) : (
                <FacebookIcon className="text-indigo-500 dark:text-[#a89cf8]" />
              )}
            </a>
          ))}
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

export function Footer() {
  return (
    <footer className="scroll-section-fx border-t border-slate-200 px-5 py-8 text-center text-sm text-slate-600 dark:border-white/10 dark:text-[#8a85aa]">
      <span className="text-[#7c6af7]">Hari Shankar Limbu</span> · &copy; 2026
    </footer>
  );
}
