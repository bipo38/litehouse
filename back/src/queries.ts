import { db } from './db'

import type { UserDefault, UserRegister } from './models/user'
import type { Analysis } from './models/lighthouse'
import { Report } from './models/report'

export const selectReports = (id: number): Report => {
    return db((Db: any) => {
        const query = Db.query('SELECT * FROM reports WHERE user_id  =  ?;')
        return query.all(id)
    })
}

export const selectReport = (userId: number, reportId: number): Report => {
    return db((Db: any) => {
        const query = Db.query(
            'SELECT * FROM reports WHERE  user_id = ? AND report_id = ?;'
        )

        return query.get(userId, reportId)
    })
}

export const insertReport = (analysis: Analysis, userId: number): void => {
    const reportId = countUserReports(userId) + 1

    db((Db: any) => {
        const query = Db.query(
            'INSERT INTO reports(report_id,analysis,user_id) values (? ,? ,?);'
        )

        query.run(reportId, JSON.stringify(analysis), userId)
    })
}

export const insertUser = (user: UserDefault): void => {
    return db((Db: any) => {
        const query = Db.query(
            'INSERT INTO users(name,password,email) values (?,?,?);'
        )

        query.run(user.name, user.password, user.email)
    })
}

export const selectUser = (email: string): UserRegister => {
    return db((Db: any) => {
        const query = Db.query('SELECT * FROM users WHERE email = ?;')
        return query.get(email)
    })
}

export const deleteFromDb = (
    table: string,
    field: string,
    value: string
): void => {
    db((Db: any) => {
        const query = Db.query(`DELETE FROM ${table} WHERE ${field} = ?;`)

        query.run(value)
    })
}

const countUserReports = (userId: number): number => {
    return db((Db: any) => {
        const query = Db.query(
            'SELECT COUNT(user_id) FROM reports WHERE user_id = ?;'
        )
        return parseInt(query.get()['COUNT(user_id)'])
    })
}
