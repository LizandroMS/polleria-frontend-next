'use client';

import { useMutation } from '@tanstack/react-query';
import { notify } from '@/shared/lib/notify';
import { login } from '../api/login';

export function useLogin() {
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      notify.success('Inicio de sesión satisfactorio.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo iniciar sesión. Verifica tus credenciales.');
    },
  });
}
