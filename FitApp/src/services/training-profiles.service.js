import {v4 as uuidv4} from 'uuid';
import * as trainingProfileRepo from '../db/training-profiles.repo.js';

// get profile
export const getProfile = async (userId) => {
    const profile = await trainingProfileRepo.findByUserId(userId);
    if (!profile) {
        throw new Error("No training profile found");
    }
    return profile;
}

// create profile or update if existing
export const upsertProfile = async (userId, {experience, split, daysPerWeek}) => {
    const existing = await trainingProfileRepo.findByUserId(userId);
    if (existing) {
        return trainingProfileRepo.updateTrainingProfile(existing.id, {experience, split, daysPerWeek});
    }
    return trainingProfileRepo.createTrainingProfile({id: uuidv4(), userId, experience, split, daysPerWeek});
}