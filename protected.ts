export const PROTECTED_ROUTES = {
  '/admin': [0],                    // Only admin
  '/dashboard': [0, 1],        // Admin or user
  '/profile': [0, 1],           // Admin or user
  // any other route patterns or nested paths
  '/settings': [0, 1],
};