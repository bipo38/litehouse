import { Database } from 'bun:sqlite'

export const db = (callback: Function) => {
  
    const db = new Database(Bun.env.DB_NAME)

    const result = callback(db)

    db.close()

    return result
}
