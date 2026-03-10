export type CreateOrderPayload = {
  branchId: string;
  orderType: 'DELIVERY' | 'PICKUP' | 'DINE_IN';
  paymentMethod: 'CASH' | 'YAPE' | 'PLIN' | 'CARD';
  invoiceType: 'NONE' | 'BOLETA_SIMPLE' | 'FACTURA';
  addressId?: string;
  notes?: string;
  deliveryFee?: number;
  customer: {
    firstName: string;
    lastName?: string;
    phone: string;
    email?: string;
    documentType?: string;
    documentNumber?: string;
    businessName?: string;
    addressText?: string;
  };
  items: Array<{
    productId: string;
    branchId: string;
    quantity: number;
    promotionId?: string;
    notes?: string;
  }>;
};

export type OrderSummary = {
  id: string;
  order_number: string;
  customer_name_snapshot: string;
  customer_phone_snapshot: string | null;
  total: string;
  status: string;
  order_type: string;
  payment_method: string;
  invoice_type: string;
  created_at: string;
  branch_id?: string;
  branch_name?: string;
};

export type OrderDetailResponse = {
  order: any;
  items: any[];
  history: any[];
};