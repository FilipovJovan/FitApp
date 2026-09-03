import { pool } from './pool.repo.js';

export const createDay = async ({ id, weekId, dayNumber }) => {
    await pool.query(
        `INSERT INTO days (id, week_id, day_number)
         VALUES (?, ?, ?)`,
        [id, weekId, dayNumber]
    );
    return findById(id);
}

export const findById = async (id) => {
    const [rows] = await pool.query(
        `SELECT * FROM days WHERE id = ?`,
        [id]
    );
    return rows[0] || null;
}

export const findAllByWeekId = async (weekId) => {
    const [rows] = await pool.query(
        `SELECT * FROM days WHERE week_id = ? ORDER BY day_number ASC`,
        [weekId]
    );
    return rows;
}

export const findByIdAndUserId = async (dayId, userId) => {
    const [rows] = await pool.query(
        `SELECT d.*
         FROM days d
         JOIN weeks w ON w.id = d.week_id
         JOIN plans p ON p.id = w.plan_id
         WHERE d.id = ? AND p.user_id = ?`,
        [dayId, userId]
    );
    return rows[0] || null;
}

export const deleteDay = async (id) => {
    await pool.query(`DELETE FROM days WHERE id = ?`, [id]);
}