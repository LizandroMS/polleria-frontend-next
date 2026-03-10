import { apiGet } from '@/lib/api/client';
import { Branch } from '../types';

export async function getPublicBranches() {
  return apiGet<Branch[]>('/branches/public');
}