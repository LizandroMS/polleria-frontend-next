import { apiGet } from '@/lib/api/client';
import { CarouselItem } from '../types';

export async function getPublicCarousel() {
  return apiGet<CarouselItem[]>('/carousel/public');
}