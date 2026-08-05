import {pool} from "./pool.repo.js";

export const findById = async (id) => {
    const [rows] = await pool.query(
        `SELECT *
         FROM user_body_metrics
         WHERE id = ?`, [id]
    );
    return rows[0] || null;
}

export const createBodyMetrics = async ({id, userId, height, weight}) => {
    const [rows] = await pool.query(
        `INSERT INTO user_body_metrics (id, user_id, height, weight)
         VALUES (?, ?, ?, ?)`, [id, userId, height, weight]
    )
    return rows[0] || null;
}

export const findAllByUserId = async (userId) => {
    const [rows] = await pool.query(
        `SELECT *
         FROM user_body_metrics
         WHERE user_id = ?`, [userId]
    )
    return rows[0] || null;
}

export const findLatestByUserId = async (userId) => {
    const [rows] = await pool.query(
        `SELECT *
         FROM user_body_metrics
         WHERE user_id = ?
         ORDER BY created_at DESC
         LIMIT 1`,
        [userId]
    );
    return rows[0] || null;
}

export const deleteUserMetrics = async (id) => {
    const [rows] = await pool.query(
        `DELETE
         FROM user_body_metrics
         WHERE id = ?`, [id]
    )
    return rows[0] || null;
}