import { setCookie } from 'hono/cookie'
import { insertUser, selectUser } from '../queries'
import { reponseBuild, passwordEncrypt } from '../utils'
import { ValidateUserLogin, ValidateUserRegister } from '../validators/schemas'
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

        return reponseBuild('Succesful register', 201)
    } catch {
        return reponseBuild('Failed creatng user', 200)
    }
}

export const loginUser = async (c: any): Promise<Answer> => {
    const req = await c.req.json()

    const invalid = reponseBuild('Invalid Credentials', 401)

    const validateUser = ValidateUserLogin.safeParse(req)

    if (!validateUser.success) {
        return invalid
    }

    const user = selectUser(req.email)
    if (!user) {
        return invalid
    }

    const verify = await Bun.password.verify(req.password, user.password)

    if (!verify) {
        return invalid
    }

    setCookie(c, 'jwt', await createToken(user.id))

    return reponseBuild('Succesful Login', 200)
}

const createToken = async (id: number): Promise<string> => {
    return await sign(id, Bun.env.JWT_TOKEN!)
}
