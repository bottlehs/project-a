import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { company } from "@/data/site";

const contactDetails = [
  {
    label: "이메일",
    value: company.email,
    href: `mailto:${company.email}`,
  },
  {
    label: "전화",
    value: company.phone,
    href: `tel:${company.phone.replaceAll("-", "")}`,
  },
] as const;

export default function Contact() {
  return (
    <section className="w-full py-16 md:py-24">
      <Container>
        <SectionTitle eyebrow="CONTACT" title="프로젝트 문의" />
        <div className="grid gap-6 md:grid-cols-2">
          {contactDetails.map((detail) => (
            <article
              className="rounded-[20px] border border-line bg-white p-7"
              key={detail.label}
            >
              <p className="mb-5 text-sm font-medium tracking-eyebrow text-main">
                {detail.label}
              </p>
              <a
                className="break-all text-2xl font-semibold text-ink transition-colors hover:text-main focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main md:text-3xl"
                href={detail.href}
              >
                {detail.value}
              </a>
            </article>
          ))}
          <article className="rounded-[20px] border border-line bg-white p-7 md:col-span-2">
            <p className="mb-5 text-sm font-medium tracking-eyebrow text-main">
              ADDRESS
            </p>
            <p className="text-xl font-semibold text-ink">{company.address}</p>
          </article>
        </div>
      </Container>
    </section>
  );
}
