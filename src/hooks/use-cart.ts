'use client';

import { useCartStore } from '@/features/cart/store/cart.store';

export function useCart() {
  const store = useCartStore();

  const subtotal = store.items.reduce(
    (acc, item) => acc + item.displayPrice * item.quantity,
    0,
  );

  const totalItems = store.items.reduce((acc, item) => acc + item.quantity, 0);

  return {
    ...store,
    subtotal,
    totalItems,
  };
}