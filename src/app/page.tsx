import { Navbar } from "@/components/portfolio/Navbar";
import {
  AboutSection,
  ContactSection,
  Footer,
  HeroSection,
  JourneySection,
  ProjectsSection,
  SkillsSection,
  StatsBar,
} from "@/components/portfolio/PortfolioSections";
import { ScrollBackgroundFx } from "@/components/portfolio/ScrollBackgroundFx";

export default function Home() {
  return (
    <div className="text-slate-900 transition-colors dark:text-[#f0eeff]">
      <ScrollBackgroundFx />
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <AboutSection />
        <JourneySection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
