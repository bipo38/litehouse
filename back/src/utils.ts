import { Answer } from './models/answer'

export const passwordEncrypt = async (pass: string): Promise<string> => {
    return await Bun.password.hash(pass)
}

export const responseBuild = (message: any, status: number): Answer => {
    return { content: message, status: status }
}

export const jwtPayload = (req: any): number => {
    return req.get('jwtPayload')
}
