const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

async function readJsonResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const text = await response.text();

  try {
    return JSON.parse(text) as ApiResponse<T>;
  } catch {
    throw new Error(response.ok ? 'No se pudo leer la respuesta del servidor' : `Error HTTP ${response.status}`);
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const json = await readJsonResponse<T>(response);

  if (!response.ok || !json.success) {
    throw new Error(json.message ?? `Error HTTP ${response.status}`);
  }

  return json.data;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const json = await readJsonResponse<T>(response);

  if (!response.ok || !json.success) {
    throw new Error(json.message ?? `Error HTTP ${response.status}`);
  }

  return json.data;
}
