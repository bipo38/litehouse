import { selectReport, selectReports } from '../db/queries/report'
import { Answer } from '../models/answer'
import { Report, ReportDated } from '../models/report'
import { jwtPayload, parseDate, responseBuild } from '../utils'

export const showReports = (c: any): Answer => {
    try {
        const reports = selectReports(jwtPayload(c))

        if (!reports) {
            return responseBuild(reports, 200, true)
        }

        let dates = new Set(
            reports.map((report) => parseDate(report.created_at))
        )

        const sortDateReports: Array<ReportDated> = []

        dates.forEach((date) => {
            const filterReports = reports.filter(
                (report) => parseDate(report.created_at) === date
            )

            sortDateReports.push({
                date: reports[0]?.created_at ?? '',
                reports: filterReports,
            })
        })

        return responseBuild(sortDateReports, 200, true)
    } catch (error) {
        return responseBuild('Server Error', 500, false)
    }
}

export const showReport = (c: any): Answer => {
    const { id } = c.req.param()

    const report = selectReport(jwtPayload(c), id)

    if (!report) {
        return responseBuild('Report not exist', 404, false)
    }

    return responseBuild(report, 200, true)
}
