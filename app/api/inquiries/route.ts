import { inquiries, inquiryCategories } from "@/data/dashboard";

export function GET(request: Request) {
  const type = new URL(request.url).searchParams.get("type");
  const categories: readonly string[] = inquiryCategories;

  if (type && type !== "전체" && !categories.includes(type)) {
    return Response.json(
      { error: "유효하지 않은 문의 분류입니다." },
      { status: 400 },
    );
  }

  const items =
    !type || type === "전체"
      ? inquiries
      : inquiries.filter((inquiry) => inquiry.category === type);

  return Response.json({ total: items.length, items });
}
