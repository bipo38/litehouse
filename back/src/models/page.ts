export interface Page {
    id: number
    title: string,
    page_id: number,
    urls: Array<PageUrl>
    userId: number
    cron: string
    createdAt: Date
    updatedAt: Date
}

export interface PageBase {
    title: string
    urls: Array<PageUrl>
    userId: number
    cron: string
}

export interface PageReq {
    title: string
    urls: Array<PageUrl>
    cron: string
}

export interface PageUrl {
    title: string
    url: string
}
