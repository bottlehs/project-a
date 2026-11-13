import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import PortfolioTabs from "@/components/sections/PortfolioTabs";
import { portfolioProjects } from "@/data/site";

export default function Portfolio() {
  return (
    <section className="w-full py-16 md:py-24" id="portfolio">
      <Container>
        <SectionTitle eyebrow="PORTFOLIO" title="포트폴리오" />
        <PortfolioTabs projects={portfolioProjects} />
      </Container>
    </section>
  );
}
