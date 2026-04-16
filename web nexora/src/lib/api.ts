// src/lib/api.ts

// Global error type matching the backend's AppError structure
export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // Always attach standard headers
  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  // The proxy in vite automatically forwards `/api` to `localhost:4000/api`
  const url = endpoint.startsWith("/api") ? endpoint : `/api/v1${endpoint}`;

  const response = await fetch(url, { ...options, headers });

  // Handle No Content
  if (response.status === 204) {
    return {} as T;
  }

  const text = await response.text();
  let data: any;
  
  if (text) {
    try {
      data = JSON.parse(text);
    } catch (e) {
      if (!response.ok) {
        throw new Error(text.slice(0, 100) || `HTTP Error ${response.status} - Ensure the backend is running on port 4000.`);
      }
      data = {};
    }
  } else {
    data = {};
  }

  if (!response.ok) {
    // Attempt to parse standard backend error format
    const errorMsg = data?.errors?.[0]?.message || data?.message || `Error ${response.status}: Ensure backend (npm run dev in nexora-backend) is active.`;
    throw new Error(errorMsg);
  }

  // Backend standard success format { success: true, data: { ... } } or just the payload
  return data.data !== undefined ? data.data : data;
}
