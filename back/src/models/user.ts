export interface User {
    id: number
    name: string
    email: string
    password: string
    password_confirm: string
    created_at: Date
    updated_at: Date
}

export interface UserRegister {
    name: string
    email: string
    password: string
    password_confirm: string
}

export interface UserBase {
    id: number
    email: string
    password: string
}
