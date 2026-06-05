'use client';

import { useEffect, useState } from 'react';

type NotificationType = 'success' | 'error' | 'info' | 'warning' | 'loading';

type Notification = {
  id: string;
  type: NotificationType;
  message: string;
  description?: string;
  autoClose?: boolean;
};

type Listener = (items: Notification[]) => void;

let notifications: Notification[] = [];
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((listener) => listener([...notifications]));
}

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function removeNotification(id?: string) {
  if (!id) {
    notifications = [];
  } else {
    notifications = notifications.filter((item) => item.id !== id);
  }

  emit();
}

function addNotification(
  type: NotificationType,
  message: string,
  options?: { description?: string; autoClose?: boolean; duration?: number },
) {
  const id = createId();

  notifications = [
    ...notifications,
    {
      id,
      type,
      message,
      description: options?.description,
      autoClose: options?.autoClose ?? type !== 'loading',
    },
  ].slice(-5);

  emit();

  if (options?.autoClose ?? type !== 'loading') {
    window.setTimeout(() => removeNotification(id), options?.duration ?? 3500);
  }

  return id;
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;

  if (typeof error === 'string' && error.trim()) return error;

  if (error && typeof error === 'object') {
    const maybeMessage = (error as { message?: unknown; errors?: unknown }).message;
    const maybeErrors = (error as { message?: unknown; errors?: unknown }).errors;

    if (typeof maybeMessage === 'string' && maybeMessage.trim()) return maybeMessage;
    if (typeof maybeErrors === 'string' && maybeErrors.trim()) return maybeErrors;
  }

  return fallback;
}

/**
 * Nota para mí:
 * Este helper centraliza los mensajes de confirmación del sistema.
 * Lo uso en hooks, formularios y acciones para que el usuario siempre sepa
 * si un proceso terminó correctamente o si ocurrió un error.
 */
export const notify = {
  success(message = 'Se realizó la acción satisfactoriamente.', description?: string) {
    return addNotification('success', message, { description });
  },

  error(error: unknown, fallback = 'Ocurrió un error inesperado.') {
    return addNotification('error', getErrorMessage(error, fallback));
  },

  info(message: string, description?: string) {
    return addNotification('info', message, { description });
  },

  warning(message: string, description?: string) {
    return addNotification('warning', message, { description });
  },

  loading(message = 'Procesando solicitud...') {
    return addNotification('loading', message, { autoClose: false });
  },

  dismiss(id?: string) {
    removeNotification(id);
  },
};

const styles: Record<NotificationType, string> = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  error: 'border-red-200 bg-red-50 text-red-900',
  info: 'border-blue-200 bg-blue-50 text-blue-900',
  warning: 'border-amber-200 bg-amber-50 text-amber-900',
  loading: 'border-gray-200 bg-white text-gray-900',
};

const icons: Record<NotificationType, string> = {
  success: '✓',
  error: '!',
  info: 'i',
  warning: '!',
  loading: '…',
};

export function NotificationToaster() {
  const [items, setItems] = useState<Notification[]>([]);

  useEffect(() => {
    const listener: Listener = (nextItems) => setItems(nextItems);
    listeners.add(listener);
    listener(notifications);

    return () => {
      listeners.delete(listener);
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="fixed right-4 top-4 z-[9999] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-6">
      {items.map((item) => (
        <div
          key={item.id}
          className={`rounded-2xl border p-4 shadow-xl shadow-black/10 backdrop-blur ${styles[item.type]}`}
          role="status"
          aria-live="polite"
        >
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/80 text-sm font-black">
              {item.type === 'loading' ? (
                <span className="inline-block animate-pulse">{icons[item.type]}</span>
              ) : (
                icons[item.type]
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold leading-5">{item.message}</p>
              {item.description ? (
                <p className="mt-1 text-xs leading-5 opacity-80">{item.description}</p>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => removeNotification(item.id)}
              className="rounded-full px-2 text-sm font-black opacity-60 transition hover:bg-white/70 hover:opacity-100"
              aria-label="Cerrar notificación"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
