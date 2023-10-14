import { sign } from 'hono/jwt'
import { Answer } from './types/answer'

export const currentDate = () => {
    return Intl.DateTimeFormat('es-ES').format(Date.now())
}

export const passwordEncrypt = async (pass: string): Promise<any> => {
    return await Bun.password.hash(pass)
}

export const answerBuild = (
    message: any,
    status: number,
    jwt?: string
): Answer => {
    if (jwt) {
        return { message: message, status: status, jwt: jwt }
    }

    return { message: message, status: status }
}
