import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute() {
    const { token, ready } = useAuth();
    const location = useLocation();

    if (!ready) return <div className="loading">Loading...</div>;

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
}
