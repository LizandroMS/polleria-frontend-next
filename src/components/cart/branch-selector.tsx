'use client';

import { usePublicBranches } from '@/features/branches/hooks/use-public-branches';

type Props = {
  selectedBranchId: string | null;
  onSelect: (branchId: string) => void;
};

export function BranchSelector({ selectedBranchId, onSelect }: Props) {
  const { data = [], isLoading } = usePublicBranches();

  if (isLoading) {
    return <div className="loading-panel">Cargando sucursales...</div>;
  }

  return (
    <section className="soft-card space-y-4 p-5">
      <div>
        <p className="section-subtitle">Sucursal</p>
        <h3 className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>
          Elige dónde se atenderá tu pedido
        </h3>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
          Esta selección permite validar disponibilidad y preparar tu pedido correctamente.
        </p>
      </div>

      <select className="input-soft" value={selectedBranchId ?? ''} onChange={(e) => onSelect(e.target.value)}>
        <option value="">Selecciona una sucursal</option>
        {data.map((branch) => (
          <option key={branch.id} value={branch.id}>
            {branch.name} {branch.district ? `- ${branch.district}` : ''}
          </option>
        ))}
      </select>
    </section>
  );
}
