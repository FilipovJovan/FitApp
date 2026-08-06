import bcrypt from 'bcrypt';
import * as userRepo from '../db/user.repo.js';

// get user
export const getUser = async (userId) => {
    const user = await userRepo.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    delete user.password_hash;
    return user;
}

// update user
export const updateUser = async (userId, {name, surname, birthDate, gender}) => {
    const updated = await userRepo.updateUser(userId, {name, surname, birthDate, gender});
    delete updated.password_hash;
    return updated;
}

// update email
export const updateEmail = async (userId, email) => {
    const updated = await userRepo.updateEmail(userId, email);
    delete updated.password_hash;
    return updated;
}

// update password
export const updatePassword = async (userId, currentPassword, newPassword) => {
    const user = await userRepo.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    const valid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!valid) {
        throw new Error("Current password is incorrect");
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await userRepo.updatePasswordHash(userId, passwordHash);
}