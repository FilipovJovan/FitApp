import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="topbar">
            <NavLink to="/" className="wordmark">
                fit<span>log</span>
            </NavLink>
            <nav>
                <NavLink to="/" end>plans</NavLink>
                <NavLink to="/profile">{user ? user.name : 'profile'}</NavLink>
                <button className="linklike" onClick={handleLogout}>log out</button>
            </nav>
        </header>
    );
}
