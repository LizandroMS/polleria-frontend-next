'use client';

import { useState } from 'react';

type Props = {
  workers: any[];
  branches: any[];
  onCreateWorker: (payload: any) => Promise<void>;
  onAssign: (payload: any) => Promise<void>;
};

export function WorkerForm({ workers, branches, onCreateWorker, onAssign }: Props) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [workerId, setWorkerId] = useState('');
  const [branchId, setBranchId] = useState('');

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form
        className="grid gap-3 rounded-2xl border bg-white p-5"
        onSubmit={async (e) => {
          e.preventDefault();
          await onCreateWorker({
            firstName,
            email,
            password,
          });
          setFirstName('');
          setEmail('');
          setPassword('');
        }}
      >
        <h3 className="text-lg font-semibold">Nuevo trabajador</h3>

        <input className="rounded-xl border px-4 py-3" placeholder="Nombre" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        <input className="rounded-xl border px-4 py-3" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="rounded-xl border px-4 py-3" placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button className="rounded-xl bg-black px-4 py-3 text-white">Crear trabajador</button>
      </form>

      <form
        className="grid gap-3 rounded-2xl border bg-white p-5"
        onSubmit={async (e) => {
          e.preventDefault();
          await onAssign({ userId: workerId, branchId });
          setWorkerId('');
          setBranchId('');
        }}
      >
        <h3 className="text-lg font-semibold">Asignar sucursal</h3>

        <select className="rounded-xl border px-4 py-3" value={workerId} onChange={(e) => setWorkerId(e.target.value)} required>
          <option value="">Selecciona trabajador</option>
          {workers.map((w) => (
            <option key={w.id} value={w.id}>
              {w.first_name} {w.last_name ?? ''} - {w.email}
            </option>
          ))}
        </select>

        <select className="rounded-xl border px-4 py-3" value={branchId} onChange={(e) => setBranchId(e.target.value)} required>
          <option value="">Selecciona sucursal</option>
          {branches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>

        <button className="rounded-xl bg-black px-4 py-3 text-white">Asignar</button>
      </form>
    </div>
  );
}