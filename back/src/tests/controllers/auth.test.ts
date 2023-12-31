import {
    afterEach,
    beforeAll,
    beforeEach,
    describe,
    expect,
    test,
} from 'bun:test'
import { app } from '../../index'
import { insertUser } from '../../db/queries/user'
import { init as initMigrations } from '../../migrations'
import { unlinkSync } from 'node:fs'

import {
    mockPassword,
    mockUserRegister,
    mockUserRegisterNotHash,
    mockUserRegisterNotHashInvalid,
} from '../../mocks/user'

beforeAll(() => {
    process.env.DB_NAME = 'test.db'
})

beforeEach(() => {
    initMigrations()
})

afterEach(() => {
    unlinkSync(Bun.env.DB_NAME!)
})

describe('Register Controller', () => {
    test('Create user: POST /api/register', async () => {
        const req = new Request('http://localhost/api/register', {
            method: 'POST',
            body: JSON.stringify(mockUserRegisterNotHash),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const res = await app.request(req)

        expect(res.status).toBe(201)
    })

    test('User registered: POST /api/register', async () => {
        insertUser(mockUserRegister)

        const req = new Request('http://localhost/api/register', {
            method: 'POST',
            body: JSON.stringify(mockUserRegisterNotHash),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const res = await app.request(req)
        expect(res.status).toBe(200)
    })

    test('User Invalid Data Registered: POST /api/register', async () => {
        insertUser(mockUserRegister)

        const req = new Request('http://localhost/api/register', {
            method: 'POST',
            body: JSON.stringify(mockUserRegisterNotHashInvalid),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const res = await app.request(req)
        expect(res.status).toBe(422)
    })
})

describe('Login Controller', async () => {
    test('Login user: POST /api/login', async () => {
        insertUser(mockUserRegister)

        const req = new Request('http://localhost/api/login', {
            method: 'POST',
            body: JSON.stringify({
                email: mockUserRegister.email,
                password: mockPassword,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const res = await app.request(req)

        expect(res.status).toBe(200)
        expect(res.headers.get('Set-Cookie')).toStartWith('jwt=')
    })

    test('Invalid user: POST /api/login', async () => {
        insertUser(mockUserRegister)

        const req = new Request('http://localhost/api/login', {
            method: 'POST',
            body: JSON.stringify({
                email: mockUserRegister.email,
                password: mockPassword.concat('h'),
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const res = await app.request(req)

        expect(res.status).toBe(401)
        expect(res.headers.get('Set-Cookie')).toBe(null)
    })

    test('Invalid User Data: POST /api/login', async () => {
        insertUser(mockUserRegister)

        const req = new Request('http://localhost/api/login', {
            method: 'POST',
            body: JSON.stringify({
                email: '',
                password: mockPassword.concat('h'),
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const res = await app.request(req)

        expect(res.status).toBe(422)
        expect(res.headers.get('Set-Cookie')).toBe(null)
    })
})
