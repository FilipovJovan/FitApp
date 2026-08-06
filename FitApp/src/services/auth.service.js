import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {v4 as uuidv4} from 'uuid';
import * as authRepo from '../db/auth.repo.js';

// register user
export const register = async ({name, surname, email, password, birthDate, gender}) => {
    const exists = await authRepo.existByEmail(email);
    if (exists) {
        throw new error("Email already in use");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await authRepo.createUser({
        id: uuidv4(), name, surname, email, passwordHash, birthDate, gender
    });

    const token = jwt.sign({sub: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'});
    delete user.password_hash;
    return {user, token};
}

// login user
export const login = async ({email, password}) => {
    const user = await authRepo.findByEmail(email);
    if (!user) {
        throw new error("Invalid credentials")
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
        throw new error("Invalid credentials")
    }

    const token = jwt.sign({sub: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'});
    delete user.password_hash;
    return {user, token};
}