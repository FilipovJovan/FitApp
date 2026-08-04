-- USERS TABLE
CREATE TABLE users
(
    id            CHAR(36)                         NOT NULL DEFAULT (UUID()) PRIMARY KEY,
    name          VARCHAR(255)                     NOT NULL,
    surname       VARCHAR(255)                     NOT NULL,
    email         VARCHAR(255)                     NOT NULL UNIQUE,
    password_hash VARCHAR(255)                     NOT NULL,
    birth_date    DATE,
    gender        ENUM ('male', 'female', 'other') NOT NULL,
    created_at    TIMESTAMP                        NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- USER_BODY_METRICS TABLE
CREATE TABLE user_body_metrics
(
    id         CHAR(36)  NOT NULL DEFAULT (UUID()) PRIMARY KEY,
    user_id    CHAR(36)  NOT NULL,
    height     INT,
    weight     INT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_body_metrics_user
        FOREIGN KEY (user_id)
            REFERENCES users (id)
            ON DELETE CASCADE
);

-- TRAINING_PROFILES TABLE
CREATE TABLE training_profiles
(
    id            CHAR(36)     NOT NULL DEFAULT (UUID()) PRIMARY KEY,
    user_id       CHAR(36)     NOT NULL,
    experience    VARCHAR(255) NOT NULL,
    split         VARCHAR(255) NOT NULL,
    days_per_week INT          NOT NULL,

    CONSTRAINT fk_training_profiles_user
        FOREIGN KEY (user_id)
            REFERENCES users (id)
            ON DELETE CASCADE
);

-- PLANS TABLE
CREATE TABLE plans
(
    id             CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
    user_id        CHAR(36) NOT NULL,
    weeks_per_plan INT      NOT NULL,
    days_per_week  INT      NOT NULL,

    CONSTRAINT fk_plans_user
        FOREIGN KEY (user_id)
            REFERENCES users (id)
            ON DELETE CASCADE
);

-- WEEKS TABLE
CREATE TABLE weeks
(
    id          CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
    plan_id     CHAR(36) NOT NULL,
    week_number INT      NOT NULL,

    CONSTRAINT fk_weeks_plan
        FOREIGN KEY (plan_id)
            REFERENCES plans (id)
            ON DELETE CASCADE,

    UNIQUE (plan_id, week_number)
);

-- DAYS TABLE
CREATE TABLE days
(
    id         CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
    week_id    CHAR(36) NOT NULL,
    day_number INT      NOT NULL,

    CONSTRAINT fk_days_week
        FOREIGN KEY (week_id)
            REFERENCES weeks (id)
            ON DELETE CASCADE,

    UNIQUE (week_id, day_number)
);

-- EXERCISES TABLE
CREATE TABLE exercises
(
    id           CHAR(36)     NOT NULL DEFAULT (UUID()) PRIMARY KEY,
    name         VARCHAR(255) NOT NULL,
    muscle_group VARCHAR(255) NOT NULL
);

-- WORKOUT_EXERCISES TABLE
CREATE TABLE workout_exercises
(
    id          CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
    day_id      CHAR(36) NOT NULL,
    exercise_id CHAR(36) NOT NULL,
    sets        INT      NOT NULL,
    reps        INT      NOT NULL,
    rest        INT      NOT NULL,

    CONSTRAINT fk_workout_day
        FOREIGN KEY (day_id)
            REFERENCES days (id)
            ON DELETE CASCADE,

    CONSTRAINT fk_workout_exercise
        FOREIGN KEY (exercise_id)
            REFERENCES exercises (id)
);