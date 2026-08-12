import * as weekService from '../services/week.service.js';

export const createWeek = async (req, res) => {
    try {
        const { weekNumber } = req.body;
        const week = await weekService.createWeek(req.params.planId, req.user.id, { weekNumber });
        res.status(201).json(week);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const getWeeksForPlan = async (req, res) => {
    try {
        const weeks = await weekService.getWeeksForPlan(req.params.planId, req.user.id);
        res.status(200).json(weeks);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const deleteWeek = async (req, res) => {
    try {
        await weekService.deleteWeek(req.params.id, req.user.id);
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}