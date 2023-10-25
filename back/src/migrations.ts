import { db } from './db'
import path from 'path'
import fs from 'node:fs'
import Database from 'bun:sqlite'

const route: string = './migrations/'

export const init = () => {
    db((Db: Database) => {
        migrate(Db)
    })
}

const migrate = (Db: Database) => {
    const filenames = fs.readdirSync(route)

    filenames.forEach((f: string) => {
        if (path.extname(f) !== '.sql') {
            return
        }

        const query = Db.prepare(getFileContent(f))
        query.run()
    })
}

const getFileContent = (f: string): string => {
    const path = route + f

    const parsedFile = fs.readFileSync(path).toString()

    return parsedFile
}
