import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Portfolio from "@/components/sections/Portfolio";
import Services from "@/components/sections/Services";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Services />
        <Portfolio />
        <Hero />
      </main>
    </>
  );
}
