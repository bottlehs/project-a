# STUDIO ONDO

브랜드 디자인 스튜디오 STUDIO ONDO의 반응형 랜딩 페이지입니다. Next.js App Router와 Tailwind CSS를 사용합니다.

## 현재 구현 상태

- 공통 헤더와 서비스, 포트폴리오, 소개(Hero) 섹션을 제공합니다.
- 서비스 카드와 포트폴리오 프로젝트 목록은 `data/site.ts`의 정적 예시 데이터입니다.
- 포트폴리오 탭은 전체·브랜딩·웹 디자인·대시보드 UI별로 프로젝트를 필터링하며, 키보드 방향키와 Home/End 키로 이동할 수 있습니다.
- 서비스 카드와 포트폴리오 카드에 뷰포트 진입 애니메이션을 적용했습니다. 동작 감소 설정에서는 애니메이션을 생략합니다.
- 포트폴리오 카드에는 카테고리별 추상 미리보기가 있으며, 마우스 호버 시 카드가 4px 올라가고 미리보기가 1.05배 확대됩니다(0.2초). 터치 기기와 동작 감소 설정에서는 호버 애니메이션을 적용하지 않습니다.
- 모바일 헤더의 메뉴 버튼으로 내비게이션과 문의 링크를 열고 닫을 수 있습니다.
- 문의 버튼과 일부 서비스 링크는 `/#contact`를 가리키지만, 현재 문의 섹션은 구현되어 있지 않습니다. 회사 연락처와 프로젝트 정보도 샘플 값이므로 공개 전 실제 정보로 교체해야 합니다.

## 시작하기

필요 환경:

- Node.js 20.9.0 이상 (설치된 Next.js 16.4.2 기준)
- npm

```bash
npm ci
npm run dev
```

개발 서버는 기본적으로 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

## 주요 명령어

```bash
npm run dev    # 개발 서버
npm run lint   # ESLint 검사
npm run build  # 프로덕션 빌드와 TypeScript 검사
npm run start  # 프로덕션 빌드 실행
```

## 프로젝트 구조

- `app/`: App Router 페이지, 루트 레이아웃, 전역 스타일
- `components/layout/`: 공통 레이아웃 컴포넌트
- `components/sections/`: 페이지 섹션 컴포넌트
- `components/ui/`: 재사용 UI 컴포넌트
- `data/site.ts`: 메뉴, 서비스, 포트폴리오 등 사이트 콘텐츠
- `public/`: 정적 파일

## 설정 및 확인 사항

- **Node.js 버전:** Next.js 16.4.2는 Node.js 20.9.0 이상을 요구합니다. 현재 `package.json`에는 `engines.node`가 선언되어 있지 않으므로, 로컬·CI 환경에서 이 버전을 기준으로 맞춰 주세요.
- **폰트:** 앱은 `next/font`의 Geist를 로드하지 않습니다. 전역 폰트는 `app/globals.css`에 지정한 Pretendard 스택이며, Pretendard 파일을 별도로 제공하지 않으면 시스템 대체 글꼴로 표시될 수 있습니다.
- **Next.js ESLint 설정 버전:** `next`는 `^16.4.2`, `eslint-config-next`는 `16.4.0`으로 선언되어 있습니다. 현재 lint는 통과하지만, 향후 두 패키지의 버전을 일치시키는 것을 권장합니다.

`next.config.ts`에서는 개발 요청 허용 호스트, Cache Components, Partial Prefetching 및 Turbopack CSS 로더를 설정합니다. 마지막 확인 시 `npm run lint`와 `npm run build`가 통과했습니다.
