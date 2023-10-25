import { UserDefault, UserRegister } from '../models/user'
import { passwordEncrypt } from '../utils'

export const mockPassword = 'hola'
const mockHashPassword = await passwordEncrypt(mockPassword)

export const mockUserDefault = {
    name: 'Steve',
    email: 'steve@gmail.com',
    password: mockHashPassword,
    password_confirm: mockHashPassword,
} as UserDefault

export const mockUserDefaultNotHash = {
    name: 'Steve',
    email: 'steve@gmail.com',
    password: mockPassword,
    password_confirm: mockPassword,
} as UserDefault
