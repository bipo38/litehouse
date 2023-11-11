import Database from 'bun:sqlite'
import { Report } from '../../models/report'
import { db } from '../../db'
import { countUserRegisters } from '../queries'
import { Analysis } from '../../types/analysis'

export const selectReports = (userId: number): Report => {
    return db((Db: Database) => {
        const query = Db.query('SELECT * FROM reports WHERE user_id  =  ?;')
        return query.all(userId)
    })
}

export const selectReport = (userId: number, reportId: number): Report => {
    return db((Db: Database) => {
        const query = Db.query(
            'SELECT * FROM reports WHERE  user_id = ? AND report_id = ?;'
        )

        return query.get(userId, reportId)
    })
}

export const insertReport = (analysis: Analysis, userId: number): void => {
    const reportId = countUserRegisters(userId, 'reports').total + 1

    db((Db: Database) => {
        const query = Db.query(
            'INSERT INTO reports(report_id,analysis,user_id) VALUES (? ,? ,?);'
        )

        query.run(reportId, JSON.stringify(analysis), userId)
    })
}
