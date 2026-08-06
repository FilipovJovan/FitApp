import { v4 as uuidv4 } from 'uuid';
import * as planRepo from '../db/plan.repo.js';

export const createPlan = async (userId, {weeksPerPlan, daysPerWeek}) => {
    return planRepo.createPlan({id: uuidv4(), userId, weeksPerPlan, daysPerWeek});
}

export const getPlansForUser = async (userId) => {
    return planRepo.findAllByUserId(userId);
}

export const getPlan = async (planId, userId) => {
    const plan = await planRepo.findByIdAndUserId(planId, userId);
    if (!plan) {
        throw new Error("Plan not found");
    }
    return plan;
}

export const updatePlan = async (planId, userId, {weeksPerPlan, daysPerWeek}) => {
    const plan = await planRepo.findByIdAndUserId(planId, userId);
    if (!plan) {
        throw new Error("Plan not found");
    }
    return planRepo.updatePlan(planId, {weeksPerPlan, daysPerWeek});
}

export const deletePlan = async (planId, userId) => {
    const plan = await planRepo.findByIdAndUserId(planId, userId);
    if (!plan) {
        throw new Error("Plan not found");
    }
    await planRepo.deletePlan(planId);
}