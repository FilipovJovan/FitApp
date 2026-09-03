import * as dayService from '../services/day.service.js';

export const createDay = async (req, res) => {
    try {
        const { dayNumber } = req.body;
        const day = await dayService.createDay(req.params.weekId, req.user.id, { dayNumber });
        res.status(201).json(day);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const getDaysForWeek = async (req, res) => {
    try {
        const days = await dayService.getDaysForWeek(req.params.weekId, req.user.id);
        res.status(200).json(days);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const getDay = async (req, res) => {
    try {
        const day = await dayService.getDay(req.params.id, req.user.id);
        res.status(200).json(day);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export const deleteDay = async (req, res) => {
    try {
        await dayService.deleteDay(req.params.id, req.user.id);
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}