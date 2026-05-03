BEGIN;

ALTER TABLE users
    ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans
    ENABLE ROW LEVEL SECURITY;
ALTER TABLE weeks
    ENABLE ROW LEVEL SECURITY;
ALTER TABLE days
    ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_body_metrics
    ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_profiles
    ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_exercises
    ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS user_isolation_users ON users;

CREATE POLICY user_isolation_users ON users
    USING (id = current_setting('app.current_user')::uuid);

DROP POLICY IF EXISTS user_isolation_plans ON plans;

CREATE POLICY user_isolation_plans ON plans
    FOR ALL
    USING (user_id = current_setting('app.current_user')::uuid)
    WITH CHECK (user_id = current_setting('app.current_user')::uuid);

DROP POLICY IF EXISTS user_isolation_weeks ON weeks;

CREATE POLICY user_isolation_weeks ON weeks
    FOR ALL
    USING (
    EXISTS (SELECT 1
            FROM plans p
            WHERE p.id = weeks.plan_id
              AND p.user_id = current_setting('app.current_user')::uuid)
    )
    WITH CHECK (
    EXISTS (SELECT 1
            FROM plans p
            WHERE p.id = weeks.plan_id
              AND p.user_id = current_setting('app.current_user')::uuid)
    );

DROP POLICY IF EXISTS user_isolation_days ON days;

CREATE POLICY user_isolation_days ON days
    FOR ALL
    USING (
    EXISTS (SELECT 1
            FROM weeks w
                     JOIN plans p ON p.id = w.plan_id
            WHERE w.id = days.week_id
              AND p.user_id = current_setting('app.current_user')::uuid)
    )
    WITH CHECK (
    EXISTS (SELECT 1
            FROM weeks w
                     JOIN plans p ON p.id = w.plan_id
            WHERE w.id = days.week_id
              AND p.user_id = current_setting('app.current_user')::uuid)
    );

DROP POLICY IF EXISTS user_isolation_workout_exercises ON workout_exercises;

CREATE POLICY user_isolation_workout_exercises ON workout_exercises
    FOR ALL
    USING (
    EXISTS (SELECT 1
            FROM days d
                     JOIN weeks w ON w.id = d.week_id
                     JOIN plans p ON p.id = w.plan_id
            WHERE d.id = workout_exercises.day_id
              AND p.user_id = current_setting('app.current_user')::uuid)
    )
    WITH CHECK (
    EXISTS (SELECT 1
            FROM days d
                     JOIN weeks w ON w.id = d.week_id
                     JOIN plans p ON p.id = w.plan_id
            WHERE d.id = workout_exercises.day_id
              AND p.user_id = current_setting('app.current_user')::uuid)
    );

DROP POLICY IF EXISTS user_isolation_body_metrics ON user_body_metrics;

CREATE POLICY user_isolation_body_metrics ON user_body_metrics FOR ALL USING (
    user_id = current_setting('app.current_user')::uuid
    ) WITH CHECK (
    user_id = current_setting('app.current_user')::uuid
    );

DROP POLICY IF EXISTS user_isolation_training_profiles ON training_profiles;

CREATE POLICY user_isolation_training_profiles ON training_profiles FOR ALL USING (
    user_id = current_setting('app.current_user')::uuid
    ) WITH CHECK (
    user_id = current_setting('app.current_user')::uuid
    );

COMMIT;