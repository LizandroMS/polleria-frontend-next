'use client';

import { SimpleAdminTable } from '@/components/admin/simple-admin-table';
import { getAdminOrders } from '@/features/admin/api/get-admin-orders';
import { useAuth } from '@/hooks/use-auth';
import { useRealtimeAdminOrders } from '@/hooks/use-realtime-admin-orders';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function AdminOrdersPage() {
  const { token } = useAuth();
  const [status, setStatus] = useState('');

  const { data = [], isLoading } = useQuery({
    queryKey: ['admin-orders', status],
    queryFn: () => getAdminOrders(token as string, status || undefined),
    enabled: !!token,
  });

  useRealtimeAdminOrders();

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-white p-4">
        <select
          className="rounded-xl border px-4 py-3"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="PENDING">PENDING</option>
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="PREPARING">PREPARING</option>
          <option value="READY">READY</option>
          <option value="OUT_FOR_DELIVERY">OUT_FOR_DELIVERY</option>
          <option value="DELIVERED">DELIVERED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      </div>

      {isLoading ? (
        <div>Cargando pedidos...</div>
      ) : (
        <SimpleAdminTable
          rows={data}
          columns={[
            { key: 'order', title: 'Pedido', render: (row: any) => row.order_number },
            { key: 'client', title: 'Cliente', render: (row: any) => row.customer_name_snapshot },
            { key: 'branch', title: 'Sucursal', render: (row: any) => row.branch_name },
            { key: 'status', title: 'Estado', render: (row: any) => row.status },
            { key: 'total', title: 'Total', render: (row: any) => `S/ ${row.total}` },
          ]}
        />
      )}
    </div>
  );
}