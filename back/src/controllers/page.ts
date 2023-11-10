import { Answer } from '../models/answer'
import { PageReq } from '../models/page'
import {
    insertPage,
    selectPage,
    selectPages,
    updatesPage,
} from '../db/queries/page'
import { jwtPayload, responseBuild } from '../utils'
import { ValidatePageReq } from '../validators/schemas'

export const savePage = async (c: any): Promise<Answer> => {
    const req: PageReq = await c.req.json()

    const validatePage = ValidatePageReq.safeParse(req)

    if (!validatePage.success) {
        return responseBuild('Content type invalid', 422)
    }

    try {
        insertPage(req, jwtPayload(c))

        return responseBuild('Sucessful creation', 201)
    } catch {
        return responseBuild('Faling creating page', 409)
    }
}

export const showPages = (c: any): Answer => {
    try {
        const pages = selectPages(jwtPayload(c))

        return responseBuild(pages as Array<PageReq>, 200)
    } catch {
        return responseBuild('Server Error', 500)
    }
}

export const showPage = (c: any): Answer => {
    const { id } = c.req.param()

    try {
        const page = selectPage(id, jwtPayload(c))

        if (!page) {
            return responseBuild('Page not exist', 404)
        }

        return responseBuild(page as PageReq, 200)
    } catch {
        return responseBuild('Server Error', 500)
    }
}

export const updatePage = async (c: any): Promise<Answer> => {
    const { id } = c.req.param()
    const req: PageReq = await c.req.json()

    const validatePage = ValidatePageReq.safeParse(req)

    if (!validatePage.success) {
        return responseBuild('Content type invalid', 422)
    }

    try {
        const page = updatesPage(req, jwtPayload(c), id)

        if (!page) {
            return responseBuild('Page not exist', 404)
        }

        return responseBuild(page as PageReq, 200)
    } catch {
        return responseBuild('Server Error', 500)
    }
}
