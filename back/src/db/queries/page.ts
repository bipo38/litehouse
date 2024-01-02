import Database from 'bun:sqlite'
import { countUserRegisters } from '../queries'
import { Page, PageReq, PageUrl } from '../../models/page'
import { db } from '../../db'

export const insertPage = (page: PageReq, userId: number): void => {
    const pageId = countUserRegisters(userId, 'pages').total + 1

    db((Db: Database) => {
        const query = Db.query(
            'INSERT INTO pages(title, urls, user_id, page_id, cron) VALUES (?, ?, ?, ?, ?);'
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

export const selectPagesByCron = (cron: string): Array<Page> => {
    return db((Db: Database) => {
        const query = Db.query('SELECT * FROM pages WHERE cron = ?;')

        const pages: Array<any> = query.all(cron)

        return pages.map((page: Page) => ({
            ...page,
            urls: JSON.parse(page.urls) as Array<PageUrl>,
        }))
    })
}

export const selectPages = (userId: number): Array<Page> => {
    return db((Db: Database) => {
        const query = Db.query('SELECT * FROM pages WHERE user_id = ?;')

        const pages: Array<any> = query.all(userId)

        return pages.map((page: Page) => ({
            ...page,
            urls: JSON.parse(page.urls) as Array<PageUrl>,
        }))
    })
}

export const selectPage = (pageId: number, userId: number): Page => {
    return db((Db: Database) => {
        const query = Db.query(
            'SELECT * FROM pages WHERE user_id = ? AND page_id = ?;'
        )

        const page: any = query.get(userId, pageId)

        return {
            ...page,
            urls: JSON.parse(page.urls),
        }
    })
}

export const updatesPage = (
    page: Page,
    userId: number,
    pageId: number
): Page | string => {
    return db((Db: Database) => {
        const query = Db.query(
            'UPDATE pages SET title = ? ,urls = ?,cron = ?, updated_at = ? WHERE user_id = ? AND page_id = ?;'
        )

        query.run(
            page.title,
            JSON.stringify(page.urls),
            page.cron,
            new Date().toISOString(),
            userId,
            pageId
        )

        return page
    })
}
