import {
    afterEach,
    beforeAll,
    beforeEach,
    describe,
    expect,
    test,
} from 'bun:test'
import { init as initMigrations } from '../../migrations'
import { unlinkSync } from 'node:fs'
import { insertReport, insertUser, selectUser } from '../../queries'
import { app } from '../../index'

import { sign } from 'hono/jwt'
import { mockAnalysis } from '../../mocks/analysis'
import { mockUserRegister } from '../../mocks/user'

beforeAll(() => {
    process.env.DB_NAME = 'test.db'
})

beforeEach(() => {
    initMigrations()
})

afterEach(() => {
    unlinkSync(Bun.env.DB_NAME!)
})

describe('Show Posts Controller', () => {
    test('Show Reports: GET /reports', async () => {
        insertUser(mockUserRegister)

        const getUser = selectUser(mockUserRegister.email)

        const token = 'jwt=' + (await sign(getUser.id, Bun.env.JWT_SECRET!))

        insertReport(mockAnalysis, 1)

        const req = new Request('http://localhost/reports', {
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

    test('Unauthorized: GET /reports', async () => {
        const res = await app.request('reports')
        expect(res.status).toBe(401)
    })
})

describe('Show post Controller', () => {
    test('Show report: GET /reports/:id', async () => {
        insertUser(mockUserRegister)

        const getUser = selectUser(mockUserRegister.email)

        const token = 'jwt=' + (await sign(getUser.id, Bun.env.JWT_SECRET!))

        insertReport(mockAnalysis, 1)

        const req = new Request('http://localhost/reports/1', {
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

    test('Not exist report: GET /reports/:id', async () => {
        insertUser(mockUserRegister)

        const getUser = selectUser(mockUserRegister.email)

        const token = 'jwt=' + (await sign(getUser.id, Bun.env.JWT_SECRET!))

        insertReport(mockAnalysis, 1)

        const req = new Request('http://localhost/reports/5', {
            method: 'GET',
            credentials: 'include',

            headers: {
                'Content-Type': 'application/json',
                Cookie: token,
            },
        })

        const res = await app.request(req)

        expect(res.status).toBe(404)
    })

    test('Unauthorized: GET /reports', async () => {
        const res = await app.request('reports/1')
        expect(res.status).toBe(401)
    })
})
