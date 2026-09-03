import * as authService from '../services/auth.service.js';

export const register = async (req, res) => {
    try {
        const { name, surname, email, password, birthDate, gender } = req.body;
        const { user, token } = await authService.register({ name, surname, email, password, birthDate, gender });
        res.status(201).json({ user, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.login({ email, password });
        res.status(200).json({ user, token });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
}