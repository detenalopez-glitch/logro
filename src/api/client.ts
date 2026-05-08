export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export async function fetchClient<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { headers, ...customConfig } = options;

  const config: RequestInit = {
    ...customConfig,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        response.status,
        errorData.error || errorData.message || 'Error en la petición a la API'
      );
    }
    
    // Para endpoints como DELETE que devuelven 200 pero quiza texto o un simple message
    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    const newError = new Error(error instanceof Error ? error.message : 'Error desconocido de red');
    newError.cause = error;
    throw newError;
  }
}
