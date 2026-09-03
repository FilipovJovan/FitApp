import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as daysApi from '../api/days.js';
import * as workoutExercisesApi from '../api/workoutExercises.js';
import ExercisePicker from '../components/ExercisePicker.jsx';

function ExerciseRow({ item, onSave, onDelete }) {
    const [editing, setEditing] = useState(false);
    const [sets, setSets] = useState(item.sets ?? '');
    const [reps, setReps] = useState(item.reps ?? '');
    const [rest, setRest] = useState(item.rest ?? '');
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            await onSave(item.id, { sets: Number(sets), reps: Number(reps), rest: Number(rest) });
            setEditing(false);
        } finally {
            setSaving(false);
        }
    };

    if (editing) {
        return (
            <div className="log-row">
                <span className="num">·</span>
                <div className="body">
                    <div className="title">{item.exercise_name}</div>
                    <div className="field-row" style={{ marginTop: 8 }}>
                        <div className="field">
                            <label>Sets</label>
                            <input type="number" min="0" value={sets} onChange={(e) => setSets(e.target.value)} />
                        </div>
                        <div className="field">
                            <label>Reps</label>
                            <input type="number" min="0" value={reps} onChange={(e) => setReps(e.target.value)} />
                        </div>
                        <div className="field">
                            <label>Rest (sec)</label>
                            <input type="number" min="0" value={rest} onChange={(e) => setRest(e.target.value)} />
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary btn-small" onClick={handleSave} disabled={saving}>save</button>
                <button className="btn btn-quiet btn-small" onClick={() => setEditing(false)}>cancel</button>
            </div>
        );
    }

    return (
        <div className="log-row">
            <span className="num">·</span>
            <div className="body">
                <div className="title">{item.exercise_name}</div>
                <div className="meta">
                    {item.muscle_group && <span className="chip" style={{ marginRight: 8 }}>{item.muscle_group}</span>}
                    <span className="tabular">{item.sets}</span> × <span className="tabular">{item.reps}</span>
                    {' · '}<span className="tabular">{item.rest}</span>s rest
                </div>
            </div>
            <button className="btn btn-quiet btn-small" onClick={() => setEditing(true)}>edit</button>
            <button className="btn btn-quiet btn-small" onClick={() => onDelete(item.id)}>delete</button>
        </div>
    );
}

export default function DayDetail() {
    const { dayId } = useParams();
    const [day, setDay] = useState(null);
    const [exercises, setExercises] = useState(null);
    const [error, setError] = useState('');
    const [notice, setNotice] = useState('');
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [sets, setSets] = useState(3);
    const [reps, setReps] = useState(10);
    const [rest, setRest] = useState(60);
    const [adding, setAdding] = useState(false);

    const load = async () => {
        try {
            const [dayData, exercisesData] = await Promise.all([
                daysApi.getDay(dayId),
                workoutExercisesApi.listForDay(dayId),
            ]);
            setDay(dayData);
            setExercises(exercisesData);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => { load(); }, [dayId]);

    const handleAdd = async (e) => {
        e.preventDefault();
        setError('');
        setNotice('');
        if (!selectedExercise) {
            setError('Pick an exercise from the catalog first.');
            return;
        }
        setAdding(true);
        try {
            await workoutExercisesApi.addToDay(dayId, {
                exerciseId: selectedExercise.id,
                sets: Number(sets),
                reps: Number(reps),
                rest: Number(rest),
            });
            setSelectedExercise(null);
            setNotice(`Added ${selectedExercise.name}.`);
            await load();
        } catch (err) {
            setError(err.message);
        } finally {
            setAdding(false);
        }
    };

    const handleSaveEdit = async (id, payload) => {
        try {
            await workoutExercisesApi.updateWorkoutExercise(id, payload);
            await load();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteExercise = async (id) => {
        if (!confirm('Remove this exercise from the day?')) return;
        try {
            await workoutExercisesApi.deleteWorkoutExercise(id);
            await load();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="page">
            <p className="eyebrow"><Link to="/">plans</Link> / day</p>
            <div className="page-head">
                <h1>Day {day?.day_number ?? ''}</h1>
            </div>
            <p className="lede">Everything logged for this session.</p>

            {error && <div className="alert">{error}</div>}
            {notice && <div className="notice">{notice}</div>}

            <div className="form-card section-gap">
                <h3 style={{ marginBottom: 16 }}>Add an exercise</h3>
                <form onSubmit={handleAdd}>
                    <ExercisePicker onPick={setSelectedExercise} />
                    <div className="field-row">
                        <div className="field">
                            <label htmlFor="sets">Sets</label>
                            <input id="sets" type="number" min="1" value={sets} onChange={(e) => setSets(e.target.value)} />
                        </div>
                        <div className="field">
                            <label htmlFor="reps">Reps</label>
                            <input id="reps" type="number" min="1" value={reps} onChange={(e) => setReps(e.target.value)} />
                        </div>
                        <div className="field">
                            <label htmlFor="rest">Rest (sec)</label>
                            <input id="rest" type="number" min="0" value={rest} onChange={(e) => setRest(e.target.value)} />
                        </div>
                    </div>
                    <button className="btn btn-primary" type="submit" disabled={adding}>
                        {adding ? 'Adding…' : 'Add to day'}
                    </button>
                </form>
            </div>

            <div className="log section-gap">
                {exercises === null && <div className="log-empty">Loading...</div>}
                {exercises && exercises.length === 0 && <div className="log-empty">Nothing logged for this day yet.</div>}
                {exercises && exercises.map((item) => (
                    <ExerciseRow key={item.id} item={item} onSave={handleSaveEdit} onDelete={handleDeleteExercise} />
                ))}
            </div>
        </div>
    );
}
