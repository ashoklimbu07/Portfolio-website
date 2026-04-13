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

export default function Home() {
  return (
    <div className="bg-[#0a0a0f] text-[#f0eeff]">
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
