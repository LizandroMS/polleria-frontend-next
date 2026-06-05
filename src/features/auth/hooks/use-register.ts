'use client';

import { useMutation } from '@tanstack/react-query';
import { notify } from '@/shared/lib/notify';
import { register } from '../api/register';

export function useRegister() {
  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      notify.success('Registro completado satisfactoriamente.');
    },
    onError: (error) => {
      notify.error(error, 'No se pudo completar el registro.');
    },
  });
}
