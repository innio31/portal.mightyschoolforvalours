'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import api from '@/lib/api'
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
            const response = await api.get('/dashboard/stats.php')
            if (response.data.success) {
                setStats(response.data.data)
            }
        } catch (error) {
            console.error('Failed to fetch stats:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading dashboard...</div>
    }

    // Admin Dashboard with real data
    if (user?.role === 'admin') {
        return (
            <div>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-[#1c3877]">Welcome back, {user.first_name}!</h1>
                    <p className="text-gray-500 mt-1">
                        Current Term: {stats?.current_term?.term_name || 'N/A'} ({stats?.current_term?.session_name || 'N/A'})
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard title="Total Students" value={stats?.students || 0} icon={UsersIcon} trend="Active" color="blue" />
                    <StatCard title="Total Staff" value={stats?.staff || 0} icon={UserGroupIcon} trend="Teaching + Non-teaching" color="green" />
                    <StatCard title="Parents" value={stats?.parents || 0} icon={AcademicCapIcon} trend="Registered" color="purple" />
                    <StatCard title="Fee Collection" value="₦0" icon={CurrencyDollarIcon} trend="Coming soon" color="orange" />
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
        </div>
    )
}

function StatCard({ title, value, icon: Icon, trend, color }: any) {
    const colorClasses = {
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
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${colorClasses[color as keyof typeof colorClasses]}`}>
                    <Icon className="h-6 w-6" />
                </div>
            </div>
        </div>
    )
}