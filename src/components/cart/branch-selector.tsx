'use client';

import { usePublicBranches } from '@/features/branches/hooks/use-public-branches';

type Props = {
  selectedBranchId: string | null;
  onSelect: (branchId: string) => void;
};

export function BranchSelector({ selectedBranchId, onSelect }: Props) {
  const { data = [], isLoading } = usePublicBranches();

  if (isLoading) {
    return <div>Cargando sucursales...</div>;
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Sucursal</label>
      <select
        className="w-full rounded-xl border bg-white px-4 py-3"
        value={selectedBranchId ?? ''}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">Selecciona una sucursal</option>
        {data.map((branch) => (
          <option key={branch.id} value={branch.id}>
            {branch.name} {branch.district ? `- ${branch.district}` : ''}
          </option>
        ))}
      </select>
    </div>
  );
}