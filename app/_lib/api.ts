import { ENV, getEnvironment, isClient } from "./environment";
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

interface ApiResponse<T> {
  success: boolean;
  data: T | undefined;
  status: number | undefined;
  error: string | undefined;
}

export async function apiRequest<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const env = getEnvironment();
  const base = 
    (env == ENV.production) ?
      process.env.NEXT_PUBLIC_API_BASE_HOST_PROD : 
      (
        isClient() ? 
        process.env.NEXT_PUBLIC_API_BASE_HOST_DEV_ :
        process.env.NEXT_PUBLIC_API_BASE_HOST_DEV
      );
 
  try {
    const response = await axios.request<T>({
      url, 
      baseURL: `${base}`,
      withCredentials: true,
      ...config
    });
    return {
      success: true,
      data: response.data,
      status: response.status,
      error: undefined,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    return {
      success: false,
      data: undefined,
      status: axiosError.status,
      error: axiosError.response?.data
        ? JSON.stringify(axiosError.response?.data)
        : axiosError.message,
    };
  }
}