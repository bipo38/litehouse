import { db } from './db'
import type { UserDefault, UserRegister } from './models/user'
import type { Analysis } from './types/analysis'
import { Report } from './models/report'
import Database from 'bun:sqlite'
import { ReportsTotalUser } from './models/queries'

export const selectReports = (id: number): Report => {
    return db((Db: Database) => {
        const query = Db.query('SELECT * FROM reports WHERE user_id  =  ?;')
        return query.all(id)
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
    const reportId = countUserReports(userId).totalReports + 1

    db((Db: Database) => {
        const query = Db.query(
            'INSERT INTO reports(report_id,analysis,user_id) values (? ,? ,?);'
        )

        query.run(reportId, JSON.stringify(analysis), userId)
    })
}

export const insertUser = (user: UserDefault): void => {
    return db((Db: Database) => {
        const query = Db.query(
            'INSERT INTO users(name,password,email) values (?,?,?);'
        )

        query.run(user.name, user.password, user.email)
    })
}

export const selectUser = (email: string): UserRegister => {
    return db((Db: Database) => {
        const query = Db.query('SELECT * FROM users WHERE email = ?;')
        return query.get(email)
    })
}

export const deleteFromDb = (
    table: string,
    field: string,
    value: string
): void => {
    db((Db: Database) => {
        const query = Db.query(`DELETE FROM ${table} WHERE ${field} = ?;`)

        query.run(value)
    })
}

const countUserReports = (userId: number): ReportsTotalUser => {
    return db((Db: Database) => {
        const query = Db.query(
            'SELECT COUNT(user_id) AS totalReports FROM reports WHERE user_id = ?;'
        )
        return query.get(userId)
    })
}
