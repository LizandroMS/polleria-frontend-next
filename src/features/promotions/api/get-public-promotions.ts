import { apiGet } from '@/lib/api/client';
import { Promotion } from '../types';

export async function getPublicPromotions() {
  return apiGet<Promotion[]>('/promotions/public');
}