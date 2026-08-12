import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/users.routes.js';
import authRouter from './routes/auth.routes.js';
import daysRouter from './routes/days.routes.js';
import weeksRouter from './routes/weeks.routes.js';
import exerciseRouter from './routes/exercises.routes.js';
import metricsRouter from './routes/metrics.routes.js';
import trainingProfileRouter from './routes/training-profiles.routes.js';
import plansRouter from './routes/plans.routes.js';
import workoutExerciseRouter from './routes/workout-exercises.routes.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/metrics', metricsRouter);
app.use('/api/training-profile', trainingProfileRouter);
app.use('/api/plans', plansRouter);
app.use('/api', weeksRouter);
app.use('/api', daysRouter);
app.use('/api/exercises', exerciseRouter);
app.use('/api', workoutExerciseRouter);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

server.on("error", (err) => {
    console.error("Server failed to start:", err);
    process.exit(1);
});