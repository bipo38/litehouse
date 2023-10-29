import { Hono } from 'hono'
import { api } from './api'
import { jwt, sign } from 'hono/jwt'
import { jobMonth, jobWeek } from './cron'

export const app = new Hono()

app.use(
    'reports/*',
    jwt({
        secret: Bun.env.JWT_SECRET!,
        cookie: 'jwt',
    })
)

app.use(
    'pages/*',
    jwt({
        secret: Bun.env.JWT_SECRET!,
        cookie: 'jwt',
    })
)

app.route('/', api)

jobWeek
jobMonth

export default app
