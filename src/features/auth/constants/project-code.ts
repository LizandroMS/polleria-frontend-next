/**
 * Nota para mí:
 * Este código permite que el mismo backend de autenticación distinga desde qué
 * frontend/proyecto se está iniciando sesión.
 * - POL: Pollería actual.
 * - ROP: Tienda de ropa online futura.
 */
export const CURRENT_PROJECT_CODE =
  process.env.NEXT_PUBLIC_PROJECT_CODE?.trim().toUpperCase() || 'POL';
