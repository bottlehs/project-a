type SectionTitleProps = {
  eyebrow: string;
  title: string;
};

export default function SectionTitle({ eyebrow, title }: SectionTitleProps) {
  return (
    <div className="mb-10">
      <p className="mb-3 text-xl font-medium tracking-[0.18em] text-main md:text-2xl">
        {eyebrow}
      </p>
      <h2 className="text-5xl font-bold leading-[0.96] tracking-[-0.06em] text-ink md:text-7xl">
        {title}
      </h2>
    </div>
  );
}
