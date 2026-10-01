import apiClient from './api.js';
import { API_ENDPOINTS, STORAGE_KEYS } from '../config/api.js';

export const login = async (username, password) => {
  const response = await apiClient.post(API_ENDPOINTS.AUTH_LOGIN, { username, password });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
};

export const getToken = () => localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);

export const setToken = (token) => localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, token);

export const isAuthenticated = () => Boolean(localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN));
