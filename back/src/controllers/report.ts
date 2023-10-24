import { selectReport, selectReports } from '../queries'
import { Answer } from '../types/answer'
import { reponseBuild } from '../utils'

export const listReports = (c: any): Answer => {
    const payload = c.get('jwtPayload')

    const reports = selectReports(payload)

    return reponseBuild(reports, 200)
}

export const getReport = (c: any): Answer => {
    const payload = c.get('jwtPayload')
    const { id } = c.req.param()

    console.log(payload)

    const report = selectReport(payload, id)
    console.log(report)

    return reponseBuild(report, 200)
}
