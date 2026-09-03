import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as plansApi from '../api/plans.js';

export default function PlansList() {
    const [plans, setPlans] = useState(null);
    const [error, setError] = useState('');
    const [creating, setCreating] = useState(false);
    const [form, setForm] = useState({ weeksPerPlan: 4, daysPerWeek: 3 });

    const load = async () => {
        try {
            const data = await plansApi.listPlans();
            setPlans(data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => { load(); }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        setError('');
        setCreating(true);
        try {
            await plansApi.createPlan({
                weeksPerPlan: Number(form.weeksPerPlan),
                daysPerWeek: Number(form.daysPerWeek),
            });
            setForm({ weeksPerPlan: 4, daysPerWeek: 3 });
            await load();
        } catch (err) {
            setError(err.message);
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this plan and everything logged under it?')) return;
        try {
            await plansApi.deletePlan(id);
            await load();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="page">
            <p className="eyebrow">your log</p>
            <div className="page-head">
                <h1>Training plans</h1>
            </div>
            <p className="lede">Every plan holds a stack of weeks, and every week a run of days.</p>

            {error && <div className="alert">{error}</div>}

            <form className="inline-form section-gap" onSubmit={handleCreate}>
                <div className="field">
                    <label htmlFor="weeksPerPlan">Weeks</label>
                    <input id="weeksPerPlan" type="number" min="1" max="52" value={form.weeksPerPlan}
                           onChange={(e) => setForm((f) => ({ ...f, weeksPerPlan: e.target.value }))} />
                </div>
                <div className="field">
                    <label htmlFor="daysPerWeek">Days / week</label>
                    <input id="daysPerWeek" type="number" min="1" max="7" value={form.daysPerWeek}
                           onChange={(e) => setForm((f) => ({ ...f, daysPerWeek: e.target.value }))} />
                </div>
                <button className="btn btn-primary" type="submit" disabled={creating}>
                    {creating ? 'Starting…' : 'Start new plan'}
                </button>
            </form>

            <div className="log section-gap">
                {plans === null && <div className="log-empty">Loading…</div>}
                {plans && plans.length === 0 && (
                    <div className="log-empty">No plans yet — start one above.</div>
                )}
                {plans && plans.map((plan, i) => (
                    <div className="log-row" key={plan.id}>
                        <span className="num tabular">{String(i + 1).padStart(2, '0')}</span>
                        <Link className="body" to={`/plans/${plan.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="title">{plan.weeks_per_plan}-week plan</div>
                            <div className="meta"><span className="tabular">{plan.days_per_week}</span> days a week</div>
                        </Link>
                        <button className="btn btn-quiet btn-small" onClick={() => handleDelete(plan.id)}>delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
