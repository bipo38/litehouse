import { z } from 'zod'

const errors = {
    invalid_credentials: 'Invalid credentials',
    password_lenght: 'Password must be 6 characters',
}

export const ValidateUserRegister = z
    .object({
        name: z
            .string()
            .min(1, { message: 'Invalid username. Must be 1 character.' })
            .trim(),
        email: z
            .string()
            .min(1, { message: 'This field has to be filled.' })
            .email({ message: 'Invalid email' }),
        password: z.string().min(6, { message: errors.password_lenght }).trim(),
        password_confirm: z
            .string()
            .min(6, { message: errors.password_lenght })
            .trim(),
    })
    .refine((user) => user.password === user.password_confirm, {
        message: "Passwords don't match",
    })

export const ValidateUserLogin = z.object({
    email: z
        .string()
        .min(1, { message: errors.invalid_credentials })
        .email({ message: errors.invalid_credentials }),
    password: z.string().min(1, { message: errors.invalid_credentials }).trim(),
})

export const ValidatePageReq = z
    .object({
        title: z
            .string()
            .min(1, { message: 'Minimun 1 character' })
            .max(100, { message: 'Max 30 characters' }),
        cron: z.string(),
        page_id: z.number().optional(),
        urls: z.array(
            z.object({
                title: z
                    .string()
                    .min(1, { message: 'Minimun 1 character in the title' })
                    .trim(),
                url: z.string().url(),
            })
        ),
    })
    .refine((page) => page.cron === 'month' || page.cron === 'week', {
        message: 'Invalid cron',
    })
