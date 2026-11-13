import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "STUDIO ONDO HELLO",
  description:
    "브랜딩, 웹 디자인, 대시보드 UI를 만드는 디자인 스튜디오 STUDIO ONDO",
  openGraph: {
    title: "STUDIO ONDO",
    description:
      "브랜딩, 웹 디자인, 대시보드 UI를 만드는 디자인 스튜디오 STUDIO ONDO",
    images: ["/images/hero-main.jpeg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
