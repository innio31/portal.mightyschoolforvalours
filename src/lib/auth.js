const KEY = 'sms_user';

export const getUser = () => {
    if (typeof window === 'undefined') return null;
    try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; }
};
export const setUser = (data) => localStorage.setItem(KEY, JSON.stringify(data));
export const clearUser = () => localStorage.removeItem(KEY);
export const isLoggedIn = () => !!getUser()?.token;
export const hasRole = (role) => getUser()?.role === role;