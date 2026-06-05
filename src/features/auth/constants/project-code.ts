import type { ProjectCode } from '../types';

const DEFAULT_PROJECT_CODE: ProjectCode = 'POL';

function normalizeProjectCode(value?: string): ProjectCode {
  const normalized = value?.trim().toUpperCase();

  if (normalized === 'POL' || normalized === 'ROP') {
    return normalized;
  }

  return DEFAULT_PROJECT_CODE;
}

/**
 * Nota para mí:
 * Este frontend pertenece al proyecto Pollería, por eso debe enviar POL
 * en login/registro. Mantengo la variable de entorno para despliegues,
 * pero si viene vacía o con un valor inválido se usa POL para no romper producción.
 */
export const CURRENT_PROJECT_CODE: ProjectCode = normalizeProjectCode(
  process.env.NEXT_PUBLIC_PROJECT_CODE,
);

/**
 * Nota para mí:
 * Valido que la sesión cargada desde localStorage pertenezca al proyecto actual.
 * Si en el futuro se usa el mismo navegador para ropa y pollería, esto evita
 * que un token de otro frontend quede activo por error en la pollería.
 */
export function belongsToCurrentProject(projectCode?: string | null): boolean {
  if (!projectCode) return true;

  return normalizeProjectCode(projectCode) === CURRENT_PROJECT_CODE;
}
