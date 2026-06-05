'use client';

import { useMutation } from '@tanstack/react-query';
import { notify } from '@/shared/lib/notify';
import { resetPassword } from '../api/reset-password';

export function useResetPassword() {
  return useMutation({
    mutationFn: (payload: { token: string; password: string }) => resetPassword(payload),
    onSuccess: () => {
      notify.success('Contraseña actualizada satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo actualizar la contraseña.');
    },
  });
}
