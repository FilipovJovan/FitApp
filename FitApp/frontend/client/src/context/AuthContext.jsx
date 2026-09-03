import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { setAuthToken } from '../api/client.js';
import * as authApi from '../api/auth.js';
import * as usersApi from '../api/users.js';

const AuthContext = createContext(null);

const STORAGE_KEY = 'fitapp_token';

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY));
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setAuthToken(token);
    }, [token]);

    useEffect(() => {
        let cancelled = false;
        async function loadUser() {
            if (!token) {
                setReady(true);
                return;
            }
            try {
                const me = await usersApi.getMe();
                if (!cancelled) setUser(me);
            } catch {
                if (!cancelled) {
                    setToken(null);
                    localStorage.removeItem(STORAGE_KEY);
                }
            } finally {
                if (!cancelled) setReady(true);
            }
        }
        loadUser();
        return () => { cancelled = true; };
    }, [token]);

    const persistSession = useCallback((sessionToken, sessionUser) => {
        localStorage.setItem(STORAGE_KEY, sessionToken);
        setAuthToken(sessionToken);
        setToken(sessionToken);
        setUser(sessionUser);
    }, []);

    const login = useCallback(async (email, password) => {
        const { user: loggedInUser, token: newToken } = await authApi.login({ email, password });
        persistSession(newToken, loggedInUser);
    }, [persistSession]);

    const register = useCallback(async (payload) => {
        const { user: newUser, token: newToken } = await authApi.register(payload);
        persistSession(newToken, newUser);
    }, [persistSession]);

    const logout = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        setAuthToken(null);
        setToken(null);
        setUser(null);
    }, []);

    const refreshUser = useCallback(async () => {
        const me = await usersApi.getMe();
        setUser(me);
        return me;
    }, []);

    return (
        <AuthContext.Provider value={{ token, user, ready, login, register, logout, refreshUser, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
