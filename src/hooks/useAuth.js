import { useEffect, useState } from 'react';
import { getUser } from '@/lib/auth';

export function useAuth() {
    const [user, setUser] = useState(null);
    useEffect(() => { setUser(getUser()); }, []);
    return { user, isAdmin: user?.role === 'admin', isStaff: user?.role === 'staff', isParent: user?.role === 'parent' };
}