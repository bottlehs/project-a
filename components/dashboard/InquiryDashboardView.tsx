"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Container from "@/components/ui/Container";
import {
  dashboardAsOf,
  inquiries,
  inquiryCategories,
  type Inquiry,
  type InquiryStatus,
} from "@/data/dashboard";

const monthLabels = [
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
] as const;

const monthKeys = ["2026-06", "2026-07", "2026-08", "2026-09", "2026-10", "2026-11"];
const currentMonth = dashboardAsOf.slice(0, 7);
const previousMonthDate = new Date(`${currentMonth}-01T00:00:00`);
previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
const previousMonth = `${previousMonthDate.getFullYear()}-${String(
  previousMonthDate.getMonth() + 1,
).padStart(2, "0")}`;

type InquiryResponse = {
  total: number;
  items: Inquiry[];
};

const validCategories: readonly string[] = inquiryCategories.filter(
  (category) => category !== "전체",
);
const validStatuses: readonly string[] = ["접수", "진행 중", "완료"];

function isInquiryResponse(value: unknown): value is InquiryResponse {
  if (
    typeof value !== "object" ||
    value === null ||
    !("total" in value) ||
    typeof value.total !== "number" ||
    !("items" in value) ||
    !Array.isArray(value.items)
  ) {
    return false;
  }

  return value.items.every(
    (item: unknown) =>
      typeof item === "object" &&
      item !== null &&
      "id" in item &&
      typeof item.id === "string" &&
      "company" in item &&
      typeof item.company === "string" &&
      "contact" in item &&
      typeof item.contact === "string" &&
      "subject" in item &&
      typeof item.subject === "string" &&
      "category" in item &&
      typeof item.category === "string" &&
      validCategories.includes(item.category) &&
      "status" in item &&
      typeof item.status === "string" &&
      validStatuses.includes(item.status) &&
      "receivedAt" in item &&
      typeof item.receivedAt === "string",
  );
}

function getSelectedCategory(
  value: string | null,
): (typeof inquiryCategories)[number] {
  return inquiryCategories.find((category) => category === value) ?? "전체";
}

function getMonthCount(
  records: readonly Inquiry[],
  month: string,
  status?: InquiryStatus,
) {
  return records.filter(
    (inquiry) =>
      inquiry.receivedAt.startsWith(month) &&
      (!status || inquiry.status === status),
  ).length;
}

function getChange(current: number, previous: number) {
  if (previous === 0) {
    return current === 0 ? "0%" : "신규";
  }
  const percentage = Math.round(((current - previous) / previous) * 100);
  return `${percentage > 0 ? "+" : ""}${percentage}%`;
}

function MetricCard({
  label,
  value,
  change,
}: {
  label: string;
  value: number;
  change: string;
}) {
  const isDecrease = change.startsWith("-");
  return (
    <article className="rounded-2xl border border-line bg-white p-5 md:p-6">
      <p className="text-sm font-medium text-sub">{label}</p>
      <div className="mt-4 flex items-end justify-between gap-3">
        <p className="text-3xl font-bold leading-none text-ink">{value}</p>
        <p
          className={`text-sm font-semibold ${
            isDecrease ? "text-sub" : "text-main"
          }`}
        >
          {change}
          <span className="ml-1 font-normal text-sub">전월 대비</span>
        </p>
      </div>
    </article>
  );
}

function StatusBadge({ status }: { status: InquiryStatus }) {
  const colors: Record<InquiryStatus, string> = {
    접수: "bg-soft text-ink",
    "진행 중": "bg-soft text-main",
    완료: "bg-cream text-sub",
  };
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  );
}

function InquiryDetails({ inquiry }: { inquiry: Inquiry }) {
  return (
    <>
      <p className="font-semibold text-ink">{inquiry.subject}</p>
      <p className="mt-1 text-sm text-sub">
        {inquiry.company} · {inquiry.contact}
      </p>
    </>
  );
}

