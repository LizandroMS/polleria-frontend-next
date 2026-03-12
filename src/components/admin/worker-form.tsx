'use client';

import { useEffect, useState } from 'react';

type Props = {
  workers: any[];
  branches: any[];
  initialData?: any | null;
  onCreateWorker: (payload: any) => Promise<void>;
  onUpdateWorker?: (payload: any) => Promise<void>;
  onAssign: (payload: any) => Promise<void>;
  onCancelEdit?: () => void;
};

export function WorkerForm({
  workers,
  branches,
  initialData,
  onCreateWorker,
  onUpdateWorker,
  onAssign,
  onCancelEdit,
}: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [workerId, setWorkerId] = useState('');
  const [branchId, setBranchId] = useState('');

  const isEditing = !!initialData;

  useEffect(() => {
    if (!initialData) {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setPassword('');
      return;
    }

    setFirstName(initialData.first_name ?? '');
    setLastName(initialData.last_name ?? '');
    setEmail(initialData.email ?? '');
    setPhone(initialData.phone ?? '');
    setPassword('');
  }, [initialData]);

  const resetWorkerForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setPassword('');
  };

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <form
        className="soft-card space-y-5 p-6 md:p-7"
        onSubmit={async (e) => {
          e.preventDefault();

          if (isEditing) {
            await onUpdateWorker?.({
              firstName,
              lastName,
              email,
              phone,
              ...(password ? { password } : {}),
            });
            return;
          }

          await onCreateWorker({
            firstName,
            lastName,
            email,
            phone,
            password,
          });

          resetWorkerForm();
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="section-subtitle">Trabajadores</p>
            <h3 className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>
              {isEditing ? 'Editar trabajador' : 'Nuevo trabajador'}
            </h3>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
              {isEditing
                ? 'Actualiza la información del trabajador seleccionado.'
                : 'Registra personal operativo para atención y gestión de pedidos.'}
            </p>
          </div>

          {isEditing ? (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                resetWorkerForm();
                onCancelEdit?.();
              }}
            >
              Cancelar
            </button>
          ) : null}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Nombres</label>
            <input
              className="input-soft"
              placeholder="Nombres"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Apellidos</label>
            <input
              className="input-soft"
              placeholder="Apellidos"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold">Correo</label>
            <input
              className="input-soft"
              placeholder="correo@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Teléfono</label>
            <input
              className="input-soft"
              placeholder="987654321"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">
              {isEditing ? 'Nueva contraseña (opcional)' : 'Contraseña'}
            </label>
            <input
              className="input-soft"
              placeholder="********"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={!isEditing}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button className="btn-primary">
            {isEditing ? 'Actualizar trabajador' : 'Crear trabajador'}
          </button>
        </div>
      </form>

      <form
        className="soft-card space-y-5 p-6 md:p-7"
        onSubmit={async (e) => {
          e.preventDefault();
          await onAssign({ userId: workerId, branchId });
          setWorkerId('');
          setBranchId('');
        }}
      >
        <div>
          <p className="section-subtitle">Asignaciones</p>
          <h3 className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>
            Asignar sucursal
          </h3>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-soft)' }}>
            Relaciona trabajadores con la sucursal donde operarán.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Trabajador</label>
            <select
              className="input-soft"
              value={workerId}
              onChange={(e) => setWorkerId(e.target.value)}
              required
            >
              <option value="">Selecciona trabajador</option>
              {workers.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.first_name} {w.last_name ?? ''} - {w.email}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Sucursal</label>
            <select
              className="input-soft"
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
              required
            >
              <option value="">Selecciona sucursal</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="btn-primary">Asignar sucursal</button>
        </div>
      </form>
    </div>
  );
}