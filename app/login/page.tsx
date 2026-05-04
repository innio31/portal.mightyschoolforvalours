'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            // TODO: Replace with actual API call to your backend
            // POST /api/auth/login
            // Expected response: { token, user: { id, role, first_name, last_name, email, school_id } }

            // Mock login for demo - REMOVE when backend is ready
            await new Promise(resolve => setTimeout(resolve, 800))

            if (email === 'admin@msv.edu.ng' && password === 'password') {
                const mockUser = {
                    id: 1,
                    email: 'admin@msv.edu.ng',
                    first_name: 'Admin',
                    last_name: 'User',
                    role: 'admin',
                    school_id: 1,
                }
                localStorage.setItem('token', 'mock-jwt-token')
                localStorage.setItem('user', JSON.stringify(mockUser))
                router.push('/dashboard')
            } else if (email === 'staff@msv.edu.ng' && password === 'password') {
                const mockUser = {
                    id: 2,
                    email: 'staff@msv.edu.ng',
                    first_name: 'Staff',
                    last_name: 'Member',
                    role: 'staff',
                    school_id: 1,
                }
                localStorage.setItem('token', 'mock-jwt-token')
                localStorage.setItem('user', JSON.stringify(mockUser))
                router.push('/dashboard')
            } else if (email === 'parent@msv.edu.ng' && password === 'password') {
                const mockUser = {
                    id: 3,
                    email: 'parent@msv.edu.ng',
                    first_name: 'Parent',
                    last_name: 'User',
                    role: 'parent',
                    school_id: 1,
                }
                localStorage.setItem('token', 'mock-jwt-token')
                localStorage.setItem('user', JSON.stringify(mockUser))
                router.push('/dashboard')
            } else {
                setError('Invalid email or password')
            }
        } catch (err) {
            setError('Login failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-navy-deep via-navy to-navy-dark flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
                        <span className="text-3xl">🏫</span>
                    </div>
                    <h1 className="text-3xl font-playfair font-bold text-white">Mighty School for Valours</h1>
                    <p className="text-gold-light mt-2">School Management Portal</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-navy mb-6">Welcome Back</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input"
                                placeholder="admin@msv.edu.ng"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full py-3 text-lg"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Logging in...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        <p>Demo Credentials:</p>
                        <p className="text-xs">admin@msv.edu.ng / password</p>
                        <p className="text-xs">staff@msv.edu.ng / password</p>
                        <p className="text-xs">parent@msv.edu.ng / password</p>
                    </div>
                </div>
            </div>
        </div>
    )
}