import { setCookie } from 'hono/cookie'
import { insertUser, selectUserByEmail } from '../db/queries/user'
import { responseBuild, passwordEncrypt } from '../utils'
import { ValidateUserLogin, ValidateUserRegister } from '../validators/schemas'
import { sign } from 'hono/jwt'
import { Answer } from '../models/answer'
import { User, UserBase } from '../models/user'


export const saveUser = async (c: any): Promise<Answer> => {
    const req = await c.req.json()

    const validateUser = ValidateUserRegister.safeParse(req)

    if (!validateUser.success) {
        return responseBuild('Content type invalid', 422 , false)
    }

    req.password = await passwordEncrypt(req.password)

    try {
        insertUser(req)

        return responseBuild('Succesful register', 201 , true)
    } catch {
        return responseBuild('Failed creating user', 200 , true)
    }
}

export const loginUser = async (c: any): Promise<Answer> => {
    const req = await c.req.json()

    const invalid = responseBuild('Invalid Credentials', 401, false)

    const validateUser = ValidateUserLogin.safeParse(req)

    if (!validateUser.success) {
        return responseBuild('Content type invalid', 422, false)
    }

    const user = selectUserByEmail(req.email)
    if (!user) {
        return invalid
    }

    const verify = await Bun.password.verify(req.password, user.password)

    if (!verify) {
        return invalid
    }

    setCookie(c, 'jwt', await createToken(user.id))


    return responseBuild({ name: user.name, email: user.email } as UserBase, 200 , true)
}

const createToken = async (id: number): Promise<string> => {
    return await sign(id, Bun.env.JWT_TOKEN!)
}
