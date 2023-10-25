import { selectReport, selectReports } from '../queries'
import { Answer } from '../models/answer'
import { reponseBuild } from '../utils'

export const showReports = (c: any): Answer => {
    const payload = c.get('jwtPayload')

    const reports = selectReports(payload)

    return reponseBuild(reports, 200)
}

export const showReport = (c: any): Answer => {
    const payload = c.get('jwtPayload')
    const { id } = c.req.param()

    const report = selectReport(payload, id)

    if (!report) {
        return reponseBuild('Report not exist', 404)
    }

    return reponseBuild(report, 200)
}
