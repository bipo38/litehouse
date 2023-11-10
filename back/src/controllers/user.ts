import { selectUserById } from '../db/queries/user'
import { Answer } from '../models/answer'
import { UserBase } from '../models/user'
import { jwtPayload, responseBuild } from '../utils'

export const showUser = (c: any): Answer => {
    const payload = jwtPayload(c)

    try {

        const user = selectUserById(payload)
        return responseBuild({ name: user.name, email: user.email } as UserBase as UserBase, 200)
    } catch {
        return responseBuild('Unauthorized', 401)
    }
}
