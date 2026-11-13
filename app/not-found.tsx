import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center bg-cream py-section-sm md:py-section">
      <Container className="text-center">
        <p className="mb-4 text-xs font-medium tracking-eyebrow text-main">
          404
        </p>
        <h1 className="mb-7 text-title-sm font-bold leading-tight text-ink md:text-title">
          페이지를 찾을 수 없습니다
        </h1>
        <Button href="/">메인으로 이동</Button>
      </Container>
    </main>
  );
}
