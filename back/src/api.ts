import { Hono } from 'hono'

const api = new Hono()

api.notFound((c) => {
    return c.text('Something not exist', 404)
})

api.onError((err, c) => {
    console.error(`${err}`)
    return c.text('Server Error', 500)
})

export { api }
