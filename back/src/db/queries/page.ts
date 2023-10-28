import Database from 'bun:sqlite'
import { countUserRegisters } from '../../queries'
import { Page, PageReq } from '../../models/page'
import { db } from '../../db'

export const insertPage = (page: PageReq, userId: number): void => {
    const pageId = countUserRegisters(userId, 'pages').total + 1

    db((Db: Database) => {
        const query = Db.query(
            'INSERT INTO pages(title,urls,user_id,page_id,cron) VALUES (?,?,?,?,?);'
        )

        query.run(
            page.title,
            JSON.stringify(page.urls),
            userId,
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

export const selectPage = (pageId: number, userId: number): Page => {
    return db((Db: Database) => {
        const query = Db.query(
            'SELECT * FROM pages WHERE user_id = ? AND page_id = ?;'
        )

        return query.get(userId, pageId)
    })
}

export const updatesPage = (
    page: PageReq,
    userId: number,
    pageId: number
): Page => {
    return db((Db: Database) => {
        const query = Db.query(
            'UPDATE pages SET title = ? ,urls = ?,cron = ? WHERE user_id = ? AND page_id = ?;'
        )

        query.run(
            page.title,
            JSON.stringify(page.urls),
            page.cron,
            userId,
            pageId
        )

        return selectPage(pageId, userId)
    })
}
