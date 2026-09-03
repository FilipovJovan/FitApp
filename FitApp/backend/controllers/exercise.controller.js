import * as exerciseService from '../services/exercise.service.js';

export const getAllExercises = async (req, res) => {
    try {
        const { muscleGroup, search } = req.query;
        const exercises = await exerciseService.listExercises({ muscleGroup, search });
        res.status(200).json(exercises);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const getExercise = async (req, res) => {
    try {
        const exercise = await exerciseService.getExercise(req.params.id);
        res.status(200).json(exercise);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}