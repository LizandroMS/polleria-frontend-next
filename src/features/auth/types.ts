export type ProjectCode = 'POL' | 'ROP';

export type AuthUser = {
  id: string;
  role: 'ADMIN' | 'WORKER' | 'CUSTOMER';
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
  projectCode?: ProjectCode;
  projectName?: string;
};

export type AuthResponse = {
  user: AuthUser;
  accessToken: string;
};

export type LoginPayload = {
  email: string;
  password: string;
  projectCode?: ProjectCode;
};

export type RegisterPayload = {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  password: string;
  projectCode?: ProjectCode;
};
