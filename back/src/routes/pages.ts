import { Hono } from 'hono'
import { savePage, showPage, showPages, updatePage } from '../controllers/page'

const app = new Hono()

app.post('/', async (c): Promise<Response> => {
    const page = await savePage(c)

    return c.json({ data: page.data, ok: page.ok }, page.status)
})

app.get('/', (c): Response => {
    const pages = showPages(c)

    return c.json({ data: pages.data, ok: pages.ok }, pages.status)
})

app.get('/:id', (c): Response => {
    const page = showPage(c)

    return c.json({ data: page.data, ok: page.ok }, page.status)
})

app.put('/:id', async (c): Promise<Response> => {
    const page = await updatePage(c)

    return c.json({ data: page.data, ok: page.ok }, page.status)
})

export default app
