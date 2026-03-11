export type CartItem = {
  productId: string;
  branchId: string;
  quantity: number;
  promotionId?: string;
  productName: string;
  imageUrl?: string | null;
  displayPrice: number;
  categoryName?: string;
};

export type CheckoutCustomerData = {
  firstName: string;
  lastName?: string;
  phone: string;
  email?: string;
  documentNumber?:string;
  businessName?: string;
  addressText?: string;
};

export type CartState = {
  sessionId: string | null;
  selectedBranchId: string | null;
  items: CartItem[];
  checkoutCustomer: CheckoutCustomerData | null;
  hydrated: boolean;
};