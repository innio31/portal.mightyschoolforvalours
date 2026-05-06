// lib/api.ts
import axios from 'axios'

const API_BASE = 'https://impactdigitalacademy.com.ng/school_management/api'

const apiClient = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Add token to every request
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Handle 401 responses
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

// Auth endpoints
export const login = async (email: string, password: string) => {
    const response = await apiClient.post('/auth/login.php', { email, password })
    return response.data
}

// Student endpoints
export const fetchStudents = async () => {
    const response = await apiClient.get('/students/index.php')
    return response.data
}

export const fetchStudentById = async (id: number) => {
    const response = await apiClient.get(`/students/single.php?id=${id}`)
    return response.data
}

export const createStudent = async (data: any) => {
    const response = await apiClient.post('/students/index.php', data)
    return response.data
}

export const updateStudent = async (id: number, data: any) => {
    const response = await apiClient.put(`/students/single.php?id=${id}`, data)
    return response.data
}

export const deleteStudent = async (id: number) => {
    const response = await apiClient.delete(`/students/single.php?id=${id}`)
    return response.data
}

// Staff endpoints
export const fetchStaff = async () => {
    const response = await apiClient.get('/staff/index.php')
    return response.data
}

export const createStaff = async (data: any) => {
    const response = await apiClient.post('/staff/index.php', data)
    return response.data
}

// Parent endpoints
export const fetchParents = async () => {
    const response = await apiClient.get('/parents/index.php')
    return response.data
}

export const createParent = async (data: any) => {
    const response = await apiClient.post('/parents/index.php', data)
    return response.data
}

// Class endpoints
export const fetchClasses = async () => {
    const response = await apiClient.get('/classes/index.php')
    return response.data
}

// Dashboard endpoints
export const fetchDashboardStats = async () => {
    const response = await apiClient.get('/dashboard/stats.php')
    return response.data
}

// Enrollment endpoints
export const enrollStudent = async (studentId: number, classArmId: number) => {
    const response = await apiClient.post('/students/enroll.php', {
        student_id: studentId,
        class_arm_id: classArmId,
    })
    return response.data
}

export const changeStudentClass = async (studentId: number, classArmId: number, sessionId: number) => {
    const response = await apiClient.put('/students/change-class.php', {
        student_id: studentId,
        class_arm_id: classArmId,
        session_id: sessionId,
    })
    return response.data
}

// Default export for simple usage
const api = {
    client: apiClient,
    login,
    fetchStudents,
    fetchStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    fetchStaff,
    createStaff,
    fetchParents,
    createParent,
    fetchClasses,
    fetchDashboardStats,
    enrollStudent,
    changeStudentClass,
}

export default api