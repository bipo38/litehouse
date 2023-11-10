import { Hono } from 'hono'
import { saveUser, loginUser } from './controllers/auth'
import { showReport, showReports } from './controllers/report'
import { Answer } from './models/answer'
import { savePage, showPage, showPages, updatePage } from './controllers/page'
import { showUser } from './controllers/user'

const api = new Hono()

api.post('/api/login', async (c) => {
    const result: Answer = await loginUser(c)

    return c.json({ data: result.content }, result.status)
})

api.post('/api/register', async (c) => {
    const result = await saveUser(c)

    return c.json({ data: result.content }, result.status)
})

api.get('/api/reports', async (c): Promise<Response> => {
    const result = showReports(c)

    return c.json({ data: result.content }, result.status)
})

api.get('/api/reports/:id', async (c): Promise<Response> => {
    const report = showReport(c)

    return c.json({ report: report.content }, report.status)
})

api.post('/api/pages', async (c): Promise<Response> => {
    const page = await savePage(c)

    return c.json({ data: page.content }, page.status)
})

api.get('/api/pages', (c): Response => {
    const pages = showPages(c)

    return c.json({ data: pages.content }, pages.status)
})

api.get('/api/pages/:id', (c): Response => {
    const page = showPage(c)

    return c.json({ data: page.content }, page.status)
})

api.put('/api/pages/:id', async (c): Promise<Response> => {
    const page = await updatePage(c)

    return c.json({ data: page.content }, page.status)
})

api.get('/api/user', async (c): Promise<Response> => {
    const user = showUser(c)

    return c.json({ data: user.content }, user.status)
})

api.notFound((c) => {
    return c.text('Something not exist', 404)
})

api.onError((err, c) => {
    console.error(`${err}`)
    return c.text('Server Error', 500)
})

export { api }
