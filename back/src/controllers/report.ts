import { selectReport, selectReports } from '../db/queries/report'
import { Answer } from '../models/answer'
import { jwtPayload, responseBuild } from '../utils'

export const showReports = (c: any): Answer => {
    const reports = selectReports(jwtPayload(c))

    return responseBuild(reports, 200)
}

export const showReport = (c: any): Answer => {
    const { id } = c.req.param()

    const report = selectReport(jwtPayload(c), id)

    if (!report) {
        return responseBuild('Report not exist', 404)
    }

    return responseBuild(report, 200)
}
