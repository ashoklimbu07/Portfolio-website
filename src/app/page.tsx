import { Navbar } from "@/components/portfolio/Navbar";
import { PortfolioExperience } from "@/components/portfolio/PortfolioExperience";

export default function Home() {
  return (
    <div className="text-slate-900 transition-colors dark:text-[#f0eeff]">
      <Navbar />
      <PortfolioExperience />
    </div>
  );
}
