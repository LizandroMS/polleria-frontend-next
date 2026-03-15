export type OrderType = 'DELIVERY' | 'PICKUP' | 'DINE_IN';
export type PaymentMethod = 'CASH' | 'YAPE' | 'PLIN' | 'CARD';
export type InvoiceType = 'NONE' | 'BOLETA_SIMPLE' | 'FACTURA';
export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'READY'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED';
export type InvoiceEmissionStatus = 'NOT_REQUIRED' | 'PENDING' | 'PROCESSING' | 'ISSUED' | 'FAILED';

export type CreateOrderPayload = {
  branchId: string;
  orderType: OrderType;
  paymentMethod: PaymentMethod;
  invoiceType: InvoiceType;
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
  status: OrderStatus;
  order_type: OrderType;
  payment_method: PaymentMethod;
  invoice_type: InvoiceType;
  created_at: string;
  branch_id?: string;
  branch_name?: string;
};

export type OrderDetail = {
  id: string;
  order_number: string;
  customer_id: string | null;
  guest_email: string | null;
  guest_phone: string | null;
  branch_id: string;
  address_id: string | null;
  order_type: OrderType;
  status: OrderStatus;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  invoice_type: InvoiceType;
  invoice_emission_status: InvoiceEmissionStatus;
  customer_name_snapshot: string;
  customer_phone_snapshot: string | null;
  customer_email_snapshot: string | null;
  customer_document_type_snapshot: string | null;
  customer_document_number_snapshot: string | null;
  customer_address_snapshot: string | null;
  customer_business_name_snapshot: string | null;
  subtotal: string;
  discount_total: string;
  delivery_fee: string;
  total: string;
  notes: string | null;
  delivered_at: string | null;
  created_at: string;
  updated_at: string;
};

export type OrderItemDetail = {
  id: string;
  order_id: string;
  product_id: string | null;
  promotion_id: string | null;
  product_name_snapshot: string;
  product_description_snapshot: string | null;
  unit_of_measure: string;
  quantity: number;
  unit_price_snapshot: string;
  igv_percentage: string;
  discount_amount: string;
  subtotal: string;
  notes: string | null;
  created_at: string;
};

export type OrderHistoryEntry = {
  id: string;
  order_id: string;
  status: OrderStatus;
  changed_by: string | null;
  comment: string | null;
  created_at: string;
};

export type BranchSummary = {
  id: string;
  name: string;
  address: string;
  phone: string | null;
  district: string | null;
  reference: string | null;
  opens_at: string | null;
  closes_at: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type CustomerAddressSummary = {
  id: string;
  user_id: string;
  label: string | null;
  address_line: string;
  district: string | null;
  reference: string | null;
  latitude: string | null;
  longitude: string | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
};

export type ElectronicDocumentDetail = {
  id: string;
  order_id: string;
  document_type: Extract<InvoiceType, 'BOLETA_SIMPLE' | 'FACTURA'>;
  series: string;
  correlative: number;
  external_status: string;
  sunat_status: string | null;
  hash: string | null;
  xml_url: string | null;
  cdr_url: string | null;
  pdf_url: string | null;
  api_response: unknown | null;
  error_message: string | null;
  emitted_at: string | null;
  created_at: string;
  updated_at: string;
};

export type OrderDetailResponse = {
  order: OrderDetail;
  items: OrderItemDetail[];
  history: OrderHistoryEntry[];
  branch: BranchSummary | null;
  address: CustomerAddressSummary | null;
  electronicDocument: ElectronicDocumentDetail | null;
};
