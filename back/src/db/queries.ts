import { db } from '../db'
import Database from 'bun:sqlite'
import { TotalCount } from '../models/queries'

export const countUserRegisters = (
    userId: number,
    table: string
): TotalCount => {
    return db((Db: Database) => {
        const query = Db.query(
            `SELECT COUNT(user_id) AS total FROM ${table} WHERE user_id = ?;`
        )

        return query.get(userId)
    })
}
