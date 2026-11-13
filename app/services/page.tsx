import type { Metadata } from "next";
import SitePage from "@/components/layout/SitePage";
import Services from "@/components/sections/Services";

export const metadata: Metadata = {
  title: "서비스 | STUDIO ONDO",
};

export default function ServicesPage() {
  return (
    <SitePage>
      <Services />
    </SitePage>
  );
}
