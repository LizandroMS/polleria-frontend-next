export type AuthUser = {
  id: string;
  role: 'ADMIN' | 'WORKER' | 'CUSTOMER';
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
};

export type AuthResponse = {
  user: AuthUser;
  accessToken: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  password: string;
};