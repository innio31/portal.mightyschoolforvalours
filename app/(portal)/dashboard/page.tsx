'use client'

import { useAuth } from '@/hooks/useAuth'
import {
    UsersIcon,
    UserGroupIcon,
    AcademicCapIcon,
    CurrencyDollarIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline'

type ColorKey = 'blue' | 'green' | 'purple' | 'orange'

interface StatCardProps {
    title: string
    value: string | number
    icon: React.ComponentType<{ className?: string }>
    trend: string
    color: ColorKey
}

function StatCard({ title, value, icon: Icon, trend, color }: StatCardProps) {
    const colorMap: Record<ColorKey, string> = {
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
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${colorMap[color]}`}>
                    <Icon className="h-6 w-6" />
                </div>
            </div>
        </div>
    )
}

function ActivityItem({ title, time, type }: { title: string; time: string; type: string }) {
    return (
        <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
            <div>
                <p className="text-sm font-medium text-gray-700">{title}</p>
                <p className="text-xs text-gray-400">{time}</p>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 capitalize">{type}</span>
        </div>
    )
}

function EventItem({ title, date }: { title: string; date: string }) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
            <span className="text-sm text-gray-700">{title}</span>
            <span className="text-xs text-gray-400">{date}</span>
        </div>
    )
}

function ScheduleItem({ time, subject, class: className }: { time: string; subject: string; class: string }) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
            <div className="flex gap-3">
                <span className="text-sm font-medium text-[#1c3877]">{time}</span>
                <span className="text-sm text-gray-700">{subject}</span>
            </div>
            <span className="text-xs text-gray-400">{className}</span>
        </div>
    )
}

function ChildProgressItem({ name, class: className, average, status }: { name: string; class: string; average: string; status: string }) {
    const statusColor = status === 'Excellent' ? 'text-green-600 bg-green-50' : 'text-blue-600 bg-blue-50'
    return (
        <div className="flex justify-between items-center">
            <div>
                <p className="font-medium text-gray-800">{name}</p>
                <p className="text-xs text-gray-400">{className}</p>
            </div>
            <div className="text-right">
                <p className="font-semibold text-gray-800">{average}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor}`}>{status}</span>
            </div>
        </div>
    )
}

export default function DashboardPage() {
    const { user } = useAuth()

    if (!user) {
        return <div className="flex justify-center items-center h-64">Loading...</div>
    }

    if (user.role === 'admin') {
        return (
            <div>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-[#1c3877]">Welcome back, {user.first_name}!</h1>
                    <p className="text-gray-500 mt-1">Here's what's happening at Mighty School for Valours.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard title="Total Students" value="342" icon={UsersIcon} trend="+12 this term" color="blue" />
                    <StatCard title="Total Staff" value="48" icon={UserGroupIcon} trend="4 departments" color="green" />
                    <StatCard title="Classes" value="18" icon={AcademicCapIcon} trend="Pre-School to SSS" color="purple" />
                    <StatCard title="Fee Collection" value="₦2.4M" icon={CurrencyDollarIcon} trend="74% completion" color="orange" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                            <ActivityItem title="New student enrollment" time="2 hours ago" type="student" />
                            <ActivityItem title="Fee payment received" time="Yesterday" type="fee" />
                            <ActivityItem title="Staff meeting scheduled" time="Yesterday" type="staff" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-semibold text-gray-800 mb-4">Upcoming Events</h3>
                        <div className="space-y-3">
                            <EventItem title="PTA Meeting" date="Mar 15, 2025" />
                            <EventItem title="Mid-Term Exams" date="Mar 20-25, 2025" />
                            <EventItem title="Sports Day" date="Apr 5, 2025" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (user.role === 'staff') {
        return (
            <div>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-[#1c3877]">Welcome back, {user.first_name}!</h1>
                    <p className="text-gray-500 mt-1">Here's your teaching dashboard.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard title="My Students" value="28" icon={UsersIcon} trend="JSS 2A" color="blue" />
                    <StatCard title="Subjects" value="4" icon={AcademicCapIcon} trend="Math, English, etc." color="green" />
                    <StatCard title="Attendance Rate" value="94%" icon={CheckCircleIcon} trend="This month" color="purple" />
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Today's Schedule</h3>
                    <div className="space-y-3">
                        <ScheduleItem time="8:00 AM" subject="Mathematics" class="JSS 2A" />
                        <ScheduleItem time="9:00 AM" subject="English" class="JSS 2A" />
                        <ScheduleItem time="10:00 AM" subject="Break" class="-" />
                        <ScheduleItem time="11:00 AM" subject="Physics" class="SSS 1" />
                    </div>
                </div>
            </div>
        )
    }

    // Parent view
    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#1c3877]">Welcome back, {user.first_name}!</h1>
                <p className="text-gray-500 mt-1">Track your children's progress here.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="My Children" value="2" icon={UsersIcon} trend="Active students" color="blue" />
                <StatCard title="Outstanding Fees" value="₦45,000" icon={CurrencyDollarIcon} trend="Due: Mar 15" color="orange" />
                <StatCard title="Avg Performance" value="78%" icon={AcademicCapIcon} trend="Above average" color="green" />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Children's Progress</h3>
                <div className="space-y-4">
                    <ChildProgressItem name="Oluwafemi Adeyemi" class="JSS 2A" average="82%" status="Excellent" />
                    <ChildProgressItem name="Adaeze Adeyemi" class="Primary 4" average="76%" status="Good" />
                </div>
            </div>
        </div>
    )
}