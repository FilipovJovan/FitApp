import { pool } from './pool.repo.js';

export const createWorkoutExercise = async ({ id, dayId, exerciseId, sets, reps, rest }) => {
    await pool.query(
        `INSERT INTO workout_exercises (id, day_id, exercise_id, sets, reps, rest)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [id, dayId, exerciseId, sets, reps, rest]
    );
    return findById(id);
}

export const findById = async (id) => {
    const [rows] = await pool.query(
        `SELECT * FROM workout_exercises WHERE id = ?`,
        [id]
    );
    return rows[0] || null;
}

export const findAllByDayId = async (dayId) => {
    const [rows] = await pool.query(
        `SELECT we.*, e.name AS exercise_name, e.muscle_group
         FROM workout_exercises we
         JOIN exercises e ON e.id = we.exercise_id
         WHERE we.day_id = ?`,
        [dayId]
    );
    return rows;
}

export const findByIdAndUserId = async (id, userId) => {
    const [rows] = await pool.query(
        `SELECT we.*
         FROM workout_exercises we
         JOIN days d ON d.id = we.day_id
         JOIN weeks w ON w.id = d.week_id
         JOIN plans p ON p.id = w.plan_id
         WHERE we.id = ? AND p.user_id = ?`,
        [id, userId]
    );
    return rows[0] || null;
}

export const updateWorkoutExercise = async (id, { sets, reps, rest }) => {
    await pool.query(
        `UPDATE workout_exercises SET sets = ?, reps = ?, rest = ? WHERE id = ?`,
        [sets, reps, rest, id]
    );
    return findById(id);
}

export const deleteWorkoutExercise = async (id) => {
    await pool.query(`DELETE FROM workout_exercises WHERE id = ?`, [id]);
}