'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import api from '@/lib/api'
import Link from 'next/link'
import { ArrowLeftIcon, UserPlusIcon } from '@heroicons/react/24/outline'

interface ClassArm {
    id: number
    name: string
    class_name: string
}

export default function NewStudentPage() {
    const { user } = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [classArms, setClassArms] = useState<ClassArm[]>([])
    const [loadingClasses, setLoadingClasses] = useState(true)
    const [formData, setFormData] = useState({
        admission_number: '',
        first_name: '',
        last_name: '',
        other_name: '',
        date_of_birth: '',
        gender: '',
        class_arm_id: '',
        state_of_origin: '',
        religion: '',
        blood_group: '',
        genotype: '',
        home_address: '',
    })
    const [error, setError] = useState('')

    useEffect(() => {
        fetchClasses()
    }, [])

    const fetchClasses = async () => {
        try {
            const response = await api.fetchClasses()
            if (response.success) {
                // Flatten classes and arms into a single array for selection
                const arms: ClassArm[] = []
                response.data.forEach((classItem: any) => {
                    if (classItem.arms && classItem.arms.length > 0) {
                        classItem.arms.forEach((arm: any) => {
                            arms.push({
                                id: arm.id,
                                name: arm.name,
                                class_name: classItem.name,
                            })
                        })
                    }
                })
                setClassArms(arms)
            }
        } catch (error) {
            console.error('Failed to fetch classes:', error)
        } finally {
            setLoadingClasses(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const generateAdmissionNumber = () => {
        const year = new Date().getFullYear()
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
        const admissionNumber = `${year}/${random}`
        setFormData({
            ...formData,
            admission_number: admissionNumber,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        // Validate required fields
        if (!formData.admission_number || !formData.first_name || !formData.last_name || !formData.gender || !formData.date_of_birth) {
            setError('Please fill in all required fields')
            setLoading(false)
            return
        }

        try {
            // First create the student
            const studentData = {
                admission_number: formData.admission_number,
                first_name: formData.first_name,
                last_name: formData.last_name,
                other_name: formData.other_name || null,
                date_of_birth: formData.date_of_birth,
                gender: formData.gender,
                state_of_origin: formData.state_of_origin || null,
                religion: formData.religion || null,
                blood_group: formData.blood_group || null,
                genotype: formData.genotype || null,
                home_address: formData.home_address || null,
            }

            const response = await api.createStudent(studentData)

            if (response.success) {
                const studentId = response.data.id

                // If class arm is selected, enroll the student
                if (formData.class_arm_id) {
                    try {
                        await api.enrollStudent(studentId, parseInt(formData.class_arm_id))
                    } catch (enrollError) {
                        console.error('Failed to enroll student:', enrollError)
                        // Continue anyway - student was created
                    }
                }

                router.push(`/students/${studentId}`)
            } else {
                setError(response.error || 'Failed to create student')
            }
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to create student')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <Link
                    href="/students"
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-[#1c3877]">Add New Student</h1>
                    <p className="text-gray-500 mt-1">Register a new student in the system</p>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <form onSubmit={handleSubmit}>
                    {error && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Admission Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Admission Number <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    name="admission_number"
                                    value={formData.admission_number}
                                    onChange={handleChange}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c3877]"
                                    placeholder="2024/0001"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={generateAdmissionNumber}
                                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Generate
                                </button>
                            </div>
                        </div>

                        {/* Class Assignment */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Class Assignment
                            </label>
                            <select
                                name="class_arm_id"
                                value={formData.class_arm_id}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c3877]"
                                disabled={loadingClasses}
                            >
                                <option value="">Select Class</option>
                                {classArms.map((arm) => (
                                    <option key={arm.id} value={arm.id}>
                                        {arm.class_name} {arm.name}
                                    </option>
                                ))}
                            </select>
                            {loadingClasses && <p className="text-xs text-gray-500 mt-1">Loading classes...</p>}
                        </div>

                        {/* First Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c3877]"
                                placeholder="John"
                                required
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c3877]"
                                placeholder="Doe"
                                required
                            />
                        </div>

                        {/* Other Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Other Name
                            </label>
                            <input
                                type="text"
                                name="other_name"
                                value={formData.other_name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c3877]"
                                placeholder="Middle name (optional)"
                            />
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Date of Birth <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="date_of_birth"
                                value={formData.date_of_birth}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c3877]"
                                required
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Gender <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c3877]"
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        {/* State of Origin */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                State of Origin
                            </label>
                            <input
                                type="text"
                                name="state_of_origin"
                                value={formData.state_of_origin}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c3877]"
                                placeholder="Lagos, Ogun, etc."
                            />
                        </div>

                        {/* Religion */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Religion
                            </label>
                            <select
                                name="religion"
                                value={formData.religion}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c3877]"
                            >
                                <option value="">Select Religion</option>
                                <option value="Christianity">Christianity</option>
                                <option value="Islam">Islam</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Blood Group */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Blood Group
                            </label>
                            <select
                                name="blood_group"
                                value={formData.blood_group}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c3877]"
                            >
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>

                        {/* Genotype */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Genotype
                            </label>
                            <select
                                name="genotype"
                                value={formData.genotype}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c3877]"
                            >
                                <option value="">Select Genotype</option>
                                <option value="AA">AA</option>
                                <option value="AS">AS</option>
                                <option value="SS">SS</option>
                                <option value="AC">AC</option>
                            </select>
                        </div>

                        {/* Home Address - Full Width */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Home Address
                            </label>
                            <textarea
                                name="home_address"
                                value={formData.home_address}
                                onChange={handleChange}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c3877]"
                                placeholder="Full residential address"
                            />
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-3 mt-8 pt-4 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center gap-2 bg-[#e23639] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#b82c2e] transition-colors disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <UserPlusIcon className="h-5 w-5" />
                                    Create Student
                                </>
                            )}
                        </button>
                        <Link
                            href="/students"
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}