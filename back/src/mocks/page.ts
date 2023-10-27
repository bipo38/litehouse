import { Page, PageBase, PageReq } from '../models/page'

export const mockPageReq = {
    url: [
        {
            title: 'Home',
            url: 'https://www.google.com',
        },
    ],
    cron: 'month',
} as PageReq

export const mockPageBase = {
    urls: [
        {
            title: 'Home',
            url: 'https://www.google.com',
        },
    ],
    userId: 1,
    cron: 'month',
} as PageBase

export const mockPageReqWrong = {
    url: [
        {
            title: 'Home',
            url: 'https://www.google.com',
        },
    ],
    cron: 'day',
} as PageReq
