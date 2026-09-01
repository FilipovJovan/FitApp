import { api } from './client.js';

export const listWeeks = (planId) => api.get(`/plans/${planId}/weeks`);
export const createWeek = (planId, payload) => api.post(`/plans/${planId}/weeks`, payload);
export const deleteWeek = (weekId) => api.del(`/weeks/${weekId}`);
