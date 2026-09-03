import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as plansApi from '../api/plans.js';
import * as weeksApi from '../api/weeks.js';

export default function PlanDetail() {
    const { planId } = useParams();
    const navigate = useNavigate();
    const [plan, setPlan] = useState(null);
    const [weeks, setWeeks] = useState(null);
    const [error, setError] = useState('');
    const [creating, setCreating] = useState(false);
    const [nextWeekNumber, setNextWeekNumber] = useState(1);

    const load = async () => {
        try {
            const [planData, weeksData] = await Promise.all([
                plansApi.getPlan(planId),
                weeksApi.listWeeks(planId),
            ]);
            setPlan(planData);
            setWeeks(weeksData);
            setNextWeekNumber(weeksData.length + 1);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => { load(); }, [planId]);

    const handleAddWeek = async (e) => {
        e.preventDefault();
        setError('');
        setCreating(true);
        try {
            await weeksApi.createWeek(planId, { weekNumber: Number(nextWeekNumber) });
            await load();
        } catch (err) {
            setError(err.message);
        } finally {
            setCreating(false);
        }
    };

    const handleDeleteWeek = async (weekId) => {
        if (!confirm('Delete this week and its days?')) return;
        try {
            await weeksApi.deleteWeek(weekId);
            await load();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeletePlan = async () => {
        if (!confirm('Delete this whole plan?')) return;
        try {
            await plansApi.deletePlan(planId);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="page">
            <p className="eyebrow"><Link to="/">plans</Link> / plan</p>
            <div className="page-head">
                <h1>{plan ? `${plan.weeks_per_plan}-week plan` : 'Plan'}</h1>
                <button className="btn btn-danger btn-small" onClick={handleDeletePlan}>delete plan</button>
            </div>
            {plan && <p className="lede">Aiming for <span className="tabular">{plan.days_per_week}</span> training days each week.</p>}

            {error && <div className="alert">{error}</div>}

            <form className="inline-form section-gap" onSubmit={handleAddWeek}>
                <div className="field">
                    <label htmlFor="weekNumber">Week number</label>
                    <input id="weekNumber" type="number" min="1" value={nextWeekNumber}
                           onChange={(e) => setNextWeekNumber(e.target.value)} />
                </div>
                <button className="btn btn-primary" type="submit" disabled={creating}>
                    {creating ? 'Adding...' : 'Add week'}
                </button>
            </form>

            <div className="log section-gap">
                {weeks === null && <div className="log-empty">Loading…</div>}
                {weeks && weeks.length === 0 && <div className="log-empty">No weeks logged yet.</div>}
                {weeks && weeks.map((week) => (
                    <div className="log-row" key={week.id}>
                        <span className="num tabular">{String(week.week_number).padStart(2, '0')}</span>
                        <Link className="body" to={`/plans/${planId}/weeks/${week.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="title">Week {week.week_number}</div>
                        </Link>
                        <button className="btn btn-quiet btn-small" onClick={() => handleDeleteWeek(week.id)}>delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
