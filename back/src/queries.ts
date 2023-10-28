import { db } from './db'
import type { User, UserRegister } from './models/user'
import type { Analysis } from './types/analysis'
import { Report } from './models/report'
import Database from 'bun:sqlite'
import { TotalCount } from './models/queries'
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
    const reportId = countUserRegisters(userId, 'reports').total + 1

    db((Db: Database) => {
        const query = Db.query(
            'INSERT INTO reports(report_id,analysis,user_id) VALUES (? ,? ,?);'
        )

        query.run(reportId, JSON.stringify(analysis), userId)
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
    const pageId = countUserRegisters(page.userId, 'pages').total + 1

    db((Db: Database) => {
        const query = Db.query(
            'INSERT INTO pages(title,urls,user_id,page_id,cron) VALUES (?,?,?,?,?);'
        )

        query.run(
            page.title,
            JSON.stringify(page.urls),
            page.userId,
            pageId,
            page.cron
        )
    })
}

export const selectPagesByCron = (page: Page): Array<Page> => {
    return db((Db: Database) => {
        const query = Db.query('SELECT * FROM pages WHERE cron = ?;')

        return query.all(page.cron)
    })
}

export const selectPages = (userId: number): Array<Page> => {
    return db((Db: Database) => {
        const query = Db.query('SELECT * FROM pages WHERE user_id = ?;')

        return query.all(userId)
    })
}

export const selectPage = (userId: number, pageId: number): Array<Page> => {
    return db((Db: Database) => {
        const query = Db.query(
            'SELECT * FROM pages WHERE user_id = ? AND page_id = ?;'
        )

        return query.get(userId, pageId)
    })
}

const countUserRegisters = (userId: number, table: string): TotalCount => {
    return db((Db: Database) => {
        const query = Db.query(
            `SELECT COUNT(user_id) AS total FROM ${table} WHERE user_id = ?;`
        )

        return query.get(userId)
    })
}
