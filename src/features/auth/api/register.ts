import { CURRENT_PROJECT_CODE } from '../constants/project-code';
import { AuthResponse, RegisterPayload } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: payload.firstName,
      lastName: payload.lastName,
      phone: payload.phone,
      email: payload.email,
      password: payload.password,
      /**
       * Nota para mí:
       * Registro la cuenta dentro del proyecto POL. Si el usuario ya existe
       * en otro proyecto y usa la misma contraseña, el backend puede asociarlo
       * también a pollería sin duplicar el registro en users.
       */
      projectCode: CURRENT_PROJECT_CODE,
    }),
  });

  const json = await response.json();

  if (!response.ok || !json.success) {
    throw new Error(json.message ?? 'No se pudo registrar');
  }

  return json.data;
}
