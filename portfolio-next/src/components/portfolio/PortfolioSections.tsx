import { aboutCards, interests, projects, services, skills, stats } from "./data";

export function HeroSection() {
  return (
    <section id="hero" className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-12 px-5 pb-16 pt-28 md:grid-cols-2 md:px-8">
      <div className="fade-in-up">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#7c6af7]/40 bg-[#7c6af7]/15 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[#a89cf8]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#7c6af7]" />
          Available for work
        </div>
        <h1 className="font-heading text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl">
          Hari Shankar
          <br />
          <span className="text-transparent stroke-text">Limbu</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-[#8a85aa]">
          <strong className="font-medium text-white">App & Full Stack Developer</strong> - AI Automation
          Enthusiast - Video Editor
          <br />
          <br />I build apps, automate workflows, and explore the edges of AI - from crafting slick
          digital products to teaching machines to do the boring stuff.
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
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-[#7c6af7]/30 bg-gradient-to-br from-[#7c6af7]/35 to-[#a89cf8]/15 font-heading text-6xl font-extrabold text-[#a89cf8]/70 sm:text-7xl">
            HSL
          </div>
          <span className="absolute -right-4 top-8 hidden rounded-md border border-[#7c6af7]/30 bg-[#18181f] px-3 py-1 text-xs font-medium text-white sm:block">
            ⚡ Full Stack Dev
          </span>
          <span className="absolute -right-6 bottom-20 hidden rounded-md border border-[#7c6af7]/30 bg-[#18181f] px-3 py-1 text-xs font-medium text-white sm:block">
            🤖 AI Automation
          </span>
          <span className="absolute -left-6 bottom-8 hidden rounded-md border border-[#7c6af7]/30 bg-[#18181f] px-3 py-1 text-xs font-medium text-white sm:block">
            🎬 Video Editor
          </span>
          <span className="absolute -left-8 top-20 hidden rounded-md border border-[#7c6af7]/30 bg-[#18181f] px-3 py-1 text-xs font-medium text-white sm:block">
            📱 App Developer
          </span>
        </div>
      </div>
    </section>
  );
}

export function StatsBar() {
  return (
    <section className="border-y border-[#7c6af7]/20 bg-[#111118] px-5 py-8 md:px-8">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-y-6 md:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={stat.label} className={`text-center ${index < 3 ? "md:border-r md:border-white/10" : ""}`}>
            <p className="font-heading text-4xl font-extrabold tracking-tight text-[#a89cf8]">{stat.value}</p>
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
          <p className="section-tag">About Me</p>
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
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-[#7c6af7]/20">{card.icon}</div>
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
              <div className="text-3xl">{skill.icon}</div>
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

export function ServicesSection() {
  return (
    <section id="services" className="bg-[#111118] px-5 py-24 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="fade-in-up">
          <p className="section-tag">What I offer</p>
          <h2 className="section-title">Services</h2>
        </header>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {services.map((service) => (
            <article key={service.id} className="fade-in-up rounded-2xl border border-white/10 bg-white/5 p-8 transition hover:border-[#7c6af7]/50 hover:bg-[#7c6af7]/8">
              <p className="font-heading text-6xl font-extrabold leading-none tracking-tight text-[#7c6af7]/20">{service.id}</p>
              <h3 className="mt-4 font-heading text-xl font-bold">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#8a85aa]">{service.description}</p>
            </article>
          ))}
        </div>
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
      Designed & built with ❤️ by <span className="text-[#7c6af7]">Hari Shankar Limbu</span> · &copy; 2025
    </footer>
  );
}
