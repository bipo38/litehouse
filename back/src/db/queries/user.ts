import Database from 'bun:sqlite'
import { db } from '../../db'
import { User, UserRegister } from '../../models/user'

export const insertUser = (user: UserRegister): void => {
    db((Db: Database) => {
        const query = Db.query(
            'INSERT INTO users(name,password,email) VALUES (?,?,?);'
        )

        query.run(user.name, user.password, user.email)
    })
}

export const selectUserByEmail = (email: string): User => {
    return db((Db: Database) => {
        const query = Db.query('SELECT * FROM users WHERE email = ?;')
        return query.get(email)
    })
}

export const selectUserById = (userId: number): User => {
    return db((Db: Database) => {
        const query = Db.query('SELECT * FROM users WHERE id = ?;')
        return query.get(userId)
    })
}
