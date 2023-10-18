import { Hono } from 'hono'
import { api } from './api'
import { jwt, sign } from 'hono/jwt'

const app = new Hono()

app.use(
    'reports/*',
    jwt({
        secret: Bun.env.JWT_SECRET!,
        cookie: 'jwt',
    })
)

app.route('/', api)

export default app
