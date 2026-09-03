import { pool } from './pool.repo.js';

export const createPlan = async ({ id, userId, weeksPerPlan, daysPerWeek }) => {
    await pool.query(
        `INSERT INTO plans (id, user_id, weeks_per_plan, days_per_week)
         VALUES (?, ?, ?, ?)`,
        [id, userId, weeksPerPlan, daysPerWeek]
    );
    return findById(id);
}

export const findById = async (id) => {
    const [rows] = await pool.query(
        `SELECT * FROM plans WHERE id = ?`,
        [id]
    );
    return rows[0] || null;
}

export const findAllByUserId = async (userId) => {
    const [rows] = await pool.query(
        `SELECT * FROM plans WHERE user_id = ?`,
        [userId]
    );
    return rows;
}

export const findByIdAndUserId = async (id, userId) => {
    const [rows] = await pool.query(
        `SELECT * FROM plans WHERE id = ? AND user_id = ?`,
        [id, userId]
    );
    return rows[0] || null;
}

export const updatePlan = async (id, { weeksPerPlan, daysPerWeek }) => {
    await pool.query(
        `UPDATE plans SET weeks_per_plan = ?, days_per_week = ? WHERE id = ?`,
        [weeksPerPlan, daysPerWeek, id]
    );
    return findById(id);
}

export const deletePlan = async (id) => {
    await pool.query(`DELETE FROM plans WHERE id = ?`, [id]);
}