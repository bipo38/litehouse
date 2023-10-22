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

export const selectReport = (user: any, id: any) => {
    return db((Db: any) => {
        const query = Db.query(
            'SELECT * FROM reports WHERE user_id = ? AND id = '
        )

        return query.get(user, id)
    })
}

export const insertReport = (report: Analysys) => {
    db((Db: any) => {
        const query = Db.query(
            'INSERT INTO reports(created_at, result ,average , user_id) values (? ,? ,? , ?)'
        )
        query.run(report.created_at, JSON.stringify(report.results), '90', 1)
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
