'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import api from '@/lib/api'
import Link from 'next/link'
import {
    ArrowLeftIcon,
    PencilIcon,
    TrashIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    CalendarIcon,
    IdentificationIcon,
    UserGroupIcon,
    AcademicCapIcon
} from '@heroicons/react/24/outline'

interface Student {
    id: number
    admission_number: string
    first_name: string
    last_name: string
    other_name: string | null
    date_of_birth: string
    gender: string
    state_of_origin: string | null
    religion: string | null
    blood_group: string | null
    genotype: string | null
    home_address: string | null
    is_active: number
    admission_date: string
    class_name: string | null
    class_arm_name: string | null
    parent_name: string | null
}

export default function StudentDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const { user } = useAuth()
    const [student, setStudent] = useState<Student | null>(null)
    const [loading, setLoading] = useState(true)
    const [deleting, setDeleting] = useState(false)

    const studentId = params.id as string

    useEffect(() => {
        fetchStudent()
    }, [studentId])

    const fetchStudent = async () => {
        try {
            const response = await api.fetchStudentById(parseInt(studentId))
            if (response.success) {
                setStudent(response.data)
            } else {
                console.error('Student not found')
            }
        } catch (error) {
            console.error('Failed to fetch student:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (confirm(`Are you sure you want to delete ${student?.first_name} ${student?.last_name}? This action cannot be undone.`)) {
            setDeleting(true)
            try {
                const response = await api.deleteStudent(parseInt(studentId))
                if (response.success) {
                    router.push('/students')
                } else {
                    alert('Failed to delete student')
                }
            } catch (error) {
                console.error('Failed to delete student:', error)
                alert('Failed to delete student')
            } finally {
                setDeleting(false)
            }
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1c3877]"></div>
            </div>
        )
    }

    if (!student) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Student not found</p>
                <Link href="/students" className="text-[#1c3877] hover:underline mt-2 inline-block">
                    Back to Students
                </Link>
            </div>
        )
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <Link
                        href="/students"
                        className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-[#1c3877]">
                            {student.first_name} {student.last_name}
                        </h1>
                        <p className="text-gray-500 mt-1">Admission No: {student.admission_number}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Link
                        href={`/students/${student.id}/edit`}
                        className="inline-flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                    >
                        <PencilIcon className="h-4 w-4" />
                        Edit
                    </Link>
                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors disabled:opacity-50"
                    >
                        <TrashIcon className="h-4 w-4" />
                        {deleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>

            {/* Status Banner */}
            <div className={`mb-6 p-4 rounded-lg ${student.is_active ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${student.is_active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className={`font-medium ${student.is_active ? 'text-green-700' : 'text-red-700'}`}>
                        {student.is_active ? 'Active Student' : 'Inactive Student'}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info - 2 columns on large screens */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Personal Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <IdentificationIcon className="h-5 w-5 text-[#1c3877]" />
                            Personal Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InfoItem label="Full Name" value={`${student.first_name} ${student.last_name} ${student.other_name || ''}`} />
                            <InfoItem label="Gender" value={student.gender?.charAt(0).toUpperCase() + student.gender?.slice(1)} />
                            <InfoItem label="Date of Birth" value={new Date(student.date_of_birth).toLocaleDateString()} />
                            <InfoItem label="State of Origin" value={student.state_of_origin || 'Not specified'} />
                            <InfoItem label="Religion" value={student.religion || 'Not specified'} />
                            <InfoItem label="Blood Group" value={student.blood_group || 'Not specified'} />
                            <InfoItem label="Genotype" value={student.genotype || 'Not specified'} />
                        </div>
                    </div>

                    {/* Academic Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <AcademicCapIcon className="h-5 w-5 text-[#1c3877]" />
                            Academic Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InfoItem label="Current Class" value={student.class_name ? `${student.class_name} ${student.class_arm_name || ''}` : 'Not assigned'} />
                            <InfoItem label="Admission Date" value={new Date(student.admission_date).toLocaleDateString()} />
                            <InfoItem label="Admission Number" value={student.admission_number} />
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <MapPinIcon className="h-5 w-5 text-[#1c3877]" />
                            Contact Information
                        </h2>
                        <div className="space-y-4">
                            <InfoItem label="Home Address" value={student.home_address || 'Not provided'} />
                        </div>
                    </div>
                </div>

                {/* Sidebar - 1 column */}
                <div className="space-y-6">
                    {/* Parent/Guardian Information */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <UserGroupIcon className="h-5 w-5 text-[#1c3877]" />
                            Parent/Guardian
                        </h2>
                        <div className="text-center py-4">
                            {student.parent_name ? (
                                <div>
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <UserGroupIcon className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <p className="font-medium text-gray-800">{student.parent_name}</p>
                                    <p className="text-sm text-gray-500 mt-1">Primary Contact</p>
                                </div>
                            ) : (
                                <div className="text-center py-6">
                                    <p className="text-gray-500 mb-3">No parent linked to this student</p>
                                    <Link
                                        href={`/students/${student.id}/link-parent`}
                                        className="text-sm text-[#1c3877] hover:underline"
                                    >
                                        Link Parent →
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
                        <div className="space-y-2">
                            <Link
                                href={`/attendance/students?student=${student.id}`}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                📋 View Attendance Records
                            </Link>
                            <Link
                                href={`/results/enter?student=${student.id}`}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                📊 Enter Results
                            </Link>
                            <Link
                                href={`/fees/record-payment?student=${student.id}`}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                💰 Record Fee Payment
                            </Link>
                            <Link
                                href={`/students/${student.id}/change-class`}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                🔄 Change Class
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Helper component for displaying information
function InfoItem({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className="text-sm text-gray-800">{value || 'Not specified'}</p>
        </div>
    )
}