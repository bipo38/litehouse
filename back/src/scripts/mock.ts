import { insertPage } from '../db/queries/page'
import { insertReport } from '../db/queries/report'
import { mockAnalysis } from '../mocks/analysis'
import { mockPage } from '../mocks/page'
import { init as initMigrations } from '../migrations'
import { insertUser } from '../db/queries/user'
import { UserRegister } from '../models/user'
import { passwordEncrypt } from '../utils'

const user: UserRegister = {
    name: 'test',
    email: 'ex@gmail.com',
    password: await passwordEncrypt('1234'),
    password_confirm: await passwordEncrypt('1234'),
}

initMigrations()
insertUser(user)
insertReport(mockAnalysis, 1, 'Google')
insertPage(mockPage, 1)
