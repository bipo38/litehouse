import { Page, PageBase, PageReq, PageUrl } from '../models/page'

export const mockPageReq = {
    title: 'Google',
    urls: [
        {
            title: 'Home',
            url: 'https://www.google.com',
        },
    ],
    cron: 'month',
} as PageReq

export const mockPageBase = {
    title: 'Google',
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
    title: 'Google',
    urls: [
        {
            title: 'Home',
            url: 'https://www.google.com',
        },
    ],
    cron: 'day',
} as PageReq

export const mockPageUrl = {
    title: 'Home',
    url: 'https://www.google.com',
} as PageUrl

export const mockPage = {
    id: 1,
    title: 'Google',
    page_id: 1,
    urls: [mockPageUrl],
    userId: 1,
    cron: 'week',
} as Page