function InquiryList({
  records,
  loading,
  error,
}: {
  records: readonly Inquiry[];
  loading: boolean;
  error: string | null;
}) {
  if (loading || error) {
    return (
      <p aria-live="polite" className="px-6 py-16 text-center text-sm text-sub">
        {loading ? "불러오는 중입니다" : error}
      </p>
    );
  }

  if (records.length === 0) {
    return (
      <p className="px-6 py-16 text-center text-sm text-sub">
        표시할 데이터가 없습니다
      </p>
    );
  }

  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="border-b border-line bg-cream text-xs text-sub">
            <tr>
              <th className="px-6 py-4 font-medium">문의 내용</th>
              <th className="px-4 py-4 font-medium">분류</th>
              <th className="px-4 py-4 font-medium">접수일</th>
              <th className="px-6 py-4 font-medium">상태</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {records.map((inquiry) => (
              <tr key={inquiry.id}>
                <td className="px-6 py-4">
                  <InquiryDetails inquiry={inquiry} />
                </td>
                <td className="px-4 py-4 text-sub">{inquiry.category}</td>
                <td className="px-4 py-4 text-sub">{inquiry.receivedAt}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={inquiry.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="divide-y divide-line md:hidden">
        {records.map((inquiry) => (
          <li className="space-y-3 p-5" key={inquiry.id}>
            <InquiryDetails inquiry={inquiry} />
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-sub">
              <span>{inquiry.category}</span>
              <span>{inquiry.receivedAt}</span>
              <StatusBadge status={inquiry.status} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function InquiryDashboardContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedCategory = getSelectedCategory(searchParams.get("type"));
  const [inquiryResult, setInquiryResult] = useState<{
    category: (typeof inquiryCategories)[number] | null;
    items: Inquiry[];
    total: number;
    error: string | null;
  }>({ category: null, items: [], total: 0, error: null });
  const loading = inquiryResult.category !== selectedCategory;
  const apiInquiries = loading ? [] : inquiryResult.items;
  const apiTotal = loading ? 0 : inquiryResult.total;
  const error = loading ? null : inquiryResult.error;

  const filteredInquiries = useMemo(
    () =>
      inquiries.filter(
        (inquiry) =>
          selectedCategory === "전체" ||
          inquiry.category === selectedCategory,
      ),
    [selectedCategory],
  );

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams();
    if (selectedCategory !== "전체") {
      params.set("type", selectedCategory);
    }

    const query = params.toString();
    fetch(`/api/inquiries${query ? `?${query}` : ""}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`문의 API 요청 실패: ${response.status}`);
        }

        const payload: unknown = await response.json();
        if (!isInquiryResponse(payload)) {
          throw new Error("문의 API 응답 형식이 올바르지 않습니다.");
        }

        setInquiryResult({
          category: selectedCategory,
          items: payload.items,
          total: payload.total,
          error: null,
        });
      })
      .catch((cause: unknown) => {
        if (cause instanceof DOMException && cause.name === "AbortError") {
          return;
        }
        console.error("문의 목록을 불러오지 못했습니다.", cause);
        setInquiryResult({
          category: selectedCategory,
          items: [],
          total: 0,
          error: "데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.",
        });
      });

    return () => controller.abort();
  }, [selectedCategory]);

  const selectCategory = (category: (typeof inquiryCategories)[number]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "전체") {
      params.delete("type");
    } else {
      params.set("type", category);
    }
    const query = params.toString();
    router.push(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
  };

  const currentInquiries = filteredInquiries.filter((inquiry) =>
    inquiry.receivedAt.startsWith(currentMonth),
  );
  const previousInquiries = filteredInquiries.filter((inquiry) =>
    inquiry.receivedAt.startsWith(previousMonth),
  );

  const metrics = [
    {
      label: "이번 달 문의",
      value: currentInquiries.length,
      change: getChange(currentInquiries.length, previousInquiries.length),
    },
    ...(["접수", "진행 중", "완료"] as const).map((status) => {
      const currentCount = getMonthCount(filteredInquiries, currentMonth, status);
      const previousCount = getMonthCount(
        filteredInquiries,
        previousMonth,
        status,
      );
      return {
        label: status === "접수" ? "신규 접수" : status,
        value: currentCount,
        change: getChange(currentCount, previousCount),
      };
    }),
  ];

  const monthlyCounts = monthKeys.map((month) =>
    getMonthCount(filteredInquiries, month),
  );
  const maxMonthlyCount = Math.max(...monthlyCounts, 1);

  return (
    <main className="min-h-screen bg-cream py-10 md:py-16">
      <Container className="space-y-8 md:space-y-10">
        <header className="flex flex-col gap-6 border-b border-line pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-eyebrow text-main">
              DASHBOARD / 문의 현황
            </p>
            <h1 className="mt-3 text-title-sm font-bold text-ink md:text-title">
              문의 현황
            </h1>
          </div>
          <nav aria-label="문의 분류 필터" className="flex flex-wrap gap-2">
            {inquiryCategories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  aria-pressed={isSelected}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main ${
                    isSelected
                      ? "border-ink bg-ink text-white"
                      : "border-line bg-white text-sub hover:border-ink hover:text-ink"
                  }`}
                  key={category}
                  onClick={() => selectCategory(category)}
                  type="button"
                >
                  {category}
                </button>
              );
            })}
          </nav>
        </header>

        <section aria-label="문의 요약" className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </section>

        <section
          aria-labelledby="monthly-chart-title"
          className="rounded-2xl border border-line bg-white p-5 md:p-7"
        >
          <div className="mb-7 flex items-center justify-between">
            <h2 className="text-lg font-bold text-ink" id="monthly-chart-title">
              월별 문의 수
            </h2>
            <span className="text-xs text-sub">최근 6개월</span>
          </div>
          <div
            aria-label="최근 6개월 월별 문의 수 막대 차트"
            className="grid h-48 grid-cols-6 items-end gap-3 sm:gap-6"
            role="img"
          >
            {monthlyCounts.map((count, index) => {
              const isCurrentMonth = index === monthlyCounts.length - 1;
              const height = `${Math.max((count / maxMonthlyCount) * 100, 4)}%`;
              return (
                <div
                  className="flex h-full flex-col items-center justify-end gap-2"
                  key={monthKeys[index]}
                >
                  <span className="text-xs font-medium text-sub">{count}</span>
                  <div
                    className={`w-full max-w-12 rounded-t-lg ${
                      isCurrentMonth ? "bg-main" : "bg-soft"
                    }`}
                    style={{ height }}
                  />
                  <span className="text-xs text-sub">{monthLabels[index]}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section
          aria-labelledby="inquiry-list-title"
          className="overflow-hidden rounded-2xl border border-line bg-white"
        >
          <div className="flex items-center justify-between px-5 py-5 md:px-6">
            <h2 className="text-lg font-bold text-ink" id="inquiry-list-title">
              문의 목록
            </h2>
            <span aria-live="polite" className="text-sm text-sub">
              {loading ? "불러오는 중입니다" : error ? "" : `${apiTotal}건`}
            </span>
          </div>
          <InquiryList records={apiInquiries} loading={loading} error={error} />
        </section>
      </Container>
    </main>
  );
}

export default function InquiryDashboardView() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-cream py-10 md:py-16">
          <Container>
            <p className="py-16 text-center text-sm text-sub">
              불러오는 중입니다
            </p>
          </Container>
        </main>
      }
    >
      <InquiryDashboardContent />
    </Suspense>
  );
}
