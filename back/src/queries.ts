import { db } from './db'
import type { User, UserRegister } from './models/user'
import type { Analysis } from './types/analysis'
import { Report } from './models/report'
import Database from 'bun:sqlite'
import { ReportsTotalUser } from './models/queries'
import { Page, PageBase } from './models/page'

//Reports

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
            'INSERT INTO reports(report_id,analysis,user_id) VALUES (? ,? ,?);'
        )

        query.run(reportId, JSON.stringify(analysis), userId)
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

//User
export const insertUser = (user: UserRegister): void => {
    db((Db: Database) => {
        const query = Db.query(
            'INSERT INTO users(name,password,email) VALUES (?,?,?);'
        )

        query.run(user.name, user.password, user.email)
    })
}

export const selectUser = (email: string): User => {
    return db((Db: Database) => {
        const query = Db.query('SELECT * FROM users WHERE email = ?;')
        return query.get(email)
    })
}

//Page
export const insertPage = (page: PageBase): void => {
    db((Db: Database) => {
        const query = Db.query(
            'INSERT INTO pages(user_id,urls,cron) VALUES (?,?,?);'
        )

        query.run(page.userId, JSON.stringify(page.urls), page.cron)
    })
}

export const selectPages = (page: Page): Array<Page> => {
    return db((Db: Database) => {
        const query = Db.query('SELECT * FROM pages WHERE cron = ?;')

        return query.all(page.cron)
    })
}

export const selectPage = (page: Page): Page => {
    return db((Db: Database) => {
        const query = Db.query('SELECT * FROM pages WHERE user_id = ?;')

        return query.all(page.userId)
    })
}

//Generic
export const deleteFromDb = (
    table: string,
    field: string,
    value: string | number
): void => {
    db((Db: Database) => {
        const query = Db.query(`DELETE FROM ${table} WHERE ${field} = ?;`)

        query.run(value)
    })
}
