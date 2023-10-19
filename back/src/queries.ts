import { db } from './db'

import type { RegisterUser } from './controllers/user'
import type { Analysis } from './lighthouse'
import { currentDate } from './utils'

// Reports

export const selectReports = () => {
    return db((Db: any) => {
        const query = Db.query('SELECT * FROM reports;')
        return query.all()
    })
}

export const selectReport = (id: string) => {
    return db((Db: any) => {
        const query = Db.query('SELECT * FROM reports WHERE id = ?')

        return query.get(id)
    })
}

export const insertReport = (report: Analysis) => {
    db((Db: any) => {
        const query = Db.query(
            'INSERT INTO reports(created_at, result ,average , user_id) values (? ,? ,? , ?)'
        )
        query.run(report.created_at, JSON.stringify(report.results), '90', 1)
    })
}

//User

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
