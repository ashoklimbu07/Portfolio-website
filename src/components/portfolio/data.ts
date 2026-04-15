export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export const contactDetails = {
  email: "limashok21@gmail.com",
  phone: "+977 9816374005",
  resumeUrl: "/HARI_SHANKAR_LIMBU_2026CV.pdf",
} as const;

/** File must live at `public/images/profile/` (same path without `/public`). */
export const profilePhotoUrl = "public/images/profile/pp2.jpeg" as const;

export const stats = [
  { value: "2+", label: "Years Experience" },
  { value: "20+", label: "Projects Built" },
  { value: "10+", label: "AI Automations" },
  { value: "100%", label: "Passion Driven" },
];

export const interests = [
  "AI Content Creation",
  "Workflow Automation",
  "Video Editing",
  "Open Source",
  "System Design",
  "No-Code / Low-Code",
];

export const skills = [
  {
    icon: "smartphone",
    title: "Mobile Development",
    items: ["React Native", "Kotlin","Android"],
  },
  {
    icon: "globe",
    title: "Frontend",
    items: ["React", "Next.js","JavaScript", "TypeScript", "Tailwind CSS", "HTML/CSS"],
  },
  {
    icon: "settings",
    title: "Backend",
    items: ["Node.js", "Express", "REST APIs"],
  },
  {
    icon: "database",
    title: "Database & Cloud",
    items: ["PostgreSQL", "MongoDB",  "Supabase", "AWS", "Vercel" , " sqlite"],
  },
  {
    icon: "bot",
    title: "AI & Automation",
    items: ["OpenAI API", "LangChain", "n8n", "RAG", "Prompt Engineering"],
  },
  {
    icon: "clapperboard",
    title: "Creative Tools",
    items: ["Premiere Pro", "After Effects", "CapCut", "Canva"],
  },
];

export const projects = [
  {
    label: "Content Automation",
    title: "BrollAi-Personal content creation Toolkit",
    description:
      "Full stack application for personal content creation, using AI to generate content and automate the process also features script anlayzer , prompt cleaner , manual script and story board generator, etc..",
    tech: ["typescript", "API integration", "MongoDB"],
    projectUrl: "https://github.com/ashoklimbu07/Brollai",
  },
  {
    label: "Mobile App",
    title: "Okhati - Medication reminder App",
    description:
      "A react native based medication reminder app for elderly people(Nepali Audience), to help them remember their medications and avoid missing them , also features medication reminder notifications and medication history tracking for caregivers and family members",
    tech: ["react native", "supabase", "sqlite", "typescript"],
    statusCta: "In active development",
  },
];

export const aboutCards = [
  {
    icon: "wrench",
    title: "Full Stack Developer",
    description:
      "End-to-end development from database design to polished user interfaces, covering mobile and web.",
  },
  {
    icon: "bot",
    title: "AI Automation Enthusiast",
    description:
      "Passionate about leveraging AI tools - LLMs, agents, and pipelines - to automate real-world workflows.",
  },
  {
    icon: "sparkles",
    title: "AI Content Creator",
    description:
      "Exploring the creative side of AI - making content that informs, entertains, and sparks curiosity.",
  },
  {
    icon: "clapperboard",
    title: "Video Editor (Hobby)",
    description:
      "Love crafting video content - from short-form reels to AI-generated explainers and tech content.",
  },
];

export const education = [
  {
    school: "Institute of Engineering(IOE),Dharan,Nepal",
    degree: "Bachelor in Electronics, communication and Information Engineering",
    period: "2021 - 2025",
    details: "Registered Engineer – Nepal Engineering Council (NEC)  | November,2025",
  },
];

export const experience = [
  {
    role: "App Developer",
    company: "TEJ Center PVT.LTD",
    period: "2026 - Present",
    details: "Building medication reminder apps for elderly people(Nepali Audience), from scratch to production",
  },
  {
    role: "Full Stack Developer (Bootcamp)",
    company: "TEJ Center PVT.LTD",
    period: "July - December 2025",
    details: "Learn full stack development , api integration , database and system design , RAG , Prompt Engineering , scalability and deployment",
  },
  {
    role: "Video Editor ",
    company: "Self Employed",
    period: "2023 - Present",
    details: "Providing freelance video editing services to clients , also create content for my own accounts , managing several faceless tikok and facebook accounts",
  },
  {
    role: "Founder",
    company: "360 Automation Agency",
    period: "2026 - Present",
    details: "Serving clients with high quality AI videos for their businesses and brands to engage with their audience",
  },
];

