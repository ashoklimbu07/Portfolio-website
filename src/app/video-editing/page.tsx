import { ScrollBackgroundFx } from "@/components/portfolio/ScrollBackgroundFx";
import {
  VideoEditingContactSection,
  VideoEditingFooter,
  VideoEditingHeroSection,
  VideoEditingSkillsSection,
  VideoEditingStatsBar,
  VideoEditingSummarySection,
  VideoEditingWorksSection,
  VideoNavbar,
} from "@/components/portfolio/VideoEditingSections";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Editing Portfolio | Hari Shankar Limbu",
  description:
    "Video editing portfolio of Hari Shankar Limbu — short-form reels, AI brand videos, faceless content, and explainer videos.",
};

export default function VideoEditingPage() {
  return (
    <div className="text-slate-900 transition-colors dark:text-[#f0eeff]">
      <ScrollBackgroundFx />
      <VideoNavbar />
      <main className="flex-1">
        <VideoEditingHeroSection />
        <VideoEditingStatsBar />
        <VideoEditingSummarySection />
        <VideoEditingWorksSection />
        <VideoEditingSkillsSection />
        <VideoEditingContactSection />
      </main>
      <VideoEditingFooter />
    </div>
  );
}
