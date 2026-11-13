export const inquiryCategories = [
  "전체",
  "브랜딩",
  "웹 디자인",
  "대시보드 UI",
] as const;

export type InquiryCategory = Exclude<
  (typeof inquiryCategories)[number],
  "전체"
>;
export type InquiryStatus = "접수" | "진행 중" | "완료";

export type Inquiry = {
  id: string;
  company: string;
  contact: string;
  subject: string;
  category: InquiryCategory;
  status: InquiryStatus;
  receivedAt: string;
};

export const dashboardAsOf = "2026-11-06";

export const inquiries = [
  {
    id: "inq-001",
    company: "모노랩",
    contact: "김민서",
    subject: "신규 브랜드 아이덴티티 문의",
    category: "브랜딩",
    status: "진행 중",
    receivedAt: "2026-11-05",
  },
  {
    id: "inq-002",
    company: "오후의 정원",
    contact: "박지우",
    subject: "브랜드 사이트 제작 상담",
    category: "웹 디자인",
    status: "접수",
    receivedAt: "2026-11-04",
  },
  {
    id: "inq-003",
    company: "플로우웍스",
    contact: "이서준",
    subject: "운영 대시보드 UI 개선",
    category: "대시보드 UI",
    status: "진행 중",
    receivedAt: "2026-11-03",
  },
  {
    id: "inq-004",
    company: "소소상점",
    contact: "정하린",
    subject: "브랜드 로고 및 패키지 디자인",
    category: "브랜딩",
    status: "접수",
    receivedAt: "2026-11-01",
  },
  {
    id: "inq-005",
    company: "라운드테이블",
    contact: "최도윤",
    subject: "반응형 홈페이지 신규 제작",
    category: "웹 디자인",
    status: "완료",
    receivedAt: "2026-10-29",
  },
  {
    id: "inq-006",
    company: "데일리픽",
    contact: "윤서아",
    subject: "서비스 데이터 대시보드 구축",
    category: "대시보드 UI",
    status: "접수",
    receivedAt: "2026-10-26",
  },
  {
    id: "inq-007",
    company: "포레스트하우스",
    contact: "강민준",
    subject: "브랜드 리뉴얼 프로젝트",
    category: "브랜딩",
    status: "완료",
    receivedAt: "2026-10-22",
  },
  {
    id: "inq-008",
    company: "스튜디오 느린",
    contact: "한유진",
    subject: "포트폴리오 웹사이트 제작",
    category: "웹 디자인",
    status: "진행 중",
    receivedAt: "2026-10-18",
  },
  {
    id: "inq-009",
    company: "마일스톤",
    contact: "오지호",
    subject: "관리자 페이지 데이터 시각화",
    category: "대시보드 UI",
    status: "완료",
    receivedAt: "2026-09-24",
  },
  {
    id: "inq-010",
    company: "베러데이",
    contact: "임나연",
    subject: "브랜드 전략 및 비주얼 디자인",
    category: "브랜딩",
    status: "접수",
    receivedAt: "2026-09-17",
  },
  {
    id: "inq-011",
    company: "오브젝트룸",
    contact: "조현우",
    subject: "이커머스 상세 페이지 디자인",
    category: "웹 디자인",
    status: "완료",
    receivedAt: "2026-08-21",
  },
  {
    id: "inq-012",
    company: "리프앤코",
    contact: "신예은",
    subject: "브랜드 네이밍 및 로고 개발",
    category: "브랜딩",
    status: "완료",
    receivedAt: "2026-08-12",
  },
  {
    id: "inq-013",
    company: "데이터웨이브",
    contact: "문태오",
    subject: "서비스 운영 대시보드 설계",
    category: "대시보드 UI",
    status: "진행 중",
    receivedAt: "2026-07-28",
  },
  {
    id: "inq-014",
    company: "플랜트데이",
    contact: "백수빈",
    subject: "브랜드 가이드 및 패키지 디자인",
    category: "브랜딩",
    status: "완료",
    receivedAt: "2026-07-09",
  },
] as const satisfies readonly Inquiry[];
