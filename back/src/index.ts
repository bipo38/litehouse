import { Hono } from 'hono'
import { api } from './api'
import { jwt } from 'hono/jwt'
import { jobMonth, jobWeek } from './cron'
import { cors } from 'hono/cors'
import reports from './routes/reports'
import pages from './routes/pages'
import user from './routes/user'

export const app = new Hono()

app.use(
    '/api/*',
    cors({
        origin: 'http://localhost:3000',
        allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
        credentials: true,
    })
)

app.use(
    '/api/reports/*',
    jwt({
        secret: Bun.env.JWT_SECRET!,
        cookie: 'jwt',
    })
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
    })
)

app.route('/', api)

// Cannot put t
app.route('/api/reports', reports)
app.route('/api/pages', pages)
app.route('/api/', user)

jobWeek
jobMonth

export default {
    port: 8000,
    fetch: app.fetch,
}
