import { UserRegister } from '../models/user'
import { passwordEncrypt } from '../utils'

export const mockPassword = 'hola'
const mockHashPassword = await passwordEncrypt(mockPassword)

export const mockUserRegister = {
    name: 'Steve',
    email: 'steve@gmail.com',
    password: mockHashPassword,
    password_confirm: mockHashPassword,
} as UserRegister

export const mockUserRegisterNotHash = {
    name: 'Steve',
    email: 'steve@gmail.com',
    password: mockPassword,
    password_confirm: mockPassword,
} as UserRegister
