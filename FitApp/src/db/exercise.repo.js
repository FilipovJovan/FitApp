import { pool } from './pool.repo.js';

export const createExercise = async ({ id, name, muscleGroup }) => {
    await pool.query(
        `INSERT INTO exercises (id, name, muscle_group)
         VALUES (?, ?, ?)`,
        [id, name, muscleGroup]
    );
    return findById(id);
}

export const findById = async (id) => {
    const [rows] = await pool.query(
        `SELECT * FROM exercises WHERE id = ?`,
        [id]
    );
    return rows[0] || null;
}

export const findAll = async () => {
    const [rows] = await pool.query(`SELECT * FROM exercises`);
    return rows;
}

export const findByMuscleGroup = async (muscleGroup) => {
    const [rows] = await pool.query(
        `SELECT * FROM exercises WHERE muscle_group = ?`,
        [muscleGroup]
    );
    return rows;
}