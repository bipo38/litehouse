import { Answer } from '../models/answer'
import { PageBase, PageReq } from '../models/page'
import { insertPage, selectPages } from '../queries'
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
        const page = selectPages(jwtPayload(c))

        if (page) {
            return reponseBuild(page, 200)
        }

        return reponseBuild(page, 204)
    } catch {
        return reponseBuild('Server Error', 500)
    }
}
