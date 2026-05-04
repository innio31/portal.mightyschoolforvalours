const BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function apiFetch(path, options = {}) {
    const user = JSON.parse(localStorage.getItem('sms_user') || '{}');
    const res = await fetch(`${BASE}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(user.token ? { Authorization: `Bearer ${user.token}` } : {}),
        },
        ...options,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Request failed');
    return data;
}