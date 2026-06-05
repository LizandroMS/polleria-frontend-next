'use client';

import { useMutation } from '@tanstack/react-query';
import { notify } from '@/shared/lib/notify';
import { forgotPassword } from '../api/forgot-password';

export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => forgotPassword(email),
    onSuccess: () => {
      notify.success('Solicitud enviada satisfactoriamente.', 'Revisa tu correo para continuar con la recuperación.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo enviar la solicitud de recuperación.');
    },
  });
}
