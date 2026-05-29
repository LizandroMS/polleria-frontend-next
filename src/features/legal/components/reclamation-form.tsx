'use client';

import { useState } from 'react';
import { usePublicBranches } from '@/features/branches/hooks/use-public-branches';
import { createReclamation } from '../api/create-reclamation';
import {
  CreateReclamationPayload,
  Reclamation,
  ReclamationClaimType,
  ReclamationDocumentType,
  ReclamationGoodType,
} from '../types';
import { downloadReclamationPdf } from '../utils/reclamation-pdf';

const initialForm: CreateReclamationPayload = {
  consumerFullName: '',
  consumerDocumentType: 'DNI',
  consumerDocumentNumber: '',
  consumerEmail: '',
  consumerPhone: '',
  consumerAddress: '',
  isMinor: false,
  guardianFullName: '',
  guardianDocumentNumber: '',
  branchId: '',
  orderNumber: '',
  goodType: 'PRODUCT',
  amount: undefined,
  description: '',
  claimType: 'RECLAMO',
  detail: '',
  requestedSolution: '',
  consumerAcceptsTerms: false,
};

export function ReclamationForm() {
  const { data: branches = [], isLoading: branchesLoading } = usePublicBranches();
  const [form, setForm] = useState<CreateReclamationPayload>(initialForm);
  const [createdReclamation, setCreatedReclamation] = useState<Reclamation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateField = <K extends keyof CreateReclamationPayload>(
    field: K,
    value: CreateReclamationPayload[K],
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const payload: CreateReclamationPayload = {
        ...form,
        branchId: form.branchId || undefined,
        orderNumber: form.orderNumber?.trim() || undefined,
        consumerPhone: form.consumerPhone?.trim() || undefined,
        consumerAddress: form.consumerAddress?.trim() || undefined,
        guardianFullName: form.isMinor ? form.guardianFullName?.trim() : undefined,
        guardianDocumentNumber: form.isMinor ? form.guardianDocumentNumber?.trim() : undefined,
        amount: form.amount !== undefined && !Number.isNaN(form.amount) ? form.amount : undefined,
      };

      const reclamation = await createReclamation(payload);

      setCreatedReclamation(reclamation);
      downloadReclamationPdf(reclamation);
      setForm(initialForm);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'No se pudo registrar la reclamación. Intenta nuevamente.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-[32px] border bg-white p-6 shadow-sm md:p-8"
        style={{ borderColor: 'var(--border-soft)' }}
      >
        <section className="space-y-4">
          <div>
            <p className="section-subtitle">Paso 1</p>
            <h2 className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>
              Identificación del consumidor
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold">Nombres y apellidos</label>
              <input
                className="input-soft"
                value={form.consumerFullName}
                onChange={(event) => updateField('consumerFullName', event.target.value)}
                placeholder="Ejemplo: Juan Pérez Ramos"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Tipo de documento</label>
              <select
                className="input-soft"
                value={form.consumerDocumentType}
                onChange={(event) =>
                  updateField('consumerDocumentType', event.target.value as ReclamationDocumentType)
                }
                required
              >
                <option value="DNI">DNI</option>
                <option value="CE">Carné de extranjería</option>
                <option value="PASSPORT">Pasaporte</option>
                <option value="RUC">RUC</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Número de documento</label>
              <input
                className="input-soft"
                value={form.consumerDocumentNumber}
                onChange={(event) => updateField('consumerDocumentNumber', event.target.value)}
                placeholder="Número de documento"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Correo electrónico</label>
              <input
                className="input-soft"
                type="email"
                value={form.consumerEmail}
                onChange={(event) => updateField('consumerEmail', event.target.value)}
                placeholder="correo@ejemplo.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Teléfono</label>
              <input
                className="input-soft"
                value={form.consumerPhone ?? ''}
                onChange={(event) => updateField('consumerPhone', event.target.value)}
                placeholder="999999999"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold">Dirección</label>
              <textarea
                className="input-soft min-h-[90px]"
                value={form.consumerAddress ?? ''}
                onChange={(event) => updateField('consumerAddress', event.target.value)}
                placeholder="Dirección del consumidor"
              />
            </div>
          </div>

          <label className="flex items-start gap-3 rounded-2xl border p-4 text-sm" style={{ borderColor: 'var(--border-soft)' }}>
            <input
              type="checkbox"
              className="mt-1"
              checked={form.isMinor ?? false}
              onChange={(event) => updateField('isMinor', event.target.checked)}
            />
            <span>El consumidor es menor de edad y será representado por un apoderado.</span>
          </label>

          {form.isMinor ? (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Nombre del apoderado</label>
                <input
                  className="input-soft"
                  value={form.guardianFullName ?? ''}
                  onChange={(event) => updateField('guardianFullName', event.target.value)}
                  required={form.isMinor}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Documento del apoderado</label>
                <input
                  className="input-soft"
                  value={form.guardianDocumentNumber ?? ''}
                  onChange={(event) => updateField('guardianDocumentNumber', event.target.value)}
                  required={form.isMinor}
                />
              </div>
            </div>
          ) : null}
        </section>

        <section className="space-y-4 border-t pt-6" style={{ borderColor: 'var(--border-soft)' }}>
          <div>
            <p className="section-subtitle">Paso 2</p>
            <h2 className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>
              Datos del producto o servicio
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Sucursal relacionada</label>
              <select
                className="input-soft"
                value={form.branchId ?? ''}
                onChange={(event) => updateField('branchId', event.target.value)}
                disabled={branchesLoading}
              >
                <option value="">No indicar sucursal</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Número de pedido</label>
              <input
                className="input-soft"
                value={form.orderNumber ?? ''}
                onChange={(event) => updateField('orderNumber', event.target.value)}
                placeholder="Ejemplo: ORD-20260529-123456"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Tipo de bien</label>
              <select
                className="input-soft"
                value={form.goodType}
                onChange={(event) => updateField('goodType', event.target.value as ReclamationGoodType)}
                required
              >
                <option value="PRODUCT">Producto</option>
                <option value="SERVICE">Servicio</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Monto reclamado</label>
              <input
                className="input-soft"
                type="number"
                min="0"
                step="0.01"
                value={form.amount ?? ''}
                onChange={(event) =>
                  updateField(
                    'amount',
                    event.target.value ? Number(event.target.value) : undefined,
                  )
                }
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold">Descripción del producto o servicio</label>
              <textarea
                className="input-soft min-h-[100px]"
                value={form.description}
                onChange={(event) => updateField('description', event.target.value)}
                placeholder="Describe el producto, servicio, promoción o pedido relacionado."
                required
              />
            </div>
          </div>
        </section>

        <section className="space-y-4 border-t pt-6" style={{ borderColor: 'var(--border-soft)' }}>
          <div>
            <p className="section-subtitle">Paso 3</p>
            <h2 className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>
              Detalle del reclamo o queja
            </h2>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Tipo de solicitud</label>
              <select
                className="input-soft"
                value={form.claimType}
                onChange={(event) => updateField('claimType', event.target.value as ReclamationClaimType)}
                required
              >
                <option value="RECLAMO">Reclamo: disconformidad relacionada al producto o servicio</option>
                <option value="QUEJA">Queja: malestar por la atención o trato recibido</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Detalle</label>
              <textarea
                className="input-soft min-h-[130px]"
                value={form.detail}
                onChange={(event) => updateField('detail', event.target.value)}
                placeholder="Cuéntanos qué ocurrió."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Pedido del consumidor</label>
              <textarea
                className="input-soft min-h-[110px]"
                value={form.requestedSolution}
                onChange={(event) => updateField('requestedSolution', event.target.value)}
                placeholder="Indica qué solución solicitas."
                required
              />
            </div>
          </div>
        </section>

        <section className="space-y-4 border-t pt-6" style={{ borderColor: 'var(--border-soft)' }}>
          <label className="flex items-start gap-3 rounded-2xl border p-4 text-sm" style={{ borderColor: 'var(--border-soft)' }}>
            <input
              type="checkbox"
              className="mt-1"
              checked={form.consumerAcceptsTerms}
              onChange={(event) => updateField('consumerAcceptsTerms', event.target.checked)}
              required
            />
            <span>
              Declaro que la información registrada es verdadera y acepto que la pollería
              atienda mi solicitud mediante los datos de contacto proporcionados.
            </span>
          </label>

          {errorMessage ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {errorMessage}
            </div>
          ) : null}

          {createdReclamation ? (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
              Reclamo registrado correctamente con código{' '}
              <strong>{createdReclamation.claim_code}</strong>. La constancia PDF se descargó
              automáticamente.
            </div>
          ) : null}

          <button
            type="submit"
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registrando...' : 'Enviar reclamación y descargar PDF'}
          </button>
        </section>
      </form>

      <aside className="h-fit rounded-[32px] border bg-white p-6 shadow-sm" style={{ borderColor: 'var(--border-soft)' }}>
        <p className="section-subtitle">Importante</p>
        <h3 className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--dark)' }}>
          Antes de enviar
        </h3>
        <div className="mt-4 space-y-4 text-sm leading-7" style={{ color: 'var(--text-soft)' }}>
          <p>
            El reclamo se registra en el sistema y se genera una constancia en PDF para que
            puedas guardarla.
          </p>
          <p>
            Un <strong>reclamo</strong> está relacionado con el producto o servicio contratado.
            Una <strong>queja</strong> está relacionada con la atención, trato o experiencia.
          </p>
          <p>
            Conserva el código generado para consultar internamente el seguimiento de tu caso.
          </p>
        </div>
      </aside>
    </div>
  );
}
