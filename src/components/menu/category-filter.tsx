'use client';

import { Category } from '@/features/categories/types';

type Props = {
  categories: Category[];
  selectedSlug?: string;
  onChange: (slug?: string) => void;
};

export function CategoryFilter({ categories, selectedSlug, onChange }: Props) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <button
        onClick={() => onChange(undefined)}
        className={`rounded-full px-4 py-2 text-sm ${
          !selectedSlug ? 'bg-black text-white' : 'bg-white border'
        }`}
      >
        Todas
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onChange(category.slug)}
          className={`rounded-full px-4 py-2 text-sm ${
            selectedSlug === category.slug ? 'bg-black text-white' : 'bg-white border'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}