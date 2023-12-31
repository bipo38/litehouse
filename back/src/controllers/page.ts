import { Answer } from '../models/answer'
import { Page, PageReq } from '../models/page'
import {
    insertPage,
    selectPage,
    selectPages,
    updatesPage,
} from '../db/queries/page'
import { jwtPayload, responseBuild } from '../utils'
import { ValidatePageReq } from '../validators/schemas'

export const savePage = async (c: any): Promise<Answer> => {
    const req: any = await c.req.json()

    const validatePage = ValidatePageReq.safeParse(req)

    const page: PageReq = req.page

    if (!validatePage.success) {
        return responseBuild('Content type invalid', 422, false)
    }

    try {
        insertPage(page, jwtPayload(c))

        return responseBuild('Sucessful creation', 201, true)
    } catch {
        return responseBuild('Faling creating page', 409, false)
    }
}

export const showPages = (c: any): Answer => {
    try {
        const pages = selectPages(jwtPayload(c))

        return responseBuild(<Array<PageReq>>pages, 200, true)
    } catch {
        return responseBuild('Server Error', 500, false)
    }
}

export const showPage = (c: any): Answer => {
    const { id } = c.req.param()

    try {
        const page = selectPage(id, jwtPayload(c))

        if (!page) {
            return responseBuild('Page not exist', 404, false)
        }

        return responseBuild(page, 200, true)
    } catch {
        return responseBuild('Server Error', 500, false)
    }
}

export const updatePage = async (c: any): Promise<Answer> => {
    const { id } = c.req.param()
    const req: any = await c.req.json()

    const validatePage = ValidatePageReq.safeParse(req)

    if (!validatePage.success) {
        return responseBuild('Content type invalid', 422, false)
    }

    try {
        const page = updatesPage(req?.page, jwtPayload(c), id)

        if (!page) {
            return responseBuild('Page not exist', 404, false)
        }

        return responseBuild(page, 200, true)
    } catch {
        return responseBuild('Server Error', 500, false)
    }
}
