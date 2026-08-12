import * as userService from '../services/user.service.js';

export const getMe = async (req, res) => {
    try {
        const user = await userService.getUser(req.user.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

export const updateMe = async (req, res) => {
    try {
        const { name, surname, birthDate, gender } = req.body;
        const user = await userService.updateUser(req.user.id, { name, surname, birthDate, gender });
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const updateEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userService.updateEmail(req.user.id, email);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        await userService.updatePassword(req.user.id, currentPassword, newPassword);
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}