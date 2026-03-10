import { FeaturedProducts } from '@/components/home/featured-products';
import { FeaturedPromotions } from '@/components/home/featured-promotions';
import { HeroCarousel } from '@/components/home/hero-carousel';

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-8">
      <HeroCarousel />
      <FeaturedPromotions />
      <FeaturedProducts />
    </div>
  );
}