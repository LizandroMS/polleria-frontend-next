'use client';

import { Category } from '@/features/categories/types';

type Props = {
  categories: Category[];
  selectedSlug?: string;
  onChange: (slug?: string) => void;
};

export function CategoryFilter({ categories, selectedSlug, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => onChange(undefined)}
        className="rounded-full px-5 py-2.5 text-sm font-semibold transition"
        style={
          !selectedSlug
            ? { background: 'var(--primary)', color: 'white' }
            : { background: 'white', color: 'var(--text-main)', border: '1px solid var(--border-soft)' }
        }
      >
        Todas
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onChange(category.slug)}
          className="rounded-full px-5 py-2.5 text-sm font-semibold transition"
          style={
            selectedSlug === category.slug
              ? { background: 'var(--primary)', color: 'white' }
              : { background: 'white', color: 'var(--text-main)', border: '1px solid var(--border-soft)' }
          }
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}