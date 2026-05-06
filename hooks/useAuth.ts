// hooks/useAuth.ts
'use client'

import { useEffect, useState } from 'react'
import { getUser, User, isAuthenticated, logout } from '@/lib/auth'

export function useAuth() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedUser = getUser()
        setUser(storedUser)
        setLoading(false)
    }, [])

    return {
        user,
        loading,
        isAuthenticated: isAuthenticated(),
        logout
    }
}