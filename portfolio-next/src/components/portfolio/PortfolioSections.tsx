"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { aboutCards, education, experience, interests, projects, skills, stats } from "./data";
import Image from "next/image";
import {
  Bot,
  Clapperboard,
  Code2,
  Database,
  Globe,
  Heart,
  Settings,
  Smartphone,
  Sparkles,
  Wrench,
} from "lucide-react";

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
  const profilePhotoPath = "/images/profile/hari-profile.jpg";
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
    <section id="hero" className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-12 px-5 pb-16 pt-28 md:grid-cols-2 md:px-8">
      <div className="fade-in-up">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#7c6af7]/40 bg-[#7c6af7]/15 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[#a89cf8]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#7c6af7]" />
          Hello, it's me
        </div>
        <h1 className="font-heading text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl">
          Hari Shankar
          <br />
          <span className="text-transparent stroke-text">Limbu</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-[#8a85aa]">
          <strong className="font-medium text-white">App & Full Stack Developer</strong> - AI Automation
          Enthusiast
          <br />
          <br />I build full-stack apps, automate the boring stuff with AI, and create content that brings ideas to life.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#projects" className="rounded-lg border border-[#7c6af7] bg-[#7c6af7] px-8 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#a89cf8]">
            View Projects
          </a>
          <a href="#contact" className="rounded-lg border border-white/15 px-8 py-3 text-sm font-medium text-white transition hover:border-[#7c6af7] hover:text-[#a89cf8]">
            Let&apos;s Talk
          </a>
        </div>
      </div>

      <div className="fade-in-up flex justify-center md:justify-end [animation-delay:160ms]">
        <div className="relative h-64 w-64 sm:h-80 sm:w-80">
          <div className="absolute -inset-3 animate-[spin_20s_linear_infinite] rounded-full border border-[#7c6af7]/40">
            <span className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#7c6af7]" />
          </div>
          <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-[#7c6af7]/30 bg-gradient-to-br from-[#7c6af7]/20 to-[#a89cf8]/10">
            <Image
              src={profilePhotoPath}
              alt="Hari Shankar Limbu profile photo"
              fill
              priority
              className="object-cover"
            />
          </div>
          {heroBadges.map(({ label, Icon, className }) => (
            <span
              key={label}
              className={`absolute inline-flex items-center gap-1.5 rounded-md border border-[#7c6af7]/30 bg-[#18181f]/95 px-2.5 py-1 text-[10px] font-medium text-white shadow-[0_0_0_1px_rgba(124,106,247,0.15)] backdrop-blur-sm transition-transform duration-500 will-change-transform sm:gap-2 sm:px-3 sm:text-xs animate-[floatTag_5.5s_ease-in-out_infinite] ${className}`}
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
    <section ref={sectionRef} className="border-y border-[#7c6af7]/20 bg-[#111118] px-5 py-8 md:px-8">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-y-6 md:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={stat.label} className={`text-center ${index < 3 ? "md:border-r md:border-white/10" : ""}`}>
            <p className="font-heading text-4xl font-extrabold tracking-tight text-[#a89cf8]">
              {stat.label === "Projects Built" || stat.label === "AI Automations" ? (
                <AnimatedStatValue value={stat.value} start={shouldAnimate} />
              ) : (
                stat.value
              )}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[#8a85aa]">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="mx-auto w-full max-w-6xl px-5 py-24 md:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="fade-in-up">
          <p className="section-tag">/about me</p>
          <h2 className="section-title">Developer by day, creator by night</h2>
          <p className="copy">Hey! I&apos;m <strong className="text-white">Hari Shankar Limbu</strong>, an app and full stack developer based in Nepal. I love building things that are fast, functional, and just a little bit smart.</p>
          <p className="copy">My sweet spot is at the intersection of <strong className="text-white">software development and AI automation</strong> - designing systems that do not just work but actually think.</p>
          <p className="copy">When I&apos;m not coding, you&apos;ll find me editing videos or brewing ideas for <strong className="text-white">AI-driven content</strong>. I believe automation is the future.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {interests.map((item) => (
              <span key={item} className="rounded-md border border-[#7c6af7]/30 bg-[#7c6af7]/10 px-3 py-1 text-xs font-medium text-[#a89cf8]">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="fade-in-up space-y-4 [animation-delay:120ms]">
          {aboutCards.map((card) => (
            <article key={card.title} className="rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-[#7c6af7]/50 hover:bg-[#7c6af7]/8">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-[#7c6af7]/20">
                  {(() => {
                    const Icon = aboutIcons[card.icon as keyof typeof aboutIcons];
                    return <Icon size={20} className="text-[#a89cf8]" />;
                  })()}
                </div>
                <div>
                  <h3 className="font-heading text-base font-semibold">{card.title}</h3>
                  <p className="mt-1 text-sm leading-7 text-[#8a85aa]">{card.description}</p>
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
    <section id="skills" className="bg-[#111118] px-5 py-24 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="fade-in-up mb-14 text-center">
          <p className="section-tag">Tech Stack</p>
          <h2 className="section-title">Tools I work with</h2>
        </header>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {skills.map((skill) => (
            <article key={skill.title} className="fade-in-up rounded-2xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-1 hover:border-[#7c6af7]/50">
              <div className="text-3xl">
                {(() => {
                  const Icon = skillIcons[skill.icon as keyof typeof skillIcons];
                  return <Icon size={28} className="text-[#a89cf8]" />;
                })()}
              </div>
              <h3 className="mt-3 font-heading text-lg font-semibold">{skill.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span key={item} className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#8a85aa] transition hover:border-[#7c6af7]/50 hover:bg-[#7c6af7]/15 hover:text-[#a89cf8]">
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
    <section id="journey" className="mx-auto w-full max-w-6xl px-5 py-24 md:px-8">
      <header className="fade-in-up mb-12 text-center">
        <p className="section-tag">Journey</p>
        <h2 className="section-title">Education & Experience</h2>
      </header>
      <div className="space-y-14">
        <div className="fade-in-up">
          <h3 className="font-heading text-2xl font-semibold text-white">Education</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {education.map((item) => (
              <article key={`${item.school}-${item.period}`} className="rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-[#7c6af7]/50">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#a89cf8]">{item.period}</p>
                <h4 className="mt-2 font-heading text-lg font-semibold text-white">{item.degree}</h4>
                <p className="mt-1 text-sm font-medium text-[#c9c5e8]">{item.school}</p>
                <p className="mt-2 text-sm leading-7 text-[#8a85aa]">{item.details}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="fade-in-up [animation-delay:120ms]">
          <h3 className="font-heading text-2xl font-semibold text-white">Experience</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {experience.map((item) => (
              <article key={`${item.company}-${item.period}`} className="rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-[#7c6af7]/50">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#a89cf8]">{item.period}</p>
                <h4 className="mt-2 font-heading text-lg font-semibold text-white">{item.role}</h4>
                <p className="mt-1 text-sm font-medium text-[#c9c5e8]">{item.company}</p>
                <p className="mt-2 text-sm leading-7 text-[#8a85aa]">{item.details}</p>
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
    <section id="projects" className="mx-auto w-full max-w-6xl px-5 py-24 md:px-8">
      <header className="fade-in-up mb-12">
        <p className="section-tag">My Work</p>
        <h2 className="section-title">Featured Projects</h2>
      </header>
      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project) => (
          <article key={project.title} className="fade-in-up group rounded-2xl border border-white/10 bg-white/5 p-8 transition hover:-translate-y-1 hover:border-[#7c6af7]/45">
            <span className="rounded-md border border-[#7c6af7]/35 bg-[#7c6af7]/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.08em] text-[#a89cf8]">
              {project.label}
            </span>
            <h3 className="mt-4 font-heading text-xl font-bold">{project.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[#8a85aa]">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-[#8a85aa]">
                  {tech}
                </span>
              ))}
            </div>
            <a href="#" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[#a89cf8] transition group-hover:text-[#e8c5ff]">
              View Project <span aria-hidden>↗</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto w-full max-w-4xl px-5 py-24 text-center md:px-8">
      <div className="fade-in-up">
        <p className="section-tag">Get In Touch</p>
        <h2 className="section-title">Let&apos;s build something</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[#8a85aa]">
          Whether you&apos;ve got a project, a startup idea, or just want to talk AI - my inbox is open.
        </p>
        <a href="mailto:hari@harilimbu.dev" className="font-heading mt-8 block text-3xl font-bold tracking-tight text-[#a89cf8] transition hover:text-[#e8c5ff] sm:text-4xl">
          hari@harilimbu.dev
        </a>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {[
            { label: "GitHub", href: "https://github.com" },
            { label: "LinkedIn", href: "https://linkedin.com" },
            { label: "Twitter / X", href: "https://twitter.com" },
            { label: "Resume / CV", href: "#" },
          ].map((link) => (
            <a key={link.label} href={link.href} className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-[#8a85aa] transition hover:border-[#7c6af7] hover:bg-[#7c6af7]/10 hover:text-white">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-[#8a85aa]">
      <span className="inline-flex items-center gap-1">
        Designed & built with <Heart size={14} className="text-[#a89cf8]" /> by
      </span>{" "}
      <span className="text-[#7c6af7]">Hari Shankar Limbu</span> · &copy; 2025
    </footer>
  );
}
