type Props = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: Props) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold">{title}</h1>
      {description ? <p className="mt-2 text-gray-600">{description}</p> : null}
    </div>
  );
}