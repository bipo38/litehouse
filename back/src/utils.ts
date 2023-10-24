import { Answer } from './types/answer'

export const passwordEncrypt = async (pass: string): Promise<string> => {
    return await Bun.password.hash(pass)
}

export const reponseBuild = (message: any, status: number): Answer => {
    return { content: message, status: status }
}
