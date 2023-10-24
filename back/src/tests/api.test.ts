import { describe, expect, test } from 'bun:test'
import { app } from '../index'


test('GET /hola', async () => {
    const res = await app.request('hola')
    expect(res.status).toBe(404)
})
