import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-shell">
            <div className="auth-box">
                <h1>Log in</h1>
                <p className="lede">Pick up your training log where you left off.</p>
                {error && <div className="alert">{error}</div>}
                <form className="form-card" onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="btn btn-primary" type="submit" disabled={submitting}>
                        {submitting ? 'Logging in…' : 'Log in'}
                    </button>
                </form>
                <p className="auth-switch">
                    New here? <Link to="/register">Create an account</Link>
                </p>
            </div>
        </div>
    );
}
