'use client';

import { useEffect, useMemo, useState } from 'react';

type Props = {
  branches: any[];
  initialData?: any | null;
  onSubmit: (payload: any) => Promise<void>;
  onCancelEdit?: () => void;
};

export function DocumentSeriesForm({
  branches,
  initialData,
  onSubmit,
  onCancelEdit,
}: Props) {
  const [branchId, setBranchId] = useState('');
  const [documentType, setDocumentType] = useState<'BOLETA_SIMPLE' | 'FACTURA'>('BOLETA_SIMPLE');
  const [series, setSeries] = useState('B001');
  const [currentNumber, setCurrentNumber] = useState('0');
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isEditing = !!initialData;

  const activeBranches = useMemo(
    () => branches.filter((branch) => branch.is_active),
    [branches],
  );

  useEffect(() => {
    if (!initialData) {
      setBranchId('');
      setDocumentType('BOLETA_SIMPLE');
      setSeries('B001');
      setCurrentNumber('0');
      setIsActive(true);
      setError(null);
      return;
    }

    setBranchId(initialData.branch_id ?? '');
    setDocumentType(initialData.document_type ?? 'BOLETA_SIMPLE');
    setSeries(initialData.series ?? 'B001');
    setCurrentNumber(String(initialData.current_number ?? 0));
    setIsActive(Boolean(initialData.is_active));
    setError(null);
  }, [initialData]);

  const resetForm = () => {
    setBranchId('');
    setDocumentType('BOLETA_SIMPLE');
    setSeries('B001');
    setCurrentNumber('0');
    setIsActive(true);
    setError(null);
  };

  const handleDocumentTypeChange = (value: 'BOLETA_SIMPLE' | 'FACTURA') => {
    setDocumentType(value);

    if (!isEditing) {
      setSeries(value === 'FACTURA' ? 'F001' : 'B001');
    }
  };

  return (
    <form
      className="soft-card space-y-5 p-6 md:p-7"
      onSubmit={async (event) => {
        event.preventDefault();
        setError(null);

        const parsedCurrentNumber = Number(currentNumber);

        if (!Number.isInteger(parsedCurrentNumber) || parsedCurrentNumber < 0) {
          setError('El correlativo actual debe ser un número entero mayor o igual a cero.');
          return;
        }

        try {
          await onSubmit({
            branchId,
            documentType,
            series: series.trim().toUpperCase(),
            currentNumber: parsedCurrentNumber,
            isActive,
          });

          if (!isEditing) {
            resetForm();
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'No se pudo guardar la serie.');
        }
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="section-subtitle">Facturación electrónica</p>
          <h3 className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>
            {isEditing ? 'Editar serie de comprobante' : 'Nueva serie de comprobante'}
          </h3>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
            {/* Nota para mí: esta configuración habilita la emisión de boletas/facturas por sucursal. */}
            Configura la serie activa que usará el backend cuando el pedido pase a entregado.
          </p>
        </div>

        {isEditing ? (
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              resetForm();
              onCancelEdit?.();
            }}
          >
            Cancelar
          </button>
        ) : null}
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold">Sucursal</label>
          <select
            className="input-soft"
            value={branchId}
            onChange={(event) => setBranchId(event.target.value)}
            required
          >
            <option value="">Selecciona una sucursal</option>
            {(isEditing ? branches : activeBranches).map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name} {branch.district ? `- ${branch.district}` : ''}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Tipo de comprobante</label>
          <select
            className="input-soft"
            value={documentType}
            onChange={(event) =>
              handleDocumentTypeChange(event.target.value as 'BOLETA_SIMPLE' | 'FACTURA')
            }
            required
          >
            <option value="BOLETA_SIMPLE">Boleta simple</option>
            <option value="FACTURA">Factura</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Serie</label>
          <input
            className="input-soft uppercase"
            placeholder="B001 / F001"
            value={series}
            onChange={(event) => setSeries(event.target.value)}
            required
            maxLength={8}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Correlativo actual</label>
          <input
            className="input-soft"
            type="number"
            min={0}
            step={1}
            value={currentNumber}
            onChange={(event) => setCurrentNumber(event.target.value)}
            required
          />
          <p className="text-xs" style={{ color: 'var(--text-soft)' }}>
            Si colocas 0, el siguiente comprobante será 1.
          </p>
        </div>

        <label className="flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold" style={{ borderColor: 'var(--border-soft)' }}>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(event) => setIsActive(event.target.checked)}
          />
          Serie activa
        </label>
      </div>

      <div className="flex justify-end">
        <button className="btn-primary" disabled={!branches.length}>
          {isEditing ? 'Actualizar serie' : 'Guardar serie'}
        </button>
      </div>
    </form>
  );
}
