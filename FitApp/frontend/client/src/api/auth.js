import { api } from './client.js';

export const register = (payload) => api.post('/auth/register', payload, { auth: false });
export const login = (payload) => api.post('/auth/login', payload, { auth: false });
