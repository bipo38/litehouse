import { Answer } from './types/answer'

export const currentDate = () => {
    return Intl.DateTimeFormat('es-ES').format(Date.now())
}

export const passwordEncrypt = async (pass: string): Promise<any> => {
    return await Bun.password.hash(pass)
}

export const reponseBuild = (message: any, status: number): Answer => {
    return { message: message, status: status }
}
