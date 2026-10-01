export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 30000,
  HEADERS: {
    'Content-Type': 'application/json'
  }
};

export const API_ENDPOINTS = {
  LEADS: '/leads',
  HEALTH: '/health',
  AUTH_LOGIN: '/auth/login'
};

export const STORAGE_KEYS = {
  ADMIN_TOKEN: 'nexmove_admin_token'
};
