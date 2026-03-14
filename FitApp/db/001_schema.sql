BEGIN;

-- USERS TABLE
CREATE TABLE users
(
    id            UUID PRIMARY KEY     DEFAULT gen_random_uuid(),
    name          TEXT        NOT NULL,
    surname       TEXT        NOT NULL,
    email         TEXT        NOT NULL UNIQUE,
    password_hash TEXT        NOT NULL,
    birth_date    DATE,
    gender        TEXT        NOT NULL,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- USER_BODY_METRICS TABLE
CREATE TABLE user_body_metrics
(
    id         UUID PRIMARY KEY     DEFAULT gen_random_uuid(),
    user_id    UUID        NOT NULL,
    height     INT,
    weight     INT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT fk_body_metrics_user
        FOREIGN KEY (user_id)
            REFERENCES users (id)
            ON DELETE CASCADE
);

-- TRAINING_PROFILES TABLE
CREATE TABLE training_profiles
(
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id       UUID NOT NULL,
    experience    TEXT NOT NULL,
    split         TEXT NOT NULL,
    days_per_week INT  NOT NULL,

    CONSTRAINT fk_training_profiles_user
        FOREIGN KEY (user_id)
            REFERENCES users (id)
            ON DELETE CASCADE
);

-- PLANS TABLES
CREATE TABLE plans
(
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id        UUID NOT NULL,
    weeks_per_plan INT  NOT NULL,
    days_per_week  INT  NOT NULL,

    CONSTRAINT fk_plans_user
        FOREIGN KEY (user_id)
            REFERENCES users (id)
            ON DELETE CASCADE
);

-- WEEKS TABLE
CREATE TABLE weeks
(
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id     UUID NOT NULL,
    week_number INT  NOT NULL,

    CONSTRAINT fk_weeks_plan
        FOREIGN KEY (plan_id)
            REFERENCES plans (id)
            ON DELETE CASCADE,
    UNIQUE (plan_id, week_number)
);

-- DAYS TABLE
CREATE TABLE days
(
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    week_id    UUID NOT NULL,
    day_number INT  NOT NULL,

    CONSTRAINT fk_days_week
        FOREIGN KEY (week_id)
            REFERENCES weeks (id)
            ON DELETE CASCADE,
    UNIQUE (week_id, day_number)
);

-- EXERCISES
CREATE TABLE exercises
(
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name         TEXT NOT NULL,
    muscle_group TEXT NOT NULL
);

-- WORKOUT_EXERCISES
CREATE TABLE workout_exercises
(
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    day_id      UUID NOT NULL,
    exercise_id UUID NOT NULL,
    sets        INT  NOT NULL,
    reps        INT  NOT NULL,
    rest        INT  NOT NULL,

    CONSTRAINT fk_workout_day
        FOREIGN KEY (day_id)
            REFERENCES days (id)
            ON DELETE CASCADE,

    CONSTRAINT fk_workout_exercise
        FOREIGN KEY (exercise_id)
            REFERENCES exercises (id)
);


COMMIT;