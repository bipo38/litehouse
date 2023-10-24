import { afterAll, beforeAll, describe, expect, test } from 'bun:test'
import { app } from '../../index'
import { deleteFromDb, insertUser } from '../../queries'
import { init as initMigrations } from '../../migrations'
import { unlinkSync } from 'node:fs'
import { passwordEncrypt } from '../../utils'

beforeAll(() => {
    process.env.DB_NAME = 'test.db'

    initMigrations()
})

afterAll(() => {
    unlinkSync(Bun.env.DB_NAME!)
})

describe('Register Controller', () => {
    test('Create user: POST /register', async () => {
        const user = {
            name: 'Pete',
            email: 'barfooo@gmail.com',
            password: 'hola',
            password_confirm: 'hola',
        }

        const req = new Request('http://localhost/register', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const res = await app.request(req)

        expect(res.status).toBe(201)

        deleteFromDb('users', 'email', user.email)
    })

    test('User registered: POST /register', async () => {
        const user = {
            name: 'Pete',
            email: 'peter@gmail.com',
            password: 'hola',
            password_confirm: 'hola',
        }

        insertUser(user)

        const req = new Request('http://localhost/register', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const res = await app.request(req)
        expect(res.status).toBe(200)

        deleteFromDb('users', 'email', user.email)
    })
})

describe('Login Controller', async () => {
    test('Login user: POST /login', async () => {
        const password = 'hola'
        const passwordHash = await passwordEncrypt(password)

        const user = {
            name: 'Steve',
            email: 'steve@gmail.com',
            password: passwordHash,
            password_confirm: passwordHash,
        }

        insertUser(user)

        const req = new Request('http://localhost/login', {
            method: 'POST',
            body: JSON.stringify({
                email: user.email,
                password: password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const res = await app.request(req)

        expect(res.status).toBe(200)
        expect(res.headers.get('Set-Cookie')).toStartWith('jwt=')

        deleteFromDb('users', 'email', user.email)
    })

    test('Invalid user: POST /login', async () => {
        const password = 'hola'
        const passwordHash = await passwordEncrypt(password)

        const user = {
            name: 'Steve',
            email: 'steve@gmail.com',
            password: passwordHash,
            password_confirm: passwordHash,
        }

        insertUser(user)

        const req = new Request('http://localhost/login', {
            method: 'POST',
            body: JSON.stringify({
                email: user.email,
                password: 'password',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const res = await app.request(req)

        expect(res.status).toBe(401)
        expect(res.headers.get('Set-Cookie')).toBe(null)

        deleteFromDb('users', 'email', user.email)
    })
})
