export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export const videoEditingWorks = [
  {
    category: "Short-Form Content",
    title: "AI Tech Explainer Reels",
    description:
      "Fast-paced, engaging short-form videos explaining AI and tech concepts for TikTok and Instagram Reels. Built with AI-generated visuals, tight cuts, and platform-tuned hooks that consistently drive high retention.",
    tools: ["CapCut", "ElevenLabs", "Sora", "Leonardo AI"],
    type: "reel",
  },
  {
    category: "Faceless Content",
    title: "Faceless Social Media Channels — 1M+ Followers",
    description:
      "Grew multiple faceless accounts across TikTok and Facebook to significant followings using 100% AI-generated content. Handled everything from scripting and voiceover synthesis to automated bulk posting pipelines via n8n.",
    tools: ["CapCut", "ElevenLabs", "n8n", "ChatGPT", "Midjourney"],
    type: "faceless",
  },
  {
    category: "AI Brand Videos",
    title: "Client AI Video Production — 360 Automation Agency",
    description:
      "Delivered high-quality AI-generated promotional and marketing videos for business clients under 360 Automation Agency. Full pipeline from brief to final render — AI avatars, voice synthesis, lip-sync, and brand-consistent visual identity.",
    tools: ["HeyGen", "ElevenLabs", "Runway", "CapCut", "Leonardo AI"],
    type: "brand",
  },
  {
    category: "AI Avatar & Voice",
    title: "AI Avatar Spokesperson Videos",
    description:
      "Produced realistic AI avatar videos using HeyGen and ElevenLabs for e-learning and commercial clients. Maintained consistent character identity across entire course and campaign series.",
    tools: ["HeyGen", "ElevenLabs", "Midjourney", "CapCut"],
    type: "explainer",
  },
  {
    category: "Automation Toolkit",
    title: "BrollAI — Content Automation Platform",
    description:
      "Built and deployed BrollAI, a personal content automation toolkit enabling clients to accelerate AI content workflows. Features script analysis, prompt cleaning, storyboard generation, and bulk B-roll production.",
    tools: ["n8n", "ChatGPT", "Leonardo AI", "Sora", "Flow"],
    type: "brand",
  },
  {
    category: "Long-Form",
    title: "E-Learning & Tech Explainer Videos",
    description:
      "In-depth educational video series covering AI workflows, system design, and development topics. Managed bulk production pipelines ensuring consistent brand voice, pacing, and visual identity across entire course series.",
    tools: ["Premiere Pro", "After Effects", "ElevenLabs", "Canva"],
    type: "explainer",
  },
];

export const videoEditingSkills = [
  { label: "CapCut — Short-Form Editing", level: 95 },
  { label: "HeyGen — AI Avatars & Lip Sync", level: 92 },
  { label: "ElevenLabs — Voice Synthesis", level: 92 },
  { label: "Prompt Engineering & Consistency", level: 90 },
  { label: "Image Models — Nano / Banana / Midjourney / Imagine", level: 88 },
  { label: "Video Models — Veo / Grok / Kling / Hailuo / Seedance", level: 87 },
  { label: "Higgsfield — Cinematic Series Control", level: 88 },
  { label: "n8n — Content Automation Pipelines", level: 85 },
  { label: "Canva", level: 88 },
  { label: "Adapts to New AI Tools Fast", level: 100 },
];

export const videoEditingStats = [
  { value: "1000", suffix: "+", label: "AI Videos Created", static: false },
  { value: "250", suffix: "M+", label: "Total Views", static: false },
  { value: "500K", suffix: "+", label: "Followers Grown", static: true },
  { value: "2+", suffix: "", label: "Years Experience", static: true },
];

export const contactDetails = {
  email: "limashok21@gmail.com",
  phone: "+977 9816374005",
  resumeUrl: "/HARI_SHANKAR_LIMBU_2026CV.pdf",
} as const;

/** File must live at `public/images/profile/` and be referenced from site root. */
export const profilePhotoUrl = "/images/profile/pp2.jpeg" as const;

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

