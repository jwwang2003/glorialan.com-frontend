import { getBaseHostname } from "./environment";

interface ApiResponse<T> {
  success: boolean;
  data: T | undefined;
  status: number | undefined;
  error: string | undefined;
  // You won't have an AxiosResponse, but you could optionally include
  // the raw Fetch response if needed:
  response?: Response;
}

// If you have a separate type for Axios config, you may want to create
// a simpler interface that fits the Fetch options you actually need.
interface FetchRequestConfig {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;            // for JSON body, FormData, etc.
  withCredentials?: boolean; // to mimic axios "withCredentials"
  duplex?: string
}

export async function apiRequest<T>(
  url: string,
  config?: FetchRequestConfig
): Promise<ApiResponse<T>> {
  const base = getBaseHostname();
  const fullUrl = new URL(base, url);
  
  try {
    const response = await fetch(fullUrl, {
      method: config?.method ?? "GET",
      // Merge your custom headers
      headers: {
        // "Content-Type": "application/json",
        ...(config?.headers || {}),
      },
      // Convert body to JSON if present and not already e.g. FormData
      body:
        config?.body && typeof config.body === "object"
          ? JSON.stringify(config.body)
          : (config?.body as BodyInit | null),
      // Mimic axios withCredentials
      credentials: config?.withCredentials ? "include" : "same-origin",
    });

    // Attempt to parse JSON (if the response isn't JSON, this may throw)
    let data: T | undefined;
    try {
      data = await response.json();
    } catch (jsonErr) {
      // If it’s not valid JSON or there was no body, handle gracefully
      data = undefined;
    }

    if (!response.ok) {
      // Non-2xx status codes
      return {
        success: false,
        data: undefined,
        status: response.status,
        error: data ? JSON.stringify(data) : response.statusText,
      };
    }

    // Successful (2xx) response
    return {
      success: true,
      data,
      status: response.status,
      error: undefined,
      response,
    };
  } catch (err) {
    // Network or other fetch-related errors
    return {
      success: false,
      data: undefined,
      status: undefined,
      error: (err as Error).message,
    };
  }
}
