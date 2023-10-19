import { describe, expect, test } from 'bun:test'
import { app } from '../index'

describe('Unauthorized', () => {
    test('GET /reports', async () => {
        const res = await app.request('reports')
        expect(res.status).toBe(401)
    })
})

describe('Not found page', () => {
    test('GET /hola', async () => {
        const res = await app.request('hola')
        expect(res.status).toBe(404)
    })
})
