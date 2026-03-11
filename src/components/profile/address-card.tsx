'use client';

type Props = {
  address: any;
  onDelete: () => Promise<void>;
  onSetDefault: () => Promise<void>;
};

export function AddressCard({ address, onDelete, onSetDefault }: Props) {
  return (
    <article className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">
            {address.label || 'Dirección'}
            {address.is_default ? ' · Principal' : ''}
          </h3>
          <p className="mt-2 text-sm text-gray-700">{address.address_line}</p>
          {address.district ? <p className="text-sm text-gray-600">{address.district}</p> : null}
          {address.reference ? <p className="text-sm text-gray-600">{address.reference}</p> : null}
        </div>

        <div className="flex gap-2">
          {!address.is_default ? (
            <button onClick={onSetDefault} className="rounded-xl border px-3 py-2 text-xs">
              Hacer principal
            </button>
          ) : null}

          <button onClick={onDelete} className="rounded-xl border px-3 py-2 text-xs">
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}