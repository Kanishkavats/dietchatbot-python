// Base API version
export const API_VERSION = "/api/V1";

// Helper to build module paths
export const makeApiPath = (module: string) => `${API_VERSION}/${module}`;
