import { setCookie } from 'hono/cookie'
import { insertUser, selectUser } from '../queries'
import { reponseBuild, passwordEncrypt } from '../utils'
import { ValidateUserRegister } from '../validators/schemas'
import { sign } from 'hono/jwt'
import { Answer } from '../models/answer'

export const saveUser = async (c: any): Promise<Answer> => {
    const req = await c.req.json()

    const validateUser = ValidateUserRegister.safeParse(req)

    if (!validateUser.success) {
        return reponseBuild('Content type invalid', 422)
    }

    req.password = await passwordEncrypt(req.password)

    try {
        insertUser(req)

        return reponseBuild('User created succesfully', 201)
    } catch {
        return reponseBuild('Failed creatng user', 200)
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
