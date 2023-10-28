import { Answer } from '../models/answer'
import { PageReq } from '../models/page'
import {
    insertPage,
    selectPage,
    selectPages,
    updatesPage,
} from '../db/queries/page'
import { jwtPayload, reponseBuild } from '../utils'
import { ValidatePageReq } from '../validators/schemas'

export const savePage = async (c: any): Promise<Answer> => {
    const req: PageReq = await c.req.json()

    const validatePage = ValidatePageReq.safeParse(req)

    if (!validatePage.success) {
        return reponseBuild('Content type invalid', 422)
    }

    try {
        insertPage(req, jwtPayload(c))

        return reponseBuild('Sucessful creation', 201)
    } catch {
        return reponseBuild('Faling creating page', 409)
    }
}

export const showPages = (c: any): Answer => {
    try {
        const pages = selectPages(jwtPayload(c))

        return reponseBuild(pages as Array<PageReq>, 200)
    } catch {
        return reponseBuild('Server Error', 500)
    }
}

export const showPage = (c: any): Answer => {
    const { id } = c.req.param()

    try {
        const page = selectPage(id, jwtPayload(c))

        if (!page) {
            return reponseBuild('Page not exist', 404)
        }

        return reponseBuild(page as PageReq, 200)
    } catch {
        return reponseBuild('Server Error', 500)
    }
}

export const updatePage = async (c: any): Promise<Answer> => {
    const { id } = c.req.param()
    const req: PageReq = await c.req.json()

    const validatePage = ValidatePageReq.safeParse(req)

    if (!validatePage.success) {
        return reponseBuild('Content type invalid', 422)
    }

    try {
        const page = updatesPage(req, jwtPayload(c), id)

        if (!page) {
            return reponseBuild('Page not exist', 404)
        }

        return reponseBuild(page as PageReq, 200)
    } catch {
        return reponseBuild('Server Error', 500)
    }
}
