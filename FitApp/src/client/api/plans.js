import { api } from './client.js';

export const listPlans = () => api.get('/plans');
export const getPlan = (id) => api.get(`/plans/${id}`);
export const createPlan = (payload) => api.post('/plans', payload);
export const updatePlan = (id, payload) => api.put(`/plans/${id}`, payload);
export const deletePlan = (id) => api.del(`/plans/${id}`);
