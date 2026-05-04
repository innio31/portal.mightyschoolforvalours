export const ROLES = {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    STAFF: 'staff',
    PARENT: 'parent',
} as const

export type UserRole = typeof ROLES[keyof typeof ROLES]

export const GRADE_SCALES = {
    'A': { min: 75, max: 100, remark: 'Excellent' },
    'B': { min: 65, max: 74, remark: 'Very Good' },
    'C': { min: 55, max: 64, remark: 'Good' },
    'D': { min: 45, max: 54, remark: 'Credit' },
    'E': { min: 40, max: 44, remark: 'Pass' },
    'F': { min: 0, max: 39, remark: 'Fail' },
}

export function computeGrade(score: number): { grade: string; remark: string } {
    for (const [grade, range] of Object.entries(GRADE_SCALES)) {
        if (score >= range.min && score <= range.max) {
            return { grade, remark: range.remark }
        }
    }
    return { grade: 'F', remark: 'Fail' }
}

export const TERMS = ['First Term', 'Second Term', 'Third Term'] as const
export type Term = typeof TERMS[number]