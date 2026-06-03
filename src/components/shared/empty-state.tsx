type Props = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function EmptyState({ title, description, action }: Props) {
  return (
    <div className="soft-card flex flex-col items-center justify-center p-8 text-center md:p-10">
      <div
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl"
        style={{ background: 'var(--primary-soft)', color: 'var(--primary)' }}
      >
        🍽️
      </div>
      <h3 className="text-xl font-extrabold" style={{ color: 'var(--dark)' }}>
        {title}
      </h3>
      {description ? (
        <p className="mt-2 max-w-md text-sm leading-7" style={{ color: 'var(--text-soft)' }}>
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
