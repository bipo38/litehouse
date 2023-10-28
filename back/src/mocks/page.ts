import { Page, PageReq, PageUrl } from '../models/page'

export const mockPageUrl = {
    title: 'Home',
    url: 'https://www.google.com',
} as PageUrl

export const mockPageReqWrong = {
    title: 'Google',
    urls: [mockPageUrl],
    cron: 'day',
} as PageReq

export const mockPageReq = {
    title: 'Google',
    urls: [mockPageUrl],
    cron: 'month',
} as PageReq

export const mockPage = {
    id: 1,
    title: 'Google',
    page_id: 1,
    urls: [mockPageUrl],
    userId: 1,
    cron: 'week',
} as Page
