import { api } from './client.js';

export const listExercises = (params = {}) => {
    const qs = new URLSearchParams(
        Object.fromEntries(Object.entries(params).filter(([, v]) => v))
    ).toString();
    return api.get(`/exercises${qs ? `?${qs}` : ''}`);
};
export const getExercise = (id) => api.get(`/exercises/${id}`);
