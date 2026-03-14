'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
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
                    selectedBranchId: branchId,
                    items: state.items.map((item) =>
                        item.branchId === 'pending-branch' ? { ...item, branchId } : item,
                    ),
                })),
            setSessionId: (sessionId) => set({ sessionId }),

            setSelectedBranchId: (branchId) => set({ selectedBranchId: branchId }),

            setCheckoutCustomer: (data) => set({ checkoutCustomer: data }),

            addItem: (item) =>
                set((state) => {
                    const existing = state.items.find(
                        (it) => it.productId === item.productId && it.branchId === item.branchId,
                    );

                    if (existing) {
                        return {
                            items: state.items.map((it) =>
                                it.productId === item.productId && it.branchId === item.branchId
                                    ? { ...it, quantity: it.quantity + item.quantity }
                                    : it,
                            ),
                        };
                    }

                    return {
                        items: [...state.items, item],
                    };
                }),

            updateQuantity: (productId, branchId, quantity) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.productId === productId && item.branchId === branchId
                            ? { ...item, quantity }
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
            onRehydrateStorage: () => (state) => {
                state?.markHydrated();
            },
        },
    ),
);