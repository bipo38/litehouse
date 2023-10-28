import { selectReport, selectReports } from '../queries'
import { Answer } from '../models/answer'
import { jwtPayload, reponseBuild } from '../utils'

export const showReports = (c: any): Answer => {
    const reports = selectReports(jwtPayload(c))

    return reponseBuild(reports, 200)
}

export const showReport = (c: any): Answer => {
    const { id } = c.req.param()

    const report = selectReport(jwtPayload(c), id)

    if (!report) {
        return reponseBuild('Report not exist', 404)
    }

    return reponseBuild(report, 200)
}
