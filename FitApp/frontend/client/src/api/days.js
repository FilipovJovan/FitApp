import { api } from './client.js';

export const listDays = (weekId) => api.get(`/weeks/${weekId}/days`);
export const getDay = (dayId) => api.get(`/days/${dayId}`);
export const createDay = (weekId, payload) => api.post(`/weeks/${weekId}/days`, payload);
export const deleteDay = (dayId) => api.del(`/days/${dayId}`);
