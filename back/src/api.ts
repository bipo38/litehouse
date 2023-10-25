import { Hono } from 'hono'
import { createUser, loginUser } from './controllers/user'
import { getReport, listReports } from './controllers/report'
import { Answer } from './models/answer'

const api = new Hono()

api.post('/login', async (c) => {
    const result: Answer = await loginUser(c)

    return c.json({ content: result.content }, result.status)
})

api.post('/register', async (c) => {
    const result = await createUser(c)

    return c.json({ content: result.content }, result.status)
})

api.get('/reports', async (c): Promise<Response> => {
    const result = listReports(c)

    return c.json({ content: result.content }, result.status)
})

api.get('/reports/:id', async (c): Promise<Response> => {
    const report = getReport(c)

    return c.json({ report: report.content }, report.status)
})

api.notFound((c) => {
    return c.text('Something not exist', 404)
})

api.onError((err, c) => {
    console.error(`${err}`)
    return c.text('Server Error', 500)
})

export { api }
