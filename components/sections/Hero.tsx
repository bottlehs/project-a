import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { hero } from "@/data/site";

export default function Hero() {
  return (
    <section className="bg-cream py-16 md:py-section" id="about">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-4 text-xs font-medium tracking-eyebrow text-main">
            {hero.eyebrow}
          </p>
          <h1 className="mb-5 text-display-sm font-bold leading-tight text-ink md:text-display">
            {hero.title.map((line) => (
              <span className="block" key={line}>
                {line}
              </span>
            ))}
          </h1>
          <p className="mb-7 text-sm leading-6 text-sub md:text-base">
            {hero.description.map((line) => (
              <span className="block" key={line}>
                {line}
              </span>
            ))}
          </p>
          <div className="flex flex-wrap gap-3">
            {hero.buttons.map((button) => (
              <Button
                href={button.href}
                key={button.href}
                variant={button.variant}
              >
                {button.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="relative aspect-4/3 w-full overflow-hidden rounded-hero">
          <Image
            alt={hero.imageAlt}
            className="object-cover"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 50vw"
            src={hero.image}
          />
        </div>
      </Container>
    </section>
  );
}
