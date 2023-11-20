import { insertUser } from "../db/queries/user";
import { UserRegister } from "../models/user";
import { passwordEncrypt } from "../utils";

const user: UserRegister = {
    name: 'test',
    email: 'ex@gmail.com',
    password: await passwordEncrypt('1234'),
    password_confirm: await passwordEncrypt('1234'),
}
insertUser(user)