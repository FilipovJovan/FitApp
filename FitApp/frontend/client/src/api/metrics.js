import { api } from './client.js';

export const createMetric = (payload) => api.post('/metrics', payload);
export const getHistory = () => api.get('/metrics');
export const getLatest = () => api.get('/metrics/latest');
