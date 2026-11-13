import type { Metadata } from "next";
import SitePage from "@/components/layout/SitePage";
import Hero from "@/components/sections/Hero";

export const metadata: Metadata = {
  title: "소개 | STUDIO ONDO",
};

export default function AboutPage() {
  return (
    <SitePage>
      <Hero />
    </SitePage>
  );
}
