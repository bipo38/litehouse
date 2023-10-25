export interface UserRegister {
    id: number
    name: string
    email: string
    password: string
    password_confirm: string
    created_at: Date
    updated_at: Date
}

export interface UserDefault {
    name: string
    email: string
    password: string
    password_confirm: string
}

export interface User {
    id: number
    email: string
    password: string
}
