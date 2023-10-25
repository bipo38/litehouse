import {
    afterEach,
    beforeAll,
    beforeEach,
    describe,
    expect,
    test,
} from 'bun:test'
import { unlinkSync } from 'node:fs'
import { init as initMigrations } from '../../migrations'
import { mockUserRegister } from '../../mocks/user'
import { deleteFromDb, insertPage, insertUser, selectUser } from '../../queries'
import { sign } from 'hono/jwt'
import { mockPageBase, mockPageReq, mockPageReqWrong } from '../../mocks/page'
import { app } from '../../index'

beforeAll(() => {
    process.env.DB_NAME = 'test.db'
})

beforeEach(() => {
    initMigrations()
})

afterEach(() => {
    unlinkSync(Bun.env.DB_NAME!)
})

describe('Save Page Controller', () => {
    test('Save Page: POST /reports/page', async () => {
        insertUser(mockUserRegister)

        const user = selectUser(mockUserRegister.email)

        const token = await sign(user.id, Bun.env.JWT_SECRET!)

        const req = new Request('http://localhost/reports/page', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(mockPageReq),
            headers: {
                'Content-Type': 'application/json',
                Cookie: 'jwt='.concat(token),
            },
        })

        const res = await app.request(req)
        expect(res.status).toBe(201)
    })

    test('Invalid Page : POST /reports/page', async () => {
        insertUser(mockUserRegister)

        const user = selectUser(mockUserRegister.email)

        const token = await sign(user.id, Bun.env.JWT_SECRET!)

        const req = new Request('http://localhost/reports/page', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(mockPageReqWrong),
            headers: {
                'Content-Type': 'application/json',
                Cookie: 'jwt='.concat(token),
            },
        })

        const res = await app.request(req)
        expect(res.status).toBe(422)
    })

    test('Existing Page: POST /reports/page', async () => {
        insertUser(mockUserRegister)
        insertPage(mockPageBase)

        const user = selectUser(mockUserRegister.email)

        const token = await sign(user.id, Bun.env.JWT_SECRET!)

        const req = new Request('http://localhost/reports/page', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(mockPageReq),
            headers: {
                'Content-Type': 'application/json',
                Cookie: 'jwt='.concat(token),
            },
        })

        const res = await app.request(req)
        expect(res.status).toBe(409)
    })
})
