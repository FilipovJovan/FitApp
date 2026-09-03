import * as planService from '../services/plan.service.js';

export const createPlan = async (req, res) => {
    try {
        const { weeksPerPlan, daysPerWeek } = req.body;
        const plan = await planService.createPlan(req.user.id, { weeksPerPlan, daysPerWeek });
        res.status(201).json(plan);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const getMyPlans = async (req, res) => {
    try {
        const plans = await planService.getPlansForUser(req.user.id);
        res.status(200).json(plans);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const getPlan = async (req, res) => {
    try {
        const plan = await planService.getPlan(req.params.id, req.user.id);
        res.status(200).json(plan);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export const updatePlan = async (req, res) => {
    try {
        const { weeksPerPlan, daysPerWeek } = req.body;
        const plan = await planService.updatePlan(req.params.id, req.user.id, { weeksPerPlan, daysPerWeek });
        res.status(200).json(plan);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const deletePlan = async (req, res) => {
    try {
        await planService.deletePlan(req.params.id, req.user.id);
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}