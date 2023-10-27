export interface Page {
    id: number
    urls: Array<PageUrl>
    userId: number
    cron: string
    createdAt: Date
    updatedAt: Date
}

export interface PageBase {
    urls: Array<PageUrl>
    userId: number
    cron: string
}

export interface PageReq {
    url: Array<PageUrl>
    cron: string
}

export interface PageUrl {
    title: string
    url: string
}
