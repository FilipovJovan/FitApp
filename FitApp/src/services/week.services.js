import {v4 as uuidv4} from 'uuid';
import * as weekRepo from '../db/week.repo.js';
import * as planRepo from '../db/plan.repo.js';

export const createWeek = async (planId, userId, {weekNumber}) => {
    const plan = await planRepo.findByIdAndUserId(planId, userId);
    if (!plan) {
        throw new Error("Plan not found");
    }
    return weekRepo.createWeek({id: uuidv4(), planId, weekNumber});
}

export const getWeeksForPlan = async (planId, userId) => {
    const plan = await planRepo.findByIdAndUserId(planId, userId);
    if (!plan) {
        throw new Error("Plan not found");
    }
    return weekRepo.findAllByPlanId(planId);
}

export const deleteWeek = async (weekId, userId) => {
    const week = await weekRepo.findByIdAndUserId(weekId, userId);
    if (!week) {
        throw new Error("Week not found");
    }
    await weekRepo.deleteWeek(weekId);
}