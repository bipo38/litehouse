import { insertUser } from '../queries'
import { Answer } from '../types/answer'
import { answerBuild, passwordEncrypt } from '../utils'
import { z } from 'zod'
import { UserRegister } from '../validators/schemas'
import { sign } from 'hono/jwt'

export interface SignUpUser {
    name: string
    email: string
    password: string
    password_confirm: string
    // created_at: Date
}

export interface User {
    email: string
    password: string
}

export const createUser = async (user: SignUpUser): Promise<any> => {
    const parserUser = UserRegister.safeParse(user)

    if (!parserUser.success) {
        console.error(parserUser.error)

        return answerBuild('Content type invalid', 400)
    }

    user.password = await passwordEncrypt(user.password)

    try {
        const result = insertUser(user)
        console.log(result, 'user')

        const token = await sign('tu abuela', Bun.env.JWT_SECRET!)

        return answerBuild('User created succesfully', 201, token)
    } catch {
        return answerBuild('Email alredy registered', 200)
    }
}
