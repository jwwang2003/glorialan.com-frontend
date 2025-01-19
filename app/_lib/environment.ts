export enum ENV {
  development,
  production,
  test
}

export function getEnvironment() {
  switch (process.env.NODE_ENV) {
    case "development":
      return ENV.development;
    case "production":
      return ENV.production;
    case "test":
      return ENV.test;
    default:
      return undefined;
  }
}

export function isClient(): boolean {
  return typeof window !== 'undefined';
}

/**
 * A general function for returning the corect API URL for frontend & backend API requests
 * depending on the current environemnt (production or development) and whether the client
 * or server called this function (determined by `isClient()`).
 * 
 * NOTE: This is not the main URL (glorialan.com), the API is api.glorialan.com,
 * do not mistake this function for `getBaseHostname()`.
 * @returns A string containing the appropriate API URL. If the environment variable is not
 * defined, returns an empty string.
 */
export function getAPIBaseHostname(): string {
  const prod_mode = process.env.NEXT_PUBLIC_API_BASE_URL_PROD || "";
  
  // Because 
  const dev_mode = (isClient()
    ? process.env.NEXT_PUBLIC_API_BASE_URL_DEV_
    : process.env.NEXT_PUBLIC_API_BASE_URL_DEV) || "";
  
  return (getEnvironment() === ENV.production ? prod_mode : dev_mode);
}

/**
 * This function was meant for redirects. It determines the correct URL for production and
 * development environments. In the production environment, we want the redirect to be our
 * domain name, but in the development environment it is `localhost`.
 * @returns A string containing the appropriate base URL. If the environment variable is not
 * defined, returns an empty string.
 */
export function getBaseHostname(): string {
  const prod = process.env.NEXT_PUBLIC_BASE_URL_PROD || "";
  const dev = process.env.NEXT_PUBLIC_BASE_URL_DEV || "";
  return (getEnvironment() === ENV.production ? prod : dev);
}