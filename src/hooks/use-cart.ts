'use client';

import { useMemo } from 'react';
import { useCartStore } from '@/features/cart/store/cart.store';

export function useCart() {
  const sessionId = useCartStore((state) => state.sessionId);
  const selectedBranchId = useCartStore((state) => state.selectedBranchId);
  const items = useCartStore((state) => state.items);
  const checkoutCustomer = useCartStore((state) => state.checkoutCustomer);
  const hydrated = useCartStore((state) => state.hydrated);

  const setSessionId = useCartStore((state) => state.setSessionId);
  const setSelectedBranchId = useCartStore((state) => state.setSelectedBranchId);
  const setCheckoutCustomer = useCartStore((state) => state.setCheckoutCustomer);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const replacePendingBranch = useCartStore((state) => state.replacePendingBranch);

  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.displayPrice * item.quantity, 0),
    [items],
  );

  return {
    sessionId,
    selectedBranchId,
    items,
    checkoutCustomer,
    hydrated,
    totalItems,
    subtotal,
    setSessionId,
    setSelectedBranchId,
    setCheckoutCustomer,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    replacePendingBranch,
  };
}