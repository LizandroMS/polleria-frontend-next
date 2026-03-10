import { apiGet } from '@/lib/api/client';
import { Category } from '../types';

export async function getPublicCategories() {
  return apiGet<Category[]>('/categories/public');
}