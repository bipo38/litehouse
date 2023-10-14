import { jwt } from 'hono/jwt'
import { selectReport, selectReports } from './queries'

import { Hono } from 'hono'
import { createUser } from './controllers/user'
import { Answer } from './types/answer'

const api = new Hono()

//Auth
// api.post('/login', async (c: any) => {
//     const { name } = await c.req.json()

//     return c.text(`${name}`)
// })

api.post('/signup', async (c: any) => {
    const user = await c.req.json()

    const result: Answer = await createUser(user)

    if (result.jwt) {
        return c.json(
            { message: result.message, jwt: result.jwt },
            result.status
        )
    }

    return c.json({ message: result.message }, result.status)
})

//Routes
api.get('/reports', async (c: any): Promise<Response> => {
    const reports = await selectReports()

    if (!reports) {
        return c.json({ error: 'Not Found', ok: false }, 404)
    }
    return c.json({ reports, ok: true }, 200)
})

api.get('/reports/:id', async (c: any): Promise<Response> => {
    const { id } = c.req.param()

    const report = await selectReport(id)
    if (!report) {
        return c.json({ error: 'Not Found', ok: false }, 404)
    }
    return c.json({ report: report, ok: true })
})

//Handling
api.notFound((c: any) => {
    return c.text('Something not exist', 404)
})

api.onError((err: any, c: any) => {
    console.error(`${err}`)
    return c.text('Server Error', 500)
})

export { api }
