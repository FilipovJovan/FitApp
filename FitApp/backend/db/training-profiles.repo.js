import {pool} from "./pool.repo.js";

export const findByUserId = async (userId) => {
    const [rows] = await pool.query(
        `SELECT *
         FROM training_profiles
         WHERE user_id = ?`, [userId]
    )
    return rows[0] || null;
}

export const findById = async (id) => {
    const [rows] = await pool.query(
        `SELECT *
         FROM training_profiles
         WHERE id = ?`, [id]
    )
    return rows[0] || null;
}

export const createTrainingProfile = async ({id, userId, experience, split, daysPerWeek}) => {
    await pool.query(
        `INSERT INTO training_profiles (id, user_id, experience, split, days_per_week)
         VALUES (?, ?, ?, ?, ?)`, [id, userId, experience, split, daysPerWeek]
    )
    return findById(id);
}

export const updateTrainingProfile = async (id, {experience, split, daysPerWeek}) => {
    await pool.query(
        `UPDATE training_profiles
         SET experience = ?, split = ?, days_per_week = ?
         WHERE id = ?`,
        [experience, split, daysPerWeek, id]
    );
    return findById(id);
}

export const deleteTrainingProfile = async (id) => {
    const [rows] = await pool.query(
        `DELETE FROM training_profiles WHERE id = ?`, [id]
    );
    return rows[0] || null;
}