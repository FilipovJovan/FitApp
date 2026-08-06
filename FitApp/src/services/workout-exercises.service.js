import {v4 as uuidv4} from 'uuid';
import * as workoutExerciseRepo from '../db/workout-exercises.repo.js';
import * as dayRepo from '../db/day.repo.js';
import * as exerciseRepo from '../db/exercise.repo.js';

export const addExerciseToDay = async (dayId, userId, {exerciseId, sets, reps, rest}) => {
    const day = await dayRepo.findByIdAndUserId(dayId, userId);
    if (!day) {
        throw new Error("Day not found");
    }

    const exercise = await exerciseRepo.findById(exerciseId);
    if (!exercise) {
        throw new Error("Exercises not found");
    }

    return workoutExerciseRepo.createWorkoutExercise({
        id: uuidv4(), dayId, exerciseId, sets, reps,
    });
}

export const getExercisesForDay = async (id, userId, {sets, reps, rest}) => {
    const workoutExercises = await workoutExerciseRepo.findByIdAndUserId(id, userId);
    if (!workoutExercises) {
        throw new Error("Workout exercises not found");
    }
    return workoutExerciseRepo.updateWorkoutExercise(id, {sets, reps, rest});
}

export const deleteWorkoutExercise = async (id, userId, {sets, reps, rest}) => {
    const workoutExercise = await workoutExerciseRepo.findByIdAndUserId(id, userId);
    if (!workoutExercise) {
        throw new Error("Workout exercises not found");
    }
    return workoutExerciseRepo.updateWorkoutExercise(id, {sets, reps, rest});
}

export const deleteWorkoutExercise = async (id, userId) => {
    const workoutExercise = await workoutExerciseRepo.findByIdAndUserId(id, userId);
    if (!workoutExercise) {
        throw new Error("Workout exercises not found");
    }
    await workoutExerciseRepo.deleteWorkoutExercise(id);
}