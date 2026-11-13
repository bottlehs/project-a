import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import ServiceCard from "@/components/ui/ServiceCard";
import { services } from "@/data/site";

export default function Services() {
  return (
    <section className="w-full py-16 md:py-24" id="service">
      <Container>
        <SectionTitle eyebrow="SERVICE" title="우리가 하는 일" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal delay={index * 100} key={service.title}>
              <ServiceCard
                desc={service.desc}
                icon={service.icon}
                link={service.link}
                title={service.title}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
