type Props = {
  title: string;
  description?: string;
  eyebrow?: string;
};

export function PageHeader({ title, description, eyebrow }: Props) {
  return (
    <div className="relative z-10">
      {eyebrow ? <p className="section-subtitle">{eyebrow}</p> : null}
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl" style={{ color: 'var(--dark)' }}>
        {title}
      </h1>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}
