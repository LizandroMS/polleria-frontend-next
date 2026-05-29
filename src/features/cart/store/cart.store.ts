'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { CartItem, CheckoutCustomerData } from '../types';

type CartStore = {
  sessionId: string | null;
  selectedBranchId: string | null;
  items: CartItem[];
  checkoutCustomer: CheckoutCustomerData | null;
  hydrated: boolean;

  setSessionId: (sessionId: string) => void;
  setSelectedBranchId: (branchId: string | null) => void;
  setCheckoutCustomer: (data: CheckoutCustomerData) => void;

  addItem: (item: CartItem) => void;
  updateQuantity: (productId: string, branchId: string, quantity: number) => void;
  removeItem: (productId: string, branchId: string) => void;
  clearCart: () => void;
  markHydrated: () => void;

  replacePendingBranch: (branchId: string) => void;
};

type PersistedCartState = Pick<
  CartStore,
  'sessionId' | 'selectedBranchId' | 'items' | 'checkoutCustomer'
>;

function normalizeNumber(value: unknown, fallback = 0) {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : fallback;
}

function normalizeCartItem(item: Partial<CartItem>): CartItem | null {
  if (!item || typeof item.productId !== 'string') return null;

  return {
    productId: item.productId,
    branchId: typeof item.branchId === 'string' ? item.branchId : 'pending-branch',
    quantity: Math.max(1, normalizeNumber(item.quantity, 1)),
    promotionId: typeof item.promotionId === 'string' ? item.promotionId : undefined,
    productName: typeof item.productName === 'string' ? item.productName : 'Producto',
    imageUrl: typeof item.imageUrl === 'string' ? item.imageUrl : null,
    displayPrice: normalizeNumber(item.displayPrice, 0),
    originalPrice:
      item.originalPrice === null || item.originalPrice === undefined
        ? null
        : normalizeNumber(item.originalPrice, 0),
    promoPrice:
      item.promoPrice === null || item.promoPrice === undefined
        ? null
        : normalizeNumber(item.promoPrice, 0),
    categoryName: typeof item.categoryName === 'string' ? item.categoryName : undefined,
  };
}

function normalizeCheckoutCustomer(data: unknown): CheckoutCustomerData | null {
  if (!data || typeof data !== 'object') return null;

  const customer = data as Partial<CheckoutCustomerData>;

  return {
    firstName: typeof customer.firstName === 'string' ? customer.firstName : '',
    lastName: typeof customer.lastName === 'string' ? customer.lastName : '',
    phone: typeof customer.phone === 'string' ? customer.phone : '',
    email: typeof customer.email === 'string' ? customer.email : '',
    documentNumber:
      typeof customer.documentNumber === 'string' ? customer.documentNumber : '',
    businessName: typeof customer.businessName === 'string' ? customer.businessName : '',
    addressText: typeof customer.addressText === 'string' ? customer.addressText : '',
  };
}

function normalizePersistedCartState(state: unknown): PersistedCartState {
  const rawState =
    state && typeof state === 'object' && 'state' in state
      ? (state as { state?: unknown }).state
      : state;

  const persisted =
    rawState && typeof rawState === 'object' ? (rawState as Partial<CartStore>) : {};

  const items = Array.isArray(persisted.items)
    ? persisted.items
        .map((item) => normalizeCartItem(item as Partial<CartItem>))
        .filter((item): item is CartItem => Boolean(item))
    : [];

  return {
    sessionId: typeof persisted.sessionId === 'string' ? persisted.sessionId : null,
    selectedBranchId:
      typeof persisted.selectedBranchId === 'string' ? persisted.selectedBranchId : null,
    items,
    checkoutCustomer: normalizeCheckoutCustomer(persisted.checkoutCustomer),
  };
}

function areCheckoutCustomersEqual(
  current: CheckoutCustomerData | null,
  next: CheckoutCustomerData | null,
) {
  return (
    (current?.firstName ?? '') === (next?.firstName ?? '') &&
    (current?.lastName ?? '') === (next?.lastName ?? '') &&
    (current?.phone ?? '') === (next?.phone ?? '') &&
    (current?.email ?? '') === (next?.email ?? '') &&
    (current?.documentNumber ?? '') === (next?.documentNumber ?? '') &&
    (current?.businessName ?? '') === (next?.businessName ?? '') &&
    (current?.addressText ?? '') === (next?.addressText ?? '')
  );
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      sessionId: null,
      selectedBranchId: null,
      items: [],
      checkoutCustomer: null,
      hydrated: false,

      replacePendingBranch: (branchId) =>
        set((state) => ({
          selectedBranchId: branchId || null,
          items: state.items.map((item) =>
            item.branchId === 'pending-branch' ? { ...item, branchId } : item,
          ),
        })),

      setSessionId: (sessionId) => set({ sessionId }),

      setSelectedBranchId: (branchId) => set({ selectedBranchId: branchId }),

      setCheckoutCustomer: (data) =>
        set((state) => {
          const normalized = normalizeCheckoutCustomer(data);

          if (areCheckoutCustomersEqual(state.checkoutCustomer, normalized)) {
            return state;
          }

          return { checkoutCustomer: normalized };
        }),

      addItem: (item) =>
        set((state) => {
          const normalizedItem = normalizeCartItem(item);
          if (!normalizedItem) return state;

          const existing = state.items.find(
            (it) =>
              it.productId === normalizedItem.productId &&
              it.branchId === normalizedItem.branchId,
          );

          if (existing) {
            return {
              items: state.items.map((it) =>
                it.productId === normalizedItem.productId &&
                it.branchId === normalizedItem.branchId
                  ? { ...it, quantity: it.quantity + normalizedItem.quantity }
                  : it,
              ),
            };
          }

          return {
            items: [...state.items, normalizedItem],
          };
        }),

      updateQuantity: (productId, branchId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId && item.branchId === branchId
              ? { ...item, quantity: Math.max(1, normalizeNumber(quantity, 1)) }
              : item,
          ),
        })),

      removeItem: (productId, branchId) =>
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.productId === productId && item.branchId === branchId),
          ),
        })),

      clearCart: () =>
        set({
          items: [],
          checkoutCustomer: null,
          selectedBranchId: null,
        }),

      markHydrated: () => set({ hydrated: true }),
    }),
    {
      name: 'polleria-cart-storage',
      storage: createJSONStorage(() => localStorage),
      version: 2,
      // Nota para mí:
      // Esta migración evita que clientes con carritos guardados de versiones anteriores
      // rompan el checkout después de publicar cambios en la estructura del store.
      migrate: (persistedState) =>
        normalizePersistedCartState(persistedState) as unknown as CartStore,
      partialize: (state) => ({
        sessionId: state.sessionId,
        selectedBranchId: state.selectedBranchId,
        items: state.items,
        checkoutCustomer: state.checkoutCustomer,
      }),
      merge: (persistedState, currentState) => {
        const persisted = normalizePersistedCartState(persistedState);

        return {
          ...currentState,
          sessionId: persisted.sessionId,
          selectedBranchId: persisted.selectedBranchId,
          items: persisted.items,
          checkoutCustomer: persisted.checkoutCustomer,
          hydrated: false,
        };
      },
      onRehydrateStorage: () => (state) => {
        state?.markHydrated();
      },
    },
  ),
);
