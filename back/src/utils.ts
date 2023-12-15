import { boolean } from 'zod'
import { Answer } from './models/answer'

export const passwordEncrypt = async (pass: string): Promise<string> => {
    return await Bun.password.hash(pass)
}

export const responseBuild = (
    data: any,
    status: number,
    ok: boolean
): Answer => {
    return { data, status, ok }
}

export const jwtPayload = (req: any): number => {
    return req.get('jwtPayload')
}

export const parseDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US').format(new Date(date))
}
