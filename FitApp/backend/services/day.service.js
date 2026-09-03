import {v4 as uuidv4} from 'uuid';
import * as dayRepo from '../db/day.repo.js';
import * as weekRepo from '../db/week.repo.js';

export const createDay = async (weekId, userId, {dayNumber}) => {
    const week = await weekRepo.findByIdAndUserId(weekId, userId);
    if (!week) {
        throw new Error("Week not found");
    }
    return dayRepo.createDay({id: uuidv4(), weekId, dayNumber});
}

export const getDaysForWeek = async (weekId, userId) => {
    const week = await weekRepo.findByIdAndUserId(weekId, userId);
    if (!week) {
        throw new Error("Week not found");
    }
    return dayRepo.findAllByWeekId(weekId);
}

export const getDay = async (dayId, userId) => {
    const day = await dayRepo.findByIdAndUserId(dayId, userId);
    if (!day) {
        throw new Error("Day not found");
    }
    return day;
}

export const deleteDay = async (dayId, userId) => {
    const day = await dayRepo.findByIdAndUserId(dayId, userId);
    if (!day) {
        throw new Error("Day not found");
    }
    await dayRepo.deleteDay(dayId);
}