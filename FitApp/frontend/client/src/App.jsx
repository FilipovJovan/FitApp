import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Navbar from './components/Navbar.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import PlansList from './pages/PlansList.jsx';
import PlanDetail from './pages/PlanDetail.jsx';
import WeekDetail from './pages/WeekDetail.jsx';
import DayDetail from './pages/DayDetail.jsx';
import Profile from './pages/Profile.jsx';
import NotFound from './pages/NotFound.jsx';

function AppLayout({ children }) {
    return (
        <div className="app-shell">
            <Navbar />
            {children}
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<AppLayout><PlansList /></AppLayout>} />
                        <Route path="/plans/:planId" element={<AppLayout><PlanDetail /></AppLayout>} />
                        <Route path="/plans/:planId/weeks/:weekId" element={<AppLayout><WeekDetail /></AppLayout>} />
                        <Route path="/days/:dayId" element={<AppLayout><DayDetail /></AppLayout>} />
                        <Route path="/profile" element={<AppLayout><Profile /></AppLayout>} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}
