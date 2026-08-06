import {v4 as uuidv4} from 'uuid';
import * as metricsRepo from '../db/metrics.repo.js';

// create metric profile
export const createMetric = async (userId, {height, weight}) => {
    return metricRepo.create({id: uuidv4(), userId, height, weight});
}

// get whole history
export const getHistory = async (userId) => {
    return metricsRepo.findAllByUserId(userId);
}

// get latest values
export const getLatest = async (userId) => {
    const metric = await metricsRepo.findLatestByUserId(userId);
    if (!metric) {
        throw new Error("No metrics found for this user");
    }
    return metric;
}