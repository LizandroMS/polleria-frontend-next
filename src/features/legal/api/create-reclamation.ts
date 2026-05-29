import { apiPost } from '@/lib/api/client';
import { CreateReclamationPayload, Reclamation } from '../types';

export async function createReclamation(payload: CreateReclamationPayload) {
  return apiPost<Reclamation>('/reclamation-book', payload);
}
