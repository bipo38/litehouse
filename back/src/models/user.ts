export interface RegisterUser {
    id: number
    name: string
    email: string
    password: string
    password_confirm: string
    // created_at: Date
}

export interface User {
    id: number
    email: string
    password: string
}
