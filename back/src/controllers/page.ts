import { Answer } from '../models/answer'
import { PageBase, PageReq } from '../models/page'
import { insertPage } from '../queries'
import { reponseBuild } from '../utils'
import { ValidatePageBase } from '../validators/schemas'

export const savePage = async (c: any): Promise<Answer> => {
    const payload = c.get('jwtPayload')
    const req: PageReq = await c.req.json()

    const page: PageBase = {
        userId: payload,
        urls: req.url,
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
