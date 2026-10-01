import apiClient from './api.js';
import { API_ENDPOINTS } from '../config/api.js';

export const submitLead = async (leadData) => {
  const response = await apiClient.post(API_ENDPOINTS.LEADS, leadData);
  return response.data;
};

export const getLeads = async (params = {}) => {
  const response = await apiClient.get(API_ENDPOINTS.LEADS, { params });
  return response.data;
};

export const updateLeadStatus = async (id, status) => {
  const response = await apiClient.patch(`${API_ENDPOINTS.LEADS}/${id}/status`, { status });
  return response.data;
};

export const checkHealth = async () => {
  const response = await apiClient.get(API_ENDPOINTS.HEALTH);
  return response.data;
};
