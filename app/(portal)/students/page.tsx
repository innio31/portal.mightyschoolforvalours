'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import api from '@/lib/api'
import Link from 'next/link'
import { PencilIcon, TrashIcon, PlusIcon, EyeIcon } from '@heroicons/react/24/outline'

interface Student {
    id: number
    admission_number: string
    first_name: string
    last_name: string
    other_name: string | null
    gender: string
    class_name: string | null
    class_arm_name: string | null
    is_active: number
    parent_name: string | null
}

export default function StudentsPage() {
    const { user } = useAuth()
    const [students, setStudents] = useState<Student[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        fetchStudents()
    }, [])

    const fetchStudents = async () => {
        try {
            const response = await api.fetchStudents()
            if (response.success) {
                setStudents(response.data)
            }
        } catch (error) {
            console.error('Failed to fetch students:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete ${name}?`)) {
            try {
                const response = await api.deleteStudent(id)
                if (response.success) {
                    fetchStudents() // Refresh list
                }
            } catch (error) {
                console.error('Failed to delete student:', error)
                alert('Failed to delete student')
            }
        }
    }

    const filteredStudents = students.filter(student =>
        `${student.first_name} ${student.last_name} ${student.admission_number}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    )

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1c3877]"></div>
            </div>
        )
    }

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#1c3877]">Students</h1>
                    <p className="text-gray-500 mt-1">Manage all students enrolled in the school</p>
                </div>
                <Link
                    href="/students/new"
                    className="inline-flex items-center gap-2 bg-[#e23639] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#b82c2e] transition-colors"
                >
                    <PlusIcon className="h-5 w-5" />
                    Add New Student
                </Link>
            </div>

            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by name or admission number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c3877]"
                />
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Admission No.</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Full Name</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Gender</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Class</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Parent</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredStudents.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-12 text-gray-500">
                                        No students found
                                    </td>
                                </tr>
                            ) : (
                                filteredStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {student.admission_number}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">
                                                {student.first_name} {student.last_name}
                                            </div>
                                            {student.other_name && (
                                                <div className="text-xs text-gray-500">({student.other_name})</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                                            {student.gender}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {student.class_name} {student.class_arm_name || ''}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {student.parent_name || 'Not linked'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2 py-1 text-xs rounded-full ${student.is_active
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                                }`}>
                                                {student.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <Link
                                                    href={`/students/${student.id}`}
                                                    className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                >
                                                    <EyeIcon className="h-5 w-5" />
                                                </Link>
                                                <Link
                                                    href={`/students/${student.id}/edit`}
                                                    className="p-1 text-amber-600 hover:bg-amber-50 rounded transition-colors"
                                                >
                                                    <PencilIcon className="h-5 w-5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(student.id, `${student.first_name} ${student.last_name}`)}
                                                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}