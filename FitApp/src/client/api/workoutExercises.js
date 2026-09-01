import { api } from './client.js';

export const listForDay = (dayId) => api.get(`/days/${dayId}/exercises`);
export const addToDay = (dayId, payload) => api.post(`/days/${dayId}/exercises`, payload);
export const updateWorkoutExercise = (id, payload) => api.put(`/workout-exercises/${id}`, payload);
export const deleteWorkoutExercise = (id) => api.del(`/workout-exercises/${id}`);
