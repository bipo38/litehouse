export interface UserRegister {
    id: number
    name: string
    email: string
    password: string
    password_confirm: string
    createdAt: Date
    updatedAt: Date
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
