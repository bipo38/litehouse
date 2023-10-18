import { z } from 'zod'

export const UserRegister = z
    .object({
        name: z.string().min(1, { message: 'Invalid username' }),
        email: z
            .string()
            .min(1, { message: 'This field has to be filled.' })
            .email('Invalid email'),
        password: z.string(),
        password_confirm: z.string(),
        // created_at: z.date(),
    })
    .refine((user) => user.password === user.password_confirm, {
        message: "Passwords don't match",
    })
