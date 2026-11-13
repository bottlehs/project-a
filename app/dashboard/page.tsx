import type { Metadata } from "next";
import InquiryDashboardView from "@/components/dashboard/InquiryDashboardView";

export const metadata: Metadata = {
  title: "문의 현황 | STUDIO ONDO",
};

export default function DashboardPage() {
  return <InquiryDashboardView />;
}
