import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import BugMenu from "@/components/layout/BugMenu";
import { company, cta, menus } from "@/data/site";

export default function Header() {
  return (
    <header className="relative border-b border-line bg-cream">
      <Container className="flex h-16 items-center justify-between lg:h-20">
        <Link
          aria-label={`${company.name} 홈`}
          className="flex items-center gap-2 text-2xl font-black tracking-[-0.04em] text-ink"
          href="/"
        >
          <span aria-hidden="true" className="size-3.5 rounded-full bg-main" />
          <span>{company.name}</span>
        </Link>

        <nav aria-label="주요 메뉴" className="hidden items-center gap-10 lg:flex">
          {menus.map((menu) => (
            <Link
              className="text-lg font-medium text-ink transition-colors hover:text-main focus-visible:text-main focus-visible:outline-none"
              href={menu.href}
              key={menu.href}
            >
              {menu.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button className="!px-7 !py-4 !text-lg !font-bold" href={cta.href}>{cta.label}</Button>
        </div>

        <BugMenu />
      </Container>
    </header>
  );
}
