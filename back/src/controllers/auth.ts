import { setCookie } from 'hono/cookie'
import { insertUser, selectUser } from '../queries'
import { reponseBuild, passwordEncrypt } from '../utils'
import { UserRegister } from '../validators/schemas'
import { sign } from 'hono/jwt'
import { Answer } from '../models/answer'

export const createUser = async (c: any): Promise<Answer> => {
    const req = await c.req.json()

    const parserUser = UserRegister.safeParse(req)

    if (!parserUser.success) {
        console.error(parserUser.error)

        return reponseBuild('Content type invalid', 400)
    }

    req.password = await passwordEncrypt(req.password)

    try {
        insertUser(req)

        return reponseBuild('User created succesfully', 201)
    } catch {
        return reponseBuild('Email alredy registered', 200)
    }
}

export const loginUser = async (c: any): Promise<Answer> => {
    const req = await c.req.json()

    const user = selectUser(req.email)

    const invalid = reponseBuild('Invalid Credentials', 401)

    if (!user) {
        return invalid
    }

    const verify = await Bun.password.verify(req.password, user.password)

    if (!verify) {
        return invalid
    }

    const token = await createToken(user.id)

    setCookie(c, 'jwt', token)

    return reponseBuild('Succesful', 200)
}

const createToken = async (id: number): Promise<string> => {
    return await sign(id, Bun.env.JWT_TOKEN!)
}
