import { Answer } from '../models/answer'
import { PageBase, PageReq } from '../models/page'
import { insertPage, selectPage, selectPages } from '../queries'
import { jwtPayload, reponseBuild } from '../utils'
import { ValidatePageBase } from '../validators/schemas'

export const savePage = async (c: any): Promise<Answer> => {
    const req: PageReq = await c.req.json()

    const page: PageBase = {
        title: req.title,
        userId: jwtPayload(c),
        urls: req.urls,
        cron: req.cron,
    }

    const validatePage = ValidatePageBase.safeParse(page)

    if (!validatePage.success) {
        return reponseBuild('Content type invalid', 422)
    }

    try {
        insertPage(page)

        return reponseBuild('Sucessful creation', 201)
    } catch {
        return reponseBuild('Faling creating page', 409)
    }
}

export const showPages = (c: any): Answer => {
    try {
        const pages = selectPages(jwtPayload(c))

        return reponseBuild(pages, 200)
    } catch {
        return reponseBuild('Server Error', 500)
    }
}

export const showPage = (c: any): Answer => {
    const { id } = c.req.param()

    try {
        const page = selectPage(jwtPayload(c), id)

        if (!page) {
            return reponseBuild('Page not exist', 404)
        }

        return reponseBuild(page, 200)
    } catch {
        return reponseBuild('Server Error', 500)
    }
}
