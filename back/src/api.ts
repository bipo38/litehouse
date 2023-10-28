import { Hono } from 'hono'
import { saveUser, loginUser } from './controllers/auth'
import { showReport, showReports } from './controllers/report'
import { Answer } from './models/answer'
import { savePage, showPages } from './controllers/page'

const api = new Hono()

api.post('/login', async (c) => {
    const result: Answer = await loginUser(c)

    return c.json({ content: result.content }, result.status)
})

api.post('/register', async (c) => {
    const result = await saveUser(c)

    return c.json({ content: result.content }, result.status)
})

api.get('/reports', async (c): Promise<Response> => {
    const result = showReports(c)

    return c.json({ content: result.content }, result.status)
})

api.get('/reports/:id', async (c): Promise<Response> => {
    const report = showReport(c)

    return c.json({ report: report.content }, report.status)
})

api.post('/pages', async (c): Promise<Response> => {
    const page = await savePage(c)

    return c.json({ content: page.content }, page.status)
})

api.post('/pages', async (c): Promise<Response> => {
    const pages = await showPages(c)

    return c.json({ content: pages.content }, pages.status)
})

api.notFound((c) => {
    return c.text('Something not exist', 404)
})

api.onError((err, c) => {
    console.error(`${err}`)
    return c.text('Server Error', 500)
})

export { api }
