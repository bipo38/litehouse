import { afterEach, beforeAll, beforeEach, describe, expect, test } from "bun:test"
import { init as initMigrations } from '../../migrations'
import { insertUser, selectUserByEmail } from "../../db/queries/user"
import { mockUserRegister } from "../../mocks/user"
import { sign } from "hono/jwt"
import { app } from '../../index'
import { unlinkSync } from "fs"



beforeAll(() => {
    process.env.DB_NAME = 'test.db'
})

beforeEach(() => {
    initMigrations()
})
afterEach(() => {
    unlinkSync(Bun.env.DB_NAME!)
})

describe('Show User Controller', () => {
    test('Show User: GET /api/user', async () => {
        insertUser(mockUserRegister)

        const getUser = selectUserByEmail(mockUserRegister.email)

        const token = 'jwt=' + (await sign(getUser.id, Bun.env.JWT_SECRET!))


        const req = new Request('http://localhost/api/user', {
            method: 'GET',
            credentials: 'include',

            headers: {
                'Content-Type': 'application/json',
                Cookie: token,
            },
        })

        const res = await app.request(req)

        expect(res.status).toBe(200)
    })

    // test('Unauthorized: GET /api/reports', async () => {
    //     const res = await app.request('api/reports')
    //     expect(res.status).toBe(401)
    // })
})