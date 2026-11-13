export const company = {
  name: "STUDIO ONDO",
  address: "서울시 ○○구 ○○로 00",
  email: "hello@studio-ondo.example",
  phone: "02-000-0000",
} as const;

export const menus = [
  { label: "소개", href: "/about" },
  { label: "서비스", href: "/services" },
  { label: "포트폴리오", href: "/portfolio" },
  { label: "문의", href: "/contact" },
] as const;

export const cta = {
  label: "프로젝트 문의",
  href: "/contact",
} as const;

export const hero = {
  eyebrow: "DESIGN STUDIO",
  title: ["브랜드의 온도를", "디자인합니다"],
  description: [
    "브랜딩부터 웹사이트, 대시보드까지.",
    "사용자가 기억하는 경험을 만듭니다.",
  ],
  image: "/hero-visual.svg",
  imageAlt: "파란색에서 살구색으로 이어지는 스튜디오 온도 대표 비주얼",
  buttons: [
    { label: "프로젝트 문의", href: "/contact", variant: "primary" },
    { label: "포트폴리오 보기", href: "/portfolio", variant: "outline" },
  ],
} as const;

export const services = [
  {
    icon: "B",
    title: "브랜딩",
    desc: "로고, 컬러, 서체까지 브랜드의 기준을 정리합니다.",
    link: "/contact",
  },
  {
    icon: "W",
    title: "웹 디자인",
    desc: "기업 홈페이지와 랜딩 페이지를 반응형으로 설계합니다.",
    link: "/contact",
  },
  {
    icon: "D",
    title: "대시보드 UI",
    desc: "복잡한 데이터를 한눈에 읽히는 화면으로 바꿉니다.",
    link: "/contact",
  },
  {
    icon: "V",
    title: "브랜드 영상",
    desc: "브랜드 이야기를 짧은 영상으로 만듭니다.",
    link: "/contact",
  },
] as const;

export const portfolioCategories = [
  "전체",
  "브랜딩",
  "웹 디자인",
  "대시보드 UI",
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];

export const portfolioProjects = [
  {
    category: "브랜딩",
    title: "온도 브랜드 아이덴티티",
    desc: "브랜드의 색과 목소리를 정리한 아이덴티티 디자인",
  },
  {
    category: "브랜딩",
    title: "모아 라이프스타일 브랜딩",
    desc: "일상의 작은 순간을 담아낸 브랜드 시스템",
  },
  {
    category: "웹 디자인",
    title: "스테이 제주 웹사이트",
    desc: "여행의 설렘을 전달하는 반응형 숙소 웹사이트",
  },
  {
    category: "웹 디자인",
    title: "그로브 브랜드 사이트",
    desc: "제품과 브랜드 이야기를 소개하는 웹사이트",
  },
  {
    category: "대시보드 UI",
    title: "플로우 운영 대시보드",
    desc: "주요 지표를 한눈에 확인하는 데이터 화면",
  },
  {
    category: "대시보드 UI",
    title: "리테일 인사이트 대시보드",
    desc: "매장별 성과와 흐름을 빠르게 파악하는 UI",
  },
] as const satisfies readonly {
  category: Exclude<PortfolioCategory, "전체">;
  title: string;
  desc: string;
}[];
