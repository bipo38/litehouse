import { selectReport, selectReports } from '../db/queries/report'
import { Answer } from '../models/answer'
import { ReportRes } from '../models/report'
import { jwtPayload, responseBuild } from '../utils'

export const showReports = (c: any): Answer => {
    const reports = selectReports(jwtPayload(c))

    return responseBuild(reports as Array<ReportRes>, 200, true)
}

export const showReport = (c: any): Answer => {
    const { id } = c.req.param()

    const report = selectReport(jwtPayload(c), id)

    console.log(report)

    if (!report) {
        return responseBuild('Report not exist', 404, false)
    }

    return responseBuild(report as ReportRes, 200, true)
}
