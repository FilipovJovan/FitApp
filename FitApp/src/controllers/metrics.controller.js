import * as metricsService from '../services/metrics.service.js';

export const createMetric = async (req, res) => {
    try {
        const { height, weight } = req.body;
        const metric = await metricsService.createMetric(req.user.id, { height, weight });
        res.status(201).json(metric);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const getHistory = async (req, res) => {
    try {
        const metrics = await metricsService.getHistory(req.user.id);
        res.status(200).json(metrics);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const getLatest = async (req, res) => {
    try {
        const metric = await metricsService.getLatest(req.user.id);
        res.status(200).json(metric);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}