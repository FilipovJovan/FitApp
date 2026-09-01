import { api } from './client.js';

export const getMe = () => api.get('/users/me');
export const updateMe = (payload) => api.put('/users/me', payload);
export const updateEmail = (email) => api.put('/users/me/email', { email });
export const updatePassword = (currentPassword, newPassword) =>
    api.put('/users/me/password', { currentPassword, newPassword });
