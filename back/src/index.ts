import { Hono } from 'hono'
import { api } from './api'
import { jwt } from 'hono/jwt'
import { jobMonth, jobWeek } from './cron'
import { cors } from 'hono/cors'

export const app = new Hono()

app.use('/api/*', cors({
    origin: 'http://localhost:3000',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    credentials: true,
}))


app.use(
    '/api/reports/*',
    jwt({
        secret: Bun.env.JWT_SECRET!,
        cookie: 'jwt',
    }),

)

app.use(
    '/api/pages/*',
    jwt({
        secret: Bun.env.JWT_SECRET!,
        cookie: 'jwt',
    })
)

app.use(
    '/api/user/*',
    jwt({
        secret: Bun.env.JWT_SECRET!,
        cookie: 'jwt',
    }),
)




app.route('/', api)

jobWeek
jobMonth

export default {
    port: 8000,
    fetch: app.fetch,
}
