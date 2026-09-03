import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as weeksApi from '../api/weeks.js';
import * as daysApi from '../api/days.js';

const DAY_LABELS = ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function WeekDetail() {
    const { planId, weekId } = useParams();
    const navigate = useNavigate();
    const [days, setDays] = useState(null);
    const [error, setError] = useState('');
    const [creating, setCreating] = useState(false);
    const [nextDayNumber, setNextDayNumber] = useState(1);

    const load = async () => {
        try {
            const data = await daysApi.listDays(weekId);
            setDays(data || []);
            setNextDayNumber((data || []).length + 1);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => { load(); }, [weekId]);

    const handleAddDay = async (e) => {
        e.preventDefault();
        setError('');
        setCreating(true);
        try {
            await daysApi.createDay(weekId, { dayNumber: Number(nextDayNumber) });
            await load();
        } catch (err) {
            setError(err.message);
        } finally {
            setCreating(false);
        }
    };

    const handleDeleteDay = async (dayId) => {
        if (!confirm('Delete this day and its exercises?')) return;
        try {
            await daysApi.deleteDay(dayId);
            await load();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteWeek = async () => {
        if (!confirm('Delete this whole week?')) return;
        try {
            await weeksApi.deleteWeek(weekId);
            navigate(`/plans/${planId}`);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="page">
            <p className="eyebrow"><Link to="/">plans</Link> / <Link to={`/plans/${planId}`}>plan</Link> / week</p>
            <div className="page-head">
                <h1>Week</h1>
                <button className="btn btn-danger btn-small" onClick={handleDeleteWeek}>delete week</button>
            </div>
            <p className="lede">Lay out each training day, then log the exercises once you're in it.</p>

            {error && <div className="alert">{error}</div>}

            <form className="inline-form section-gap" onSubmit={handleAddDay}>
                <div className="field">
                    <label htmlFor="dayNumber">Day number</label>
                    <input id="dayNumber" type="number" min="1" max="7" value={nextDayNumber}
                           onChange={(e) => setNextDayNumber(e.target.value)} />
                </div>
                <button className="btn btn-primary" type="submit" disabled={creating}>
                    {creating ? 'Adding…' : 'Add day'}
                </button>
            </form>

            <div className="log section-gap">
                {days === null && <div className="log-empty">Loading…</div>}
                {days && days.length === 0 && <div className="log-empty">No days logged yet.</div>}
                {days && days.map((day) => (
                    <div className="log-row" key={day.id}>
                        <span className="num tabular">{String(day.day_number).padStart(2, '0')}</span>
                        <Link className="body" to={`/days/${day.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="title">{DAY_LABELS[day.day_number] || `Day ${day.day_number}`}</div>
                        </Link>
                        <button className="btn btn-quiet btn-small" onClick={() => handleDeleteDay(day.id)}>delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
