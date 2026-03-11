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
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      <PageHeader title="Mis direcciones" description="Gestiona tus direcciones de entrega." />

      <AddressForm onSubmit={async (payload) => { await createMutation.mutateAsync(payload); }} />

      {isLoading ? (
        <div>Cargando direcciones...</div>
      ) : !data.length ? (
        <EmptyState title="Aún no tienes direcciones registradas" />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {data.map((address: any) => (
            <AddressCard
              key={address.id}
              address={address}
              onDelete={async () => { await deleteMutation.mutateAsync(address.id); }}
              onSetDefault={async () => { setDefaultMutation.mutateAsync(address.id); }}
            />
          ))}
        </div>
      )}
    </div>
  );
}