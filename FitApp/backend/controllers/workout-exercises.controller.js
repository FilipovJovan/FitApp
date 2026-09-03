import * as workoutExerciseService from '../services/workout-exercises.service.js';

export const addExerciseToDay = async (req, res) => {
    try {
        const { exerciseId, sets, reps, rest } = req.body;
        const workoutExercise = await workoutExerciseService.addExerciseToDay(
            req.params.dayId, req.user.id, { exerciseId, sets, reps, rest }
        );
        res.status(201).json(workoutExercise);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const getExercisesForDay = async (req, res) => {
    try {
        const exercises = await workoutExerciseService.getExercisesForDay(req.params.dayId, req.user.id);
        res.status(200).json(exercises);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const updateWorkoutExercise = async (req, res) => {
    try {
        const { sets, reps, rest } = req.body;
        const updated = await workoutExerciseService.updateWorkoutExercise(
            req.params.id, req.user.id, { sets, reps, rest }
        );
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const deleteWorkoutExercise = async (req, res) => {
    try {
        await workoutExerciseService.deleteWorkoutExercise(req.params.id, req.user.id);
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}