BEGIN;

CREATE INDEX idx_plans_user_id ON plans(user_id);

CREATE INDEX idx_weeks_plan_id ON weeks(plan_id);

CREATE INDEX idx_days_week_id ON days(week_id);

CREATE INDEX idx_workout_exercises_day_id ON workout_exercises(day_id);

COMMIT;