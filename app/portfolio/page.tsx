import type { Metadata } from "next";
import SitePage from "@/components/layout/SitePage";
import Portfolio from "@/components/sections/Portfolio";

export const metadata: Metadata = {
  title: "포트폴리오 | STUDIO ONDO",
};

export default function PortfolioPage() {
  return (
    <SitePage>
      <Portfolio />
    </SitePage>
  );
}
