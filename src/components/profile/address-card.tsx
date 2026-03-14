'use client';

type Props = {
  address: any;
  onDelete: () => Promise<void>;
  onSetDefault: () => Promise<void>;
};

export function AddressCard({ address, onDelete, onSetDefault }: Props) {
  return (
    <article className="soft-card p-6 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <div
            className="mb-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold"
            style={{ background: '#f9e8db', color: 'var(--primary)' }}
          >
            {address.is_default ? 'Principal' : 'Dirección guardada'}
          </div>

          <h3 className="text-xl font-extrabold" style={{ color: 'var(--dark)' }}>
            {address.label || 'Dirección'}
          </h3>
        </div>
      </div>

      <div className="space-y-2 text-sm" style={{ color: 'var(--text-soft)' }}>
        <p>
          <span className="font-semibold" style={{ color: 'var(--text-main)' }}>
            Dirección:
          </span>{' '}
          {address.address_line}
        </p>

        {address.district ? (
          <p>
            <span className="font-semibold" style={{ color: 'var(--text-main)' }}>
              Distrito:
            </span>{' '}
            {address.district}
          </p>
        ) : null}

        {address.reference ? (
          <p>
            <span className="font-semibold" style={{ color: 'var(--text-main)' }}>
              Referencia:
            </span>{' '}
            {address.reference}
          </p>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {!address.is_default ? (
          <button onClick={onSetDefault} className="btn-primary">
            Hacer principal
          </button>
        ) : null}

        <button onClick={onDelete} className="btn-secondary">
          Eliminar
        </button>
      </div>
    </article>
  );
}