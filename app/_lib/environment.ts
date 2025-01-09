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