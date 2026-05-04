export interface User {
    id: number
    email: string
    first_name: string
    last_name: string
    role: 'super_admin' | 'admin' | 'staff' | 'parent'
    school_id: number | null
    profile_photo?: string
}

export interface AuthResponse {
    token: string
    user: User
}

export function getUser(): User | null {
    if (typeof window === 'undefined') return null
    const userStr = localStorage.getItem('user')
    if (!userStr) return null
    try {
        return JSON.parse(userStr)
    } catch {
        return null
    }
}

export function getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('token')
}

export function isAuthenticated(): boolean {
    return !!getToken()
}

export function logout(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
}

export function hasRole(roles: string[]): boolean {
    const user = getUser()
    if (!user) return false
    return roles.includes(user.role)
}