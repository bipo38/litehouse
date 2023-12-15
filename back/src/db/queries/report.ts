import Database from 'bun:sqlite'
import { Report } from '../../models/report'
import { db } from '../../db'
import { countUserRegisters } from '../queries'
import { Analysis } from '../../types/analysis'

export const selectReports = (userId: number): Array<Report> => {
    return db((Db: Database) => {
        const query = Db.query(
            'SELECT * FROM reports WHERE user_id  =  ? ORDER BY created_at DESC;'
        )

        const reports: Array<any> = query.all(userId)

        return reports.map(
            (report: any) =>
                ({
                    ...report,
                    analysis: JSON.parse(report.analysis),
                } as Report)
        )
    })
}

export const selectReport = (userId: number, reportId: number): Report => {
    return db((Db: Database) => {
        const query = Db.query(
            'SELECT * FROM reports WHERE  user_id = ? AND report_id = ?;'
        )

        let report: any = query.get(userId, reportId)

        return {
            ...report,
            analysis: JSON.parse(report.analysis),
        } as Report
    })
}

export const insertReport = (
    analysis: Analysis,
    userId: number,
    title: string
): void => {
    const reportId = countUserRegisters(userId, 'reports').total + 1

    db((Db: Database) => {
        const query = Db.query(
            'INSERT INTO reports(report_id,analysis,user_id,title) VALUES (? ,? ,?,?);'
        )

        query.run(reportId, JSON.stringify(analysis), userId, title)
    })
}
