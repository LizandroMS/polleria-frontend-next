export type Promotion = {
  id: string;
  title: string;
  description: string | null;
  discount_type: 'PERCENTAGE' | 'FIXED' | 'SPECIAL_PRICE';
  discount_value: string;
  starts_at: string | null;
  ends_at: string | null;
  is_active: boolean;
};