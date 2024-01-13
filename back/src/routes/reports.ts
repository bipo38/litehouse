import { Hono } from 'hono'
import { showReport, showReports } from '../controllers/report'

const app = new Hono()

app.get('/', async (c): Promise<Response> => {
    const result = showReports(c)

    return c.json({ data: result.data, ok: result.ok }, result.status)
})

app.get(':id', async (c): Promise<Response> => {
    const report = showReport(c)

    return c.json({ data: report.data, ok: report.ok }, report.status)
})

export default app
