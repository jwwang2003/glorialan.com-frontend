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

export function getAPIBaseHostname(): string {
  const prod_mode = process.env.NEXT_PUBLIC_API_BASE_HOST_PROD || "";
  const dev_mode = (isClient()
    ? process.env.NEXT_PUBLIC_API_BASE_HOST_DEV_
    : process.env.NEXT_PUBLIC_API_BASE_HOST_DEV) || "";
  
  return (getEnvironment() === ENV.production ? prod_mode : dev_mode);
}

export function getBaseHostname(): string {
  const prod = process.env.NEXT_PUBLIC_HOST_PROD || "";
  const dev = process.env.NEXT_PUBLIC_HOST_DEV || "";
  return (getEnvironment() === ENV.production ? prod : dev);
}