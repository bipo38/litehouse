import { Hono } from 'hono'
import { Answer } from '../models/answer'
import { loginUser, saveUser } from '../controllers/auth'
import { showUser } from '../controllers/user'

const app = new Hono()

app.post('/login', async (c) => {
    const result: Answer = await loginUser(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.post('/register', async (c) => {
    const result = await saveUser(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.get('/user', async (c): Promise<Response> => {
    const user = showUser(c)
    2
    return c.json({ data: user.data, ok: user.ok }, user.status)
})


export default app