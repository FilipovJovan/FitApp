import * as exerciseRepo from '../db/exercise.repo.js';

export const listExercises = async ({muscleGroup}) => {
    if (muscleGroup) {
        return exerciseRepo.findByMuscleGroup(muscleGroup);
    }
    return exerciseRepo.findAll();
}

export const getExercise = async (exerciseId) => {
    const exercise = await exerciseRepo.findById(exerciseId);
    if (!exercise) {
        throw new Error("Exercise not found");
    }
    return exercise;
}