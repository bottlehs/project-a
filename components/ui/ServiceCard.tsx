import Link from "next/link";

type ServiceCardProps = {
  icon: string;
  title: string;
  desc: string;
  link: string;
};

export default function ServiceCard({
  icon,
  title,
  desc,
  link,
}: ServiceCardProps) {
  return (
    <article className="flex min-h-[340px] flex-col justify-between rounded-[20px] border border-line bg-white p-7">
      <div>
        <span
          aria-hidden="true"
          className="mb-8 inline-flex size-16 items-center justify-center rounded-2xl bg-soft text-3xl font-semibold text-main"
        >
          {icon}
        </span>
        <h3 className="mb-4 text-4xl font-medium leading-tight tracking-[-0.05em] text-ink">
          {title}
        </h3>
        <p className="text-xl leading-8 text-sub">{desc}</p>
      </div>

      <div className="mt-7 flex items-center justify-between border-t border-line pt-5">
        <Link className="inline-block text-xl font-semibold text-ink" href={link}>
          자세히 보기
        </Link>
        <span className="inline-flex size-11 items-center justify-center rounded-full bg-ink text-lg font-medium text-white">
          N
        </span>
      </div>
    </article>
  );
}
