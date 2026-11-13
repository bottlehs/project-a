import type { Metadata } from "next";
import SitePage from "@/components/layout/SitePage";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "문의 | STUDIO ONDO",
};

export default function ContactPage() {
  return (
    <SitePage>
      <Contact />
    </SitePage>
  );
}
