'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import api from '@/lib/api'  // This now works with default export
import {
    UsersIcon,
    UserGroupIcon,
    AcademicCapIcon,
    CurrencyDollarIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline'

export default function DashboardPage() {
    const { user } = useAuth()
    const [stats, setStats] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            fetchStats()
        }
    }, [user])

    const fetchStats = async () => {
        try {
            const response = await api.fetchDashboardStats()
            if (response.success) {
                setStats(response.data)
            }
        } catch (error) {
            console.error('Failed to fetch stats:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1c3877] mx-auto"></div>
                    <p className="mt-4 text-gray-500">Loading dashboard...</p>
                </div>
            </div>
        )
    }

    // Admin Dashboard with real data
    if (user?.role === 'admin' || user?.role === 'super_admin') {
        return (
            <div>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-[#1c3877]">Welcome back, {user.first_name}!</h1>
                    <p className="text-gray-500 mt-1">
                        {stats?.current_term?.term_name || 'Current Term'} ({stats?.current_term?.session_name || '2024/2025'})
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard title="Total Students" value={stats?.students || 0} icon={UsersIcon} trend="Active Students" color="blue" />
                    <StatCard title="Total Staff" value={stats?.staff || 0} icon={UserGroupIcon} trend="Teaching + Non-teaching" color="green" />
                    <StatCard title="Parents" value={stats?.parents || 0} icon={AcademicCapIcon} trend="Registered Parents" color="purple" />
                    <StatCard title="Fee Collection" value="₦0" icon={CurrencyDollarIcon} trend="Coming Soon" color="orange" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                            <ActivityItem title="New student enrollment" time="Recent" type="student" />
                            <ActivityItem title="Fee payment recorded" time="Recent" type="fee" />
                            <ActivityItem title="Staff attendance marked" time="Today" type="staff" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <QuickActionItem title="Register New Student" link="/students/new" icon="👨‍🎓" />
                            <QuickActionItem title="Mark Attendance" link="/attendance" icon="📋" />
                            <QuickActionItem title="Create Announcement" link="/announcements/new" icon="📢" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Staff Dashboard
    if (user?.role === 'staff') {
        return (
            <div>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-[#1c3877]">Welcome back, {user.first_name}!</h1>
                    <p className="text-gray-500 mt-1">Staff Dashboard - Manage your classes and students</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard title="My Students" value="0" icon={UsersIcon} trend="Assigned to you" color="blue" />
                    <StatCard title="Subjects" value="0" icon={AcademicCapIcon} trend="Teaching" color="green" />
                    <StatCard title="Attendance" value="0%" icon={CheckCircleIcon} trend="Today" color="purple" />
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Today's Schedule</h3>
                    <div className="text-center py-8 text-gray-500">
                        No classes scheduled for today
                    </div>
                </div>
            </div>
        )
    }

    // Parent Dashboard
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#1c3877]">Welcome back, {user.first_name}!</h1>
                <p className="text-gray-500 mt-1">Track your children's academic progress</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="My Children" value="0" icon={UsersIcon} trend="Linked to you" color="blue" />
                <StatCard title="Outstanding Fees" value="₦0" icon={CurrencyDollarIcon} trend="Current term" color="orange" />
                <StatCard title="Avg Performance" value="0%" icon={AcademicCapIcon} trend="This term" color="green" />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Children's Progress</h3>
                <div className="text-center py-8 text-gray-500">
                    No children linked to your account yet. Contact the school administrator.
                </div>
            </div>
        </div>
    )
}

// Helper Components
function StatCard({ title, value, icon: Icon, trend, color }: any) {
    const colorClasses: Record<string, string> = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        purple: 'bg-purple-50 text-purple-600',
        orange: 'bg-orange-50 text-orange-600',
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm">{title}</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
                    <p className="text-xs text-gray-400 mt-2">{trend}</p>
                </div>
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${colorClasses[color] || 'bg-gray-50 text-gray-600'}`}>
                    <Icon className="h-6 w-6" />
                </div>
            </div>
        </div>
    )
}

function ActivityItem({ title, time, type }: { title: string; time: string; type: string }) {
    const typeColors: Record<string, string> = {
        student: 'bg-blue-100 text-blue-700',
        staff: 'bg-green-100 text-green-700',
        fee: 'bg-orange-100 text-orange-700',
    }

    return (
        <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
            <div>
                <p className="text-sm font-medium text-gray-700">{title}</p>
                <p className="text-xs text-gray-400">{time}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${typeColors[type] || 'bg-gray-100 text-gray-600'}`}>
                {type}
            </span>
        </div>
    )
}

function QuickActionItem({ title, link, icon }: { title: string; link: string; icon: string }) {
    return (
        <a
            href={link}
            className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
        >
            <span className="text-xl">{icon}</span>
            <span className="text-sm font-medium text-gray-700">{title}</span>
            <span className="ml-auto text-gray-400">→</span>
        </a>
    )
}