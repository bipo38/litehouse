import { db } from './db'

import type { RegisterUser } from './models/user'
import type { Analysys } from './models/lighthouse'
import { currentDate } from './utils'

export const selectReports = (id: any) => {
    return db((Db: any) => {
        const query = Db.query('SELECT * FROM reports WHERE user_id  =  ?;')
        return query.all(id)
    })
}

export const selectReport = (userId: any, reportId: any) => {
    return db((Db: any) => {
        const query = Db.query(
            'SELECT * FROM reports WHERE  user_id = ? AND report_id = ?'
        )
        const r = query.get(userId, reportId)

        return r
    })
}

export const insertReport = (report: Analysys, userId: number) => {
    db((Db: any) => {
        const query = Db.query(
            'INSERT INTO reports(created_at, result ,average , user_id , report_id) values (? ,? ,? , ?, ?)'
        )
        query.run(
            report.created_at,
            JSON.stringify(report.results),
            '90',
            userId,
            1
        )
    })
}

export const insertUser = (user: any): void => {
    return db((Db: any) => {
        const query = Db.query(
            'INSERT INTO users(name,password,email,created_at) values (?,?,?,?)'
        )

        query.get(
            user.name,
            user.password,
            user.email,
            // user.created_at
            currentDate()
        )
    })
}

export const selectUser = (email: string): RegisterUser => {
    return db((Db: any) => {
        const query = Db.query('SELECT * FROM users WHERE email = ? ')
        return query.get(email)
    })
}

export const deleteFromDb = (table: string, field: string, value: string) => {
    db((Db: any) => {
        const query = Db.query(`DELETE FROM ${table} WHERE ${field} = ?`)

        query.run(value)
    })
}
