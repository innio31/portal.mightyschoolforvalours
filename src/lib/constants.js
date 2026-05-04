export const ROLES = { ADMIN: 'admin', STAFF: 'staff', PARENT: 'parent' };

export const NAV_ITEMS = [
    { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard', roles: ['admin', 'staff', 'parent'] },
    { label: 'Students', href: '/students', icon: 'Users', roles: ['admin', 'staff'] },
    { label: 'Staff', href: '/staff', icon: 'Briefcase', roles: ['admin'] },
    { label: 'Parents', href: '/parents', icon: 'Heart', roles: ['admin'] },
    { label: 'Classes', href: '/classes', icon: 'School', roles: ['admin', 'staff'] },
    { label: 'Attendance', href: '/attendance', icon: 'CalendarCheck', roles: ['admin', 'staff'] },
    { label: 'Results', href: '/results', icon: 'ClipboardList', roles: ['admin', 'staff', 'parent'] },
    { label: 'Fees', href: '/fees', icon: 'Wallet', roles: ['admin', 'parent'] },
    { label: 'Announcements', href: '/announcements', icon: 'Bell', roles: ['admin', 'staff', 'parent'] },
    { label: 'Settings', href: '/settings', icon: 'Settings', roles: ['admin'] },
];