import * as trainingProfileService from '../services/training-profiles.service.js';

export const getProfile = async (req, res) => {
    try {
        const profile = await trainingProfileService.getProfile(req.user.id);
        res.status(200).json(profile);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export const upsertProfile = async (req, res) => {
    try {
        const { experience, split, dayPerWeek } = req.body;
        const profile = await trainingProfileService.upsertProfile(req.user.id, { experience, split, dayPerWeek });
        res.status(200).json(profile);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}