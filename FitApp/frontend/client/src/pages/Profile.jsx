import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import * as usersApi from '../api/users.js';
import * as metricsApi from '../api/metrics.js';
import * as trainingProfileApi from '../api/trainingProfile.js';

function AccountSection() {
    const { user, refreshUser } = useAuth();
    const [form, setForm] = useState({ name: '', surname: '', birthDate: '', gender: '' });
    const [error, setError] = useState('');
    const [notice, setNotice] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name || '',
                surname: user.surname || '',
                birthDate: user.birth_date ? user.birth_date.slice(0, 10) : '',
                gender: user.gender || '',
            });
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setNotice('');
        setSaving(true);
        try {
            await usersApi.updateMe(form);
            await refreshUser();
            setNotice('Saved.');
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <section className="form-card section-gap">
            <h3 style={{ marginBottom: 16 }}>Account</h3>
            {error && <div className="alert">{error}</div>}
            {notice && <div className="notice">{notice}</div>}
            <form onSubmit={handleSubmit}>
                <div className="field-row">
                    <div className="field">
                        <label>First name</label>
                        <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div className="field">
                        <label>Last name</label>
                        <input value={form.surname} onChange={(e) => setForm((f) => ({ ...f, surname: e.target.value }))} />
                    </div>
                </div>
                <div className="field-row">
                    <div className="field">
                        <label>Birth date</label>
                        <input type="date" value={form.birthDate} onChange={(e) => setForm((f) => ({ ...f, birthDate: e.target.value }))} />
                    </div>
                    <div className="field">
                        <label>Gender</label>
                        <select value={form.gender} onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value }))}>
                            <option value="">Prefer not to say</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                <button className="btn btn-primary" type="submit" disabled={saving}>
                    {saving ? 'Saving…' : 'Save changes'}
                </button>
            </form>
        </section>
    );
}

function SecuritySection() {
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [notice, setNotice] = useState('');
    const [savingEmail, setSavingEmail] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);

    const handleEmail = async (e) => {
        e.preventDefault();
        setError(''); setNotice('');
        setSavingEmail(true);
        try {
            await usersApi.updateEmail(email);
            setNotice('Email updated.');
            setEmail('');
        } catch (err) {
            setError(err.message);
        } finally {
            setSavingEmail(false);
        }
    };

    const handlePassword = async (e) => {
        e.preventDefault();
        setError(''); setNotice('');
        setSavingPassword(true);
        try {
            await usersApi.updatePassword(currentPassword, newPassword);
            setNotice('Password updated.');
            setCurrentPassword('');
            setNewPassword('');
        } catch (err) {
            setError(err.message);
        } finally {
            setSavingPassword(false);
        }
    };

    return (
        <section className="form-card section-gap">
            <h3 style={{ marginBottom: 16 }}>Security</h3>
            {error && <div className="alert">{error}</div>}
            {notice && <div className="notice">{notice}</div>}
            <form onSubmit={handleEmail} style={{ marginBottom: 24 }}>
                <div className="field">
                    <label>New email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="new@email.com" required />
                </div>
                <button className="btn" type="submit" disabled={savingEmail}>
                    {savingEmail ? 'Updating…' : 'Update email'}
                </button>
            </form>
            <form onSubmit={handlePassword}>
                <div className="field-row">
                    <div className="field">
                        <label>Current password</label>
                        <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
                    </div>
                    <div className="field">
                        <label>New password</label>
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                    </div>
                </div>
                <button className="btn" type="submit" disabled={savingPassword}>
                    {savingPassword ? 'Updating…' : 'Update password'}
                </button>
            </form>
        </section>
    );
}

function TrainingProfileSection() {
    const [form, setForm] = useState({ experience: '', split: '', daysPerWeek: '' });
    const [error, setError] = useState('');
    const [notice, setNotice] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        trainingProfileApi.getProfile()
            .then((profile) => setForm({
                experience: profile.experience || '',
                split: profile.split || '',
                daysPerWeek: profile.days_per_week ?? '',
            }))
            .catch(() => {});
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); setNotice('');
        setSaving(true);
        try {
            await trainingProfileApi.upsertProfile({
                experience: form.experience,
                split: form.split,
                daysPerWeek: Number(form.daysPerWeek),
            });
            setNotice('Training profile saved.');
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <section className="form-card section-gap">
            <h3 style={{ marginBottom: 16 }}>Training profile</h3>
            {error && <div className="alert">{error}</div>}
            {notice && <div className="notice">{notice}</div>}
            <form onSubmit={handleSubmit}>
                <div className="field-row">
                    <div className="field">
                        <label>Experience</label>
                        <select value={form.experience} onChange={(e) => setForm((f) => ({ ...f, experience: e.target.value }))}>
                            <option value="">Select…</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>
                    <div className="field">
                        <label>Split</label>
                        <input placeholder="e.g. push/pull/legs" value={form.split} onChange={(e) => setForm((f) => ({ ...f, split: e.target.value }))} />
                    </div>
                    <div className="field">
                        <label>Days / week</label>
                        <input type="number" min="1" max="7" value={form.daysPerWeek} onChange={(e) => setForm((f) => ({ ...f, daysPerWeek: e.target.value }))} />
                    </div>
                </div>
                <button className="btn btn-primary" type="submit" disabled={saving}>
                    {saving ? 'Saving…' : 'Save profile'}
                </button>
            </form>
        </section>
    );
}

function MetricsSection() {
    const [history, setHistory] = useState(null);
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    const load = async () => {
        try {
            const data = await metricsApi.getHistory();
            setHistory(data);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => { load(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSaving(true);
        try {
            await metricsApi.createMetric({ height: Number(height), weight: Number(weight) });
            setHeight('');
            setWeight('');
            await load();
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <section className="form-card section-gap">
            <h3 style={{ marginBottom: 16 }}>Body metrics</h3>
            {error && <div className="alert">{error}</div>}
            <form onSubmit={handleSubmit} className="field-row" style={{ alignItems: 'flex-end' }}>
                <div className="field">
                    <label>Height (cm)</label>
                    <input type="number" min="0" value={height} onChange={(e) => setHeight(e.target.value)} required />
                </div>
                <div className="field">
                    <label>Weight (kg)</label>
                    <input type="number" min="0" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} required />
                </div>
                <button className="btn btn-primary" type="submit" disabled={saving} style={{ marginBottom: 18 }}>
                    {saving ? 'Logging…' : 'Log entry'}
                </button>
            </form>

            {history && history.length > 0 && (
                <table className="metrics-table">
                    <thead>
                    <tr><th>Logged</th><th>Height</th><th>Weight</th></tr>
                    </thead>
                    <tbody>
                    {history.map((m) => (
                        <tr key={m.id}>
                            <td>{m.created_at ? new Date(m.created_at).toLocaleDateString() : '—'}</td>
                            <td className="tabular">{m.height} cm</td>
                            <td className="tabular">{m.weight} kg</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            {history && history.length === 0 && <p className="lede">No entries logged yet.</p>}
        </section>
    );
}

export default function Profile() {
    return (
        <div className="page">
            <p className="eyebrow">your log</p>
            <h1>Profile</h1>
            <p className="lede">Account details, training profile, and body metrics history.</p>
            <AccountSection />
            <TrainingProfileSection />
            <MetricsSection />
            <SecuritySection />
        </div>
    );
}
