'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    HomeIcon,
    UsersIcon,
    AcademicCapIcon,
    UserGroupIcon,
    CalendarIcon,
    DocumentTextIcon,
    CurrencyDollarIcon,
    MegaphoneIcon,
    Cog6ToothIcon,
    XMarkIcon
} from '@heroicons/react/24/outline'

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
    userRole: string
}

const navigation = {
    admin: [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
        { name: 'Students', href: '/students', icon: UsersIcon },
        { name: 'Staff', href: '/staff', icon: UserGroupIcon },
        { name: 'Parents', href: '/parents', icon: AcademicCapIcon },
        { name: 'Classes', href: '/classes', icon: AcademicCapIcon },
        { name: 'Attendance', href: '/attendance', icon: CalendarIcon },
        { name: 'Results', href: '/results', icon: DocumentTextIcon },
        { name: 'Fees', href: '/fees', icon: CurrencyDollarIcon },
        { name: 'Announcements', href: '/announcements', icon: MegaphoneIcon },
        { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
    ],
    staff: [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
        { name: 'My Students', href: '/students', icon: UsersIcon },
        { name: 'Attendance', href: '/attendance', icon: CalendarIcon },
        { name: 'Enter Results', href: '/results/enter', icon: DocumentTextIcon },
        { name: 'Announcements', href: '/announcements', icon: MegaphoneIcon },
    ],
    parent: [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
        { name: 'My Children', href: '/students', icon: UsersIcon },
        { name: 'Results', href: '/results/view', icon: DocumentTextIcon },
        { name: 'Fees', href: '/fees', icon: CurrencyDollarIcon },
        { name: 'Announcements', href: '/announcements', icon: MegaphoneIcon },
    ],
}

export default function Sidebar({ isOpen, onClose, userRole }: SidebarProps) {
    const pathname = usePathname()
    const links = navigation[userRole as keyof typeof navigation] || navigation.parent

    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />
            )}

            {/* Sidebar */}
            <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-navy-deep transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <div>
                        <h1 className="text-white font-playfair font-bold text-lg">MSV Portal</h1>
                        <p className="text-gold-light text-xs">Mighty School for Valours</p>
                    </div>
                    <button onClick={onClose} className="lg:hidden text-white/70 hover:text-white">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                <nav className="mt-6 px-2 space-y-1">
                    {links.map((item) => {
                        const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={onClose}
                                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive
                                        ? 'bg-gold/20 text-gold-light border-l-3 border-gold'
                                        : 'text-white/70 hover:text-white hover:bg-white/10'
                                    }
                `}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                    <div className="text-white/40 text-xs text-center">
                        v1.0.0 | {userRole}
                    </div>
                </div>
            </div>
        </>
    )
}