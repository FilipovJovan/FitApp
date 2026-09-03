import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '', surname: '', email: '', password: '', birthDate: '', gender: '',
    });
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        try {
            await register(form);
            navigate('/', { replace: true });
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-shell">
            <div className="auth-box">
                <h1>Create account</h1>
                <p className="lede">Set up your log — plans, weeks, days, and every set you put in.</p>
                {error && <div className="alert">{error}</div>}
                <form className="form-card" onSubmit={handleSubmit}>
                    <div className="field-row">
                        <div className="field">
                            <label htmlFor="name">First name</label>
                            <input id="name" required value={form.name} onChange={update('name')} />
                        </div>
                        <div className="field">
                            <label htmlFor="surname">Last name</label>
                            <input id="surname" required value={form.surname} onChange={update('surname')} />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" required value={form.email} onChange={update('email')} />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" required value={form.password} onChange={update('password')} />
                    </div>
                    <div className="field-row">
                        <div className="field">
                            <label htmlFor="birthDate">Birth date</label>
                            <input id="birthDate" type="date" value={form.birthDate} onChange={update('birthDate')} />
                        </div>
                        <div className="field">
                            <label htmlFor="gender">Gender</label>
                            <select id="gender" value={form.gender} onChange={update('gender')}>
                                <option value="">Prefer not to say</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <button className="btn btn-primary" type="submit" disabled={submitting}>
                        {submitting ? 'Creating account…' : 'Create account'}
                    </button>
                </form>
                <p className="auth-switch">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>
    );
}
