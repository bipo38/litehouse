export interface User {
    id: number
    name: string
    email: string
    password: string
    password_confirm: string
    createdAt: Date
    updatedAt: Date
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
