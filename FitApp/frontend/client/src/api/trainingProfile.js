import { api } from './client.js';

export const getProfile = () => api.get('/training-profile');
export const upsertProfile = (payload) => api.put('/training-profile', payload);
