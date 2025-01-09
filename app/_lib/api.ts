import { ENV, getEnvironment } from "./environment";
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}

export async function apiRequest<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const env = getEnvironment();
  const base = 
    (env == ENV.production) ?
      process.env.NEXT_PUBLIC_API_BASE_HOST_PROD : 
      process.env.NEXT_PUBLIC_API_BASE_HOST_DEV; 
 
  try {
    const response = await axios.request<T>({ url, baseURL: `http://${base}`,  ...config });
    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    return {
      success: false,
      data: null,
      error: axiosError.response?.data
        ? JSON.stringify(axiosError.response?.data)
        : axiosError.message,
    };
  }
}