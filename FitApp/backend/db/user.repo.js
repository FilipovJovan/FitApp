import {pool} from "./pool.repo.js";

export const findById = async (id) => {
    const [rows] = await pool.query(
        `SELECT *
         FROM users
         WHERE id = ?`, [id]
    );
    return rows[0] || null;
}

export const updateUser = async (id, {name, surname, birthDate, gender}) => {
    await pool.query(
        `UPDATE users
         SET name = ?,
             surname = ?,
             birth_date = ?,
             gender = ?
         WHERE id = ?`,
        [name, surname, birthDate, gender, id]
    );
    return findById(id);
}

export const updateEmail = async (id, email) => {
    await pool.query(
        `UPDATE users
         SET email = ?
         WHERE id = ?`,
        [email, id]
    );
    return findById(id);
}

export const updatePasswordHash = async (id, passwordHash) => {
    await pool.query(
        `UPDATE users
         SET password_hash = ?
         WHERE id = ?`,
        [passwordHash, id]
    );
}

export const deleteUser = async (id) => {
    const [rows] = await pool.query(
        `DELETE
         FROM users
         WHERE id = ?`, [id]
    );
    return rows[0] || null;
}