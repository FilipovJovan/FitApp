const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

let authToken = null;

export const setAuthToken = (token) => {
    authToken = token;
};

async function request(path, { method = 'GET', body, auth = true } = {}) {
    const headers = { 'Content-Type': 'application/json' };
    if (auth && authToken) {
        headers.Authorization = `Bearer ${authToken}`;
    }

    const res = await fetch(`${BASE_URL}${path}`, {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (res.status === 204) return null;

    let data = null;
    try {
        data = await res.json();
    } catch {
        // no body
    }

    if (!res.ok) {
        const message = data?.error || `Request failed (${res.status})`;
        throw new Error(message);
    }

    return data;
}

export const api = {
    get: (path, opts) => request(path, { ...opts, method: 'GET' }),
    post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
    put: (path, body, opts) => request(path, { ...opts, method: 'PUT', body }),
    del: (path, opts) => request(path, { ...opts, method: 'DELETE' }),
};
