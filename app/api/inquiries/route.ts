import { neon } from "@neondatabase/serverless";
import { inquiryCategories } from "@/data/dashboard";

export async function GET(request: Request) {
  const type = new URL(request.url).searchParams.get("type");
  const categories: readonly string[] = inquiryCategories;

  if (type && type !== "전체" && !categories.includes(type)) {
    return Response.json(
      { error: "유효하지 않은 문의 분류입니다." },
      { status: 400 },
    );
  }

  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL is not configured.");
    }

    const sql = neon(databaseUrl);
    const items = await sql`
      SELECT
        id::text AS id,
        company,
        "owner" AS contact,
        COALESCE(NULLIF("type", ''), '문의') || ' 문의' AS subject,
        "type" AS category,
        CASE
          WHEN status IN ('접수', '완료') THEN status
          ELSE '진행 중'
        END AS status,
        TO_CHAR("date", 'YYYY-MM-DD') AS "receivedAt"
      FROM inquiries
      WHERE ${!type || type === "전체"} OR "type" = ${type}
      ORDER BY "date" ASC, id ASC
    `;

    return Response.json({ total: items.length, items });
  } catch (error) {
    console.error("문의 목록을 데이터베이스에서 불러오지 못했습니다.", error);
    return Response.json(
      { message: "문의 목록을 불러오지 못했습니다." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { message: "요청 본문이 올바른 JSON 형식이 아닙니다." },
      { status: 400 },
    );
  }

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return Response.json(
      { message: "요청 본문이 올바르지 않습니다." },
      { status: 400 },
    );
  }

  const { company, type, owner } = body as Record<string, unknown>;
  const allowedTypes: readonly string[] = ["브랜딩", "웹 디자인", "대시보드 UI"];
  const isValidText = (value: unknown): value is string =>
    typeof value === "string" && value.trim().length > 0 && value.length <= 50;

  if (
    !isValidText(company) ||
    !isValidText(owner) ||
    typeof type !== "string" ||
    !allowedTypes.includes(type)
  ) {
    return Response.json(
      {
        message:
          "회사명과 담당자는 1~50자여야 하며, 문의 유형은 지정된 분류 중 하나여야 합니다.",
      },
      { status: 400 },
    );
  }

  const dateParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const dateValues = Object.fromEntries(
    dateParts.map(({ type: partType, value }) => [partType, value]),
  );
  const today = `${dateValues.year}-${dateValues.month}-${dateValues.day}`;

  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL is not configured.");
    }

    const sql = neon(databaseUrl);
    const [item] = await sql`
      INSERT INTO inquiries (company, "type", "owner", "date", status)
      VALUES (${company.trim()}, ${type}, ${owner.trim()}, ${today}, ${"상담 중"})
      RETURNING
        id,
        company,
        "type",
        "owner",
        TO_CHAR("date", 'YYYY-MM-DD') AS "date",
        status
    `;

    if (!item) {
      throw new Error("The inserted inquiry was not returned.");
    }

    return Response.json({ item }, { status: 201 });
  } catch (error) {
    console.error("문의 내용을 데이터베이스에 저장하지 못했습니다.", error);
    return Response.json(
      { message: "문의 내용을 저장하지 못했습니다." },
      { status: 500 },
    );
  }
}
