export type CarouselItem = {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  link_type: 'NONE' | 'PRODUCT' | 'PROMOTION' | 'CATEGORY' | 'EXTERNAL';
  link_value: string | null;
  sort_order: number;
  starts_at: string | null;
  ends_at: string | null;
  is_active: boolean;
};