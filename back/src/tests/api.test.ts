import { describe, expect, test } from 'bun:test'
import { app } from '../index'
import { db } from '../db'
import { insertUser } from '../queries'
import { runMigrations } from '../utils'

// describe('List Reports', () => {
//     test('GET /reports', async () => {
//         const res = await app.request('reports')
//         expect(res.status).toBe(200)
//     })
// })

// describe('Report get', () => {
//     test('GET /reports/:id', async () => {
//         const res = await app.request('reports/1')
//         expect(res.status).toBe(200)
//     })
// })

// describe('Not exist report', () => {
//     test('GET /reports/:id', async () => {
//         const res = await app.request('reports/10')
//         expect(res.status).toBe(404)
//     })
// })

runMigrations()

describe('Not found page', () => {
    test('GET /hola', async () => {
        const res = await app.request('hola')
        expect(res.status).toBe(404)
    })
})

describe('Unauthorized', () => {
    test('GET /reports', async () => {
        const res = await app.request('reports')
        expect(res.status).toBe(401)
    })
})

//User Auth

describe('Create User', () => {
    test('POST /signup', async () => {
        const user = {
            name: 'Pete',
            email: 'barfooo@gmail.com',
            password: 'hola',
            password_confirm: 'hola',
        }

        const req = new Request('http://localhost/signup', {
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
})

describe('Existing User', () => {
    test('POST /signup', async () => {
        const user = {
            name: 'Pete',
            email: 'peter@gmail.com',
            password: 'hola',
            password_confirm: 'hola',
        }

        insertUser(user)

        const req = new Request('http://localhost/signup', {
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

const deleteFromDb = (table: string, field: string, value: string) => {
    db((Db: any) => {
        const query = Db.query(`DELETE FROM ${table} WHERE ${field} = ?`)

        query.run(value)
    })
}
