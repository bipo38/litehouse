import { describe, expect, test } from 'bun:test'
import { app } from '../index'
import { mockUserDefault } from '../mokcs/User'

test('GET /hola', async () => {
    const res = await app.request('hola')
    expect(res.status).toBe(404)
})
