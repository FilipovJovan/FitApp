import {pool} from "./pool.repo.js";

export const findByEmail = async (email) => {
    const [rows] = await pool.query(
        `SELECT *
         FROM users
         WHERE email = ?`, [email]
    );
    return rows[0] || null;
}

export const findById = async (id) => {
    const [rows] = await pool.query(
        `SELECT *
         FROM users
         WHERE id = ?`, [id]
    );
    return rows[0] || null;
}

export const createUser = async ({id, name, surname, email, passwordHash, birthdate, gender}) => {
    await pool.query(
        `INSERT INTO users (id, name, surname, email, password_hash, birth_date, gender)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id, name, surname, email, passwordHash, birthdate, gender]
    );
    return findById(id);
}

export const existByEmail = async (email) => {
    const [rows] = await pool.query(
        `SELECT 1
         FROM USERS
         WHERE email = ?
         LIMIT 1`, [email]
    );
    return rows.length > 0;
}

