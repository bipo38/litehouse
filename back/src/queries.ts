import { db } from './db'

import type { SignUpUser } from './controllers/user'
import type { Analysis } from './lighthouse'
import { currentDate } from './utils'

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

export const insertUser = (user: SignUpUser) => {
    let result = ''

    db((Db: any) => {
        const query = Db.query(
            'INSERT INTO users(name,password,email,created_at) values (?,?,?,?)'
        )

        result = query.get(
            user.name,
            user.password,
            user.email,
            // user.created_at
            currentDate()
        )
    })

    console.log(result)

    return result
}
