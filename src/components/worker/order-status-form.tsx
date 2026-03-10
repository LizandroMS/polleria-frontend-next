'use client';

import { useState } from 'react';

type Props = {
  currentStatus: string;
  onSubmit: (status: string, comment?: string) => Promise<void>;
};

const statusOptionsByCurrent: Record<string, string[]> = {
  PENDING: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['PREPARING', 'CANCELLED'],
  PREPARING: ['READY', 'CANCELLED'],
  READY: ['OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'],
  OUT_FOR_DELIVERY: ['DELIVERED', 'CANCELLED'],
  DELIVERED: [],
  CANCELLED: [],
};

export function OrderStatusForm({ currentStatus, onSubmit }: Props) {
  const [status, setStatus] = useState('');
  const [comment, setComment] = useState('');

  const options = statusOptionsByCurrent[currentStatus] ?? [];

  if (!options.length) {
    return <p className="text-sm text-gray-500">No hay más cambios permitidos.</p>;
  }

  return (
    <form
      className="space-y-3"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!status) return;
        await onSubmit(status, comment);
        setComment('');
        setStatus('');
      }}
    >
      <select
        className="w-full rounded-xl border px-4 py-3"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        required
      >
        <option value="">Selecciona nuevo estado</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <textarea
        className="w-full rounded-xl border px-4 py-3"
        placeholder="Comentario opcional"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button className="rounded-xl bg-black px-4 py-2 text-white">
        Actualizar estado
      </button>
    </form>
  );
}