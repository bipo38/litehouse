import { Hono } from 'hono'
import { selectReport, selectReports } from './queries'
import { createUser, loginUser } from './controllers/user'
import { getReport, listReports } from './controllers/report'

const api = new Hono()

api.post('/login', async (c: any) => {
    const result = await loginUser(c)

    return c.json({ content: result.content }, result.status)
})

api.post('/register', async (c: any) => {
    const result = await createUser(c)

    return c.json({ content: result.content }, result.status)
})

api.get('/reports', async (c: any): Promise<Response> => {
    const result = listReports(c)

    return c.json({ content: result.content }, result.status)
})

api.get('/reports/:id', async (c: any): Promise<Response> => {
    const report = getReport(c)

    return c.json({ report: report.content }, report.status)
})

api.notFound((c: any) => {
    return c.text('Something not exist', 404)
})

api.onError((err: any, c: any) => {
    console.error(`${err}`)
    return c.text('Server Error', 500)
})

export { api }
