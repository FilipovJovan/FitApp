import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="page auth-shell">
            <div className="auth-box" style={{ textAlign: 'center' }}>
                <h1>404</h1>
                <p className="lede">That page isn't in the log.</p>
                <Link className="btn btn-primary" to="/">Back to plans</Link>
            </div>
        </div>
    );
}
