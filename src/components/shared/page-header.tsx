type Props = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: Props) {
  return (
    <div>
      <h1 className="text-4xl font-extrabold tracking-tight" style={{ color: 'var(--dark)' }}>
        {title}
      </h1>
      {description ? (
        <p className="mt-3 max-w-2xl text-base leading-7" style={{ color: 'var(--text-soft)' }}>
          {description}
        </p>
      ) : null}
    </div>
  );
}