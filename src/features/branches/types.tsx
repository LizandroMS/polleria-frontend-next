export type Branch = {
  id: string;
  name: string;
  address: string;
  phone: string | null;
  district: string | null;
  reference: string | null;
  opens_at: string | null;
  closes_at: string | null;
  is_active: boolean;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
};