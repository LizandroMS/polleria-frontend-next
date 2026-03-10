export type Product = {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  base_price: string;
  display_price?: string;
  is_available?: boolean;
  is_featured: boolean;
  is_active: boolean;
  category_name: string;
  category_slug: string;
};