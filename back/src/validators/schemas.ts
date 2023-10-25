import { z } from 'zod'

export const ValidateUserRegister = z
    .object({
        name: z.string().min(1, { message: 'Invalid username' }).trim(),
        email: z
            .string()
            .min(1, { message: 'This field has to be filled.' })
            .email({ message: 'Invalid email' }),
        password: z.string(),
        password_confirm: z.string(),
    })
    .refine((user) => user.password === user.password_confirm, {
        message: "Passwords don't match",
    })

export const ValidatePageBase = z
    .object({
        cron: z.string(),
        userId: z.number(),
        urls: z.array(
            z.object({
                name: z
                    .string()
                    .min(1, { message: 'Minimun one character in the name' })
                    .trim(),
                url: z.string().url(),
            })
        ),
    })
    .refine((page) => page.cron === 'month' || page.cron === 'week', {
        message: 'Invalid cron',
    })
