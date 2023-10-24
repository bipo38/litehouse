import { afterAll, beforeAll, describe, expect, test } from 'bun:test'
import { app } from '../../index'
import { deleteFromDb, insertUser } from '../../queries'
import { init as initMigrations } from '../../migrations'
import { unlinkSync } from 'node:fs'
import { passwordEncrypt } from '../../utils'
import {
    mockPassword,
    mockUserDefault,
    mockUserDefaultNotHash,
} from '../../mokcs/User'

beforeAll(() => {
    process.env.DB_NAME = 'test.db'

    initMigrations()
})

afterAll(() => {
    unlinkSync(Bun.env.DB_NAME!)
})

describe('Register Controller', () => {
    test('Create user: POST /register', async () => {
        const req = new Request('http://localhost/register', {
            method: 'POST',
            body: JSON.stringify(mockUserDefaultNotHash),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const res = await app.request(req)

        expect(res.status).toBe(201)

        deleteFromDb('users', 'email', mockUserDefaultNotHash.email)
    })

    // test('User registered: POST /register', async () => {
    //     insertUser(mockUserDefault)

    //     const req = new Request('http://localhost/register', {
    //         method: 'POST',
    //         body: JSON.stringify(mockUserDefaultNotHash),
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })

    //     const res = await app.request(req)
    //     expect(res.status).toBe(200)

    //     deleteFromDb('users', 'email', mockUserDefault.email)
    // })
})

// describe('Login Controller', async () => {
//     test('Login user: POST /login', async () => {
//         insertUser(mockUserDefault)

//         const req = new Request('http://localhost/login', {
//             method: 'POST',
//             body: JSON.stringify({
//                 email: mockUserDefault.email,
//                 password: mockPassword,
//             }),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         })

//         const res = await app.request(req)

//         expect(res.status).toBe(200)
//         expect(res.headers.get('Set-Cookie')).toStartWith('jwt=')

//         deleteFromDb('users', 'email', mockUserDefault.email)
//     })

//     test('Invalid user: POST /login', async () => {
//         insertUser(mockUserDefault)

//         const req = new Request('http://localhost/login', {
//             method: 'POST',
//             body: JSON.stringify({
//                 email: mockUserDefault.email,
//                 password: 'password',
//             }),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         })

//         const res = await app.request(req)

//         expect(res.status).toBe(401)
//         expect(res.headers.get('Set-Cookie')).toBe(null)

//         deleteFromDb('users', 'email', mockUserDefault.email)
//     })
// })
