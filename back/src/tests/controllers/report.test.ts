// import { afterAll, beforeAll, describe, expect, test } from 'bun:test'
// import { init as initMigrations } from '../../migrations'
// import { unlinkSync } from 'node:fs'
// import { passwordEncrypt } from '../../utils'
// import {
//     deleteFromDb,
//     insertReport,
//     insertUser,
//     selectReport,
//     selectUser,
// } from '../../queries'
// import { app } from '../../index'

// import { sign } from 'hono/jwt'
// import { mockAnalysis } from '../../mokcs/Analysis'

// beforeAll(() => {
//     process.env.DB_NAME = 'test.db'

//     initMigrations()
// })

// afterAll(() => {
//     unlinkSync(Bun.env.DB_NAME!)
// })

// describe('List Posts Controller', () => {
//     test('List Reports: GET /reports', async () => {
//         const password = 'hola'
//         const passwordHash = await passwordEncrypt(password)

//         const user = {
//             name: 'Steve',
//             email: 'steve@gmail.com',
//             password: passwordHash,
//             password_confirm: passwordHash,
//         }

//         insertUser(user)

//         const getUser = selectUser(user.email)

//         const token = 'jwt=' + (await sign(getUser.id, Bun.env.JWT_SECRET!))

//         insertReport(mockAnalysis, 2)

//         const req = new Request('http://localhost/reports', {
//             method: 'GET',
//             credentials: 'include',

//             headers: {
//                 'Content-Type': 'application/json',
//                 Cookie: token,
//             },
//         })

//         const res = await app.request(req)

//         expect(res.status).toBe(200)

//         deleteFromDb('users', 'email', user.email)
//         deleteFromDb('reports', 'created_at', '2021-09-09')
//     })

//     test('Unauthorized: GET /reports', async () => {
//         const res = await app.request('reports')
//         expect(res.status).toBe(401)
//     })
// })

// describe('Get post Controller', () => {
//     test('Get report: GET /reports/:id', async () => {
//         const password = 'hola'
//         const passwordHash = await passwordEncrypt(password)

//         const user = {
//             name: 'Steve',
//             email: 'steve@gmail.com',
//             password: passwordHash,
//             password_confirm: passwordHash,
//         }

//         insertUser(user)

//         const getUser = selectUser(user.email)

//         const token = 'jwt=' + (await sign(getUser.id, Bun.env.JWT_SECRET!))

//         insertReport(mockAnalysis, 2)

//         const req = new Request('http://localhost/reports/1', {
//             method: 'GET',
//             credentials: 'include',

//             headers: {
//                 'Content-Type': 'application/json',
//                 Cookie: token,
//             },
//         })

//         const res = await app.request(req)

//         expect(res.status).toBe(200)

//         deleteFromDb('users', 'email', user.email)
//     })

//     test('Not exist report: GET /reports/:id', async () => {
//         const password = 'hola'
//         const passwordHash = await passwordEncrypt(password)

//         const user = {
//             name: 'Steve',
//             email: 'steve@gmail.com',
//             password: passwordHash,
//             password_confirm: passwordHash,
//         }

//         insertUser(user)

//         const getUser = selectUser(user.email)

//         const token = 'jwt=' + (await sign(getUser.id, Bun.env.JWT_SECRET!))

//         insertReport(mockAnalysis, 2)

//         const req = new Request('http://localhost/reports/5', {
//             method: 'GET',
//             credentials: 'include',

//             headers: {
//                 'Content-Type': 'application/json',
//                 Cookie: token,
//             },
//         })

//         const res = await app.request(req)

//         expect(res.status).toBe(404)

//         deleteFromDb('users', 'email', user.email)
//     })

//     test('Unauthorized: GET /reports', async () => {
//         const res = await app.request('reports/1')
//         expect(res.status).toBe(401)
//     })
// })
