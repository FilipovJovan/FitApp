import { pool } from './pool.repo.js';

export const createWeek = async ({ id, planId, weekNumber }) => {
    await pool.query(
        `INSERT INTO weeks (id, plan_id, week_number)
         VALUES (?, ?, ?)`,
        [id, planId, weekNumber]
    );
    return findById(id);
}

export const findById = async (id) => {
    const [rows] = await pool.query(
        `SELECT * FROM weeks WHERE id = ?`,
        [id]
    );
    return rows[0] || null;
}

export const findAllByPlanId = async (planId) => {
    const [rows] = await pool.query(
        `SELECT * FROM weeks WHERE plan_id = ? ORDER BY week_number ASC`,
        [planId]
    );
    return rows;
}

export const findByIdAndUserId = async (weekId, userId) => {
    const [rows] = await pool.query(
        `SELECT w.*
         FROM weeks w
         JOIN plans p ON p.id = w.plan_id
         WHERE w.id = ? AND p.user_id = ?`,
        [weekId, userId]
    );
    return rows[0] || null;
}

export const deleteWeek = async (id) => {
    await pool.query(`DELETE FROM weeks WHERE id = ?`, [id]);
}