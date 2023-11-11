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
import { insertUser, selectUserByEmail } from '../../db/queries/user'
import { sign } from 'hono/jwt'
import { mockPageReq, mockPageReqWrong } from '../../mocks/page'
import { app } from '../../index'
import { insertPage } from '../../db/queries/page'

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
    test('Save Page: POST /api/pages', async () => {
        insertUser(mockUserRegister)

        const user = selectUserByEmail(mockUserRegister.email)

        const token = await sign(user.id, Bun.env.JWT_SECRET!)

        const req = new Request('http://localhost/api/pages', {
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

    test('Invalid Page : POST /api/pages', async () => {
        insertUser(mockUserRegister)

        const user = selectUserByEmail(mockUserRegister.email)

        const token = await sign(user.id, Bun.env.JWT_SECRET!)

        const req = new Request('http://localhost/api/pages', {
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

    test('Insert Two Pages: POST /api/pages', async () => {
        insertUser(mockUserRegister)

        const user = selectUserByEmail(mockUserRegister.email)

        const token = await sign(user.id, Bun.env.JWT_SECRET!)

        insertPage(mockPageReq, user.id)

        const req = new Request('http://localhost/api/pages', {
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
})

describe('Show Pages Controller', () => {
    test('Get pages: GET /api/pages', async () => {
        insertUser(mockUserRegister)

        const user = selectUserByEmail(mockUserRegister.email)

        const token = await sign(user.id, Bun.env.JWT_SECRET!)

        insertPage(mockPageReq, user.id)

        const req = new Request('http://localhost/api/pages', {
            method: 'GET',
            credentials: 'include',
            body: JSON.stringify(mockPageReq),
            headers: {
                'Content-Type': 'application/json',
                Cookie: 'jwt='.concat(token),
            },
        })

        const res = await app.request(req)
        expect(res.status).toBe(200)
    })

    test('Get 0 pages: GET /api/pages', async () => {
        insertUser(mockUserRegister)

        const user = selectUserByEmail(mockUserRegister.email)

        const token = await sign(user.id, Bun.env.JWT_SECRET!)

        const req = new Request('http://localhost/api/pages', {
            method: 'GET',
            credentials: 'include',
            body: JSON.stringify(mockPageReq),
            headers: {
                'Content-Type': 'application/json',
                Cookie: 'jwt='.concat(token),
            },
        })

        const res = await app.request(req)
        expect(res.status).toBe(200)
    })
})

describe('Show Page Controller', () => {
    test('Show page GET /api/pages/:id', async () => {
        insertUser(mockUserRegister)

        const user = selectUserByEmail(mockUserRegister.email)

        const token = await sign(user.id, Bun.env.JWT_SECRET!)

        insertPage(mockPageReq, user.id)

        const req = new Request('http://localhost/api/pages/1', {
            method: 'GET',
            credentials: 'include',
            body: JSON.stringify(mockPageReq),
            headers: {
                'Content-Type': 'application/json',
                Cookie: 'jwt='.concat(token),
            },
        })

        const res = await app.request(req)
        expect(res.status).toBe(200)
    })

    test('Not found page GET /api/pages/:id', async () => {
        insertUser(mockUserRegister)

        const user = selectUserByEmail(mockUserRegister.email)

        const token = await sign(user.id, Bun.env.JWT_SECRET!)

        const req = new Request('http://localhost/api/pages/1', {
            method: 'GET',
            credentials: 'include',
            body: JSON.stringify(mockPageReq),
            headers: {
                'Content-Type': 'application/json',
                Cookie: 'jwt='.concat(token),
            },
        })

        const res = await app.request(req)
        expect(res.status).toBe(404)
    })
})

describe('Update Page Controller', () => {
    test('Update Page PUT /api/pages/:id', async () => {
        insertUser(mockUserRegister)

        const user = selectUserByEmail(mockUserRegister.email)

        const token = await sign(user.id, Bun.env.JWT_SECRET!)

        insertPage(mockPageReq, user.id)

        const r = mockPageReq
        r.title = 'pio'

        const req = new Request('http://localhost/api/pages/1', {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(r),
            headers: {
                'Content-Type': 'application/json',
                Cookie: 'jwt='.concat(token),
            },
        })

        const res = await app.request(req)
        expect(res.status).toBe(200)
    })

    test('Not Found Page PUT /api/pages/:id', async () => {
        insertUser(mockUserRegister)

        const user = selectUserByEmail(mockUserRegister.email)

        const token = await sign(user.id, Bun.env.JWT_SECRET!)

        const req = new Request('http://localhost/api/pages/1', {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(mockPageReq),
            headers: {
                'Content-Type': 'application/json',
                Cookie: 'jwt='.concat(token),
            },
        })

        const res = await app.request(req)
        expect(res.status).toBe(404)
    })

    test('Invalid Page PUT /api/pages/:id', async () => {
        insertUser(mockUserRegister)

        const user = selectUserByEmail(mockUserRegister.email)

        const token = await sign(user.id, Bun.env.JWT_SECRET!)

        const req = new Request('http://localhost/api/pages/1', {
            method: 'PUT',
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
})
