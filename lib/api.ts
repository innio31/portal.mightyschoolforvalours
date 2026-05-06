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

// Named exports for specific API functions
export const fetchStudents = async () => {
    const response = await apiClient.get('/students/index.php')
    return response.data
}

export const fetchStaff = async () => {
    const response = await apiClient.get('/staff/index.php')
    return response.data
}

export const fetchParents = async () => {
    const response = await apiClient.get('/parents/index.php')
    return response.data
}

export const fetchClasses = async () => {
    const response = await apiClient.get('/classes/index.php')
    return response.data
}

export const fetchDashboardStats = async () => {
    const response = await apiClient.get('/dashboard/stats.php')
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

// Default export for simple usage
const api = {
    client: apiClient,
    fetchStudents,
    fetchStaff,
    fetchParents,
    fetchClasses,
    fetchDashboardStats,
    createStudent,
    updateStudent,
    deleteStudent,
}

export default api