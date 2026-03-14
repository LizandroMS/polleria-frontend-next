'use client';

import { AddressCard } from '@/components/profile/address-card';
import { AddressForm } from '@/components/profile/address-form';
import { EmptyState } from '@/components/shared/empty-state';
import { PageHeader } from '@/components/shared/page-header';
import { useCreateAddress } from '@/features/customer-addresses/hooks/use-create-address';
import { useDeleteAddress } from '@/features/customer-addresses/hooks/use-delete-address';
import { useMyAddresses } from '@/features/customer-addresses/hooks/use-my-addresses';
import { useSetDefaultAddress } from '@/features/customer-addresses/hooks/use-set-default-address';
import { useAuth } from '@/hooks/use-auth';

export default function MyAddressesPage() {
  const { token } = useAuth();

  const { data = [], isLoading } = useMyAddresses(token);
  const createMutation = useCreateAddress(token);
  const deleteMutation = useDeleteAddress(token);
  const setDefaultMutation = useSetDefaultAddress(token);

  return (
    <div className="space-y-8">
      <section
        className="rounded-[32px] px-6 py-10 md:px-10"
        style={{
          background: 'linear-gradient(135deg, #f7ede3 0%, #fff7ef 100%)',
          border: '1px solid var(--border-soft)',
        }}
      >
        <PageHeader
          title="Mis direcciones"
          description="Administra tus direcciones de entrega para realizar pedidos más rápido."
        />
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="soft-card p-5">
          <p className="text-sm font-medium" style={{ color: 'var(--text-soft)' }}>
            Direcciones guardadas
          </p>
          <p className="mt-2 text-3xl font-extrabold" style={{ color: 'var(--dark)' }}>
            {data.length}
          </p>
        </div>

        <div className="soft-card p-5">
          <p className="text-sm font-medium" style={{ color: 'var(--text-soft)' }}>
            Dirección principal
          </p>
          <p className="mt-2 text-lg font-bold" style={{ color: 'var(--dark)' }}>
            {data.find((item: any) => item.is_default)?.label || 'No definida'}
          </p>
        </div>

        <div className="soft-card p-5">
          <p className="text-sm font-medium" style={{ color: 'var(--text-soft)' }}>
            Entrega
          </p>
          <p className="mt-2 text-lg font-bold" style={{ color: 'var(--dark)' }}>
            Más rápida
          </p>
        </div>
      </section>

      <section className="soft-card p-6">
        <div className="mb-5">
          <p className="section-subtitle">Nueva dirección</p>
          <h2 className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>
            Agregar dirección
          </h2>
        </div>

        <AddressForm onSubmit={async (payload) => { await createMutation.mutateAsync(payload); }} />
      </section>

      <section className="space-y-5">
        <div>
          <p className="section-subtitle">Direcciones</p>
          <h2 className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>
            Mis ubicaciones guardadas
          </h2>
        </div>

        {isLoading ? (
          <div className="soft-card p-8 text-sm" style={{ color: 'var(--text-soft)' }}>
            Cargando direcciones...
          </div>
        ) : !data.length ? (
          <EmptyState title="Aún no tienes direcciones registradas" />
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {data.map((address: any) => (
              <AddressCard
                key={address.id}
                address={address}
                onDelete={async () => { await deleteMutation.mutateAsync(address.id); }}
                onSetDefault={async () => { await setDefaultMutation.mutateAsync(address.id); }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}