export interface Page {
    id: number
    title: string
    page_id: number
    urls: Array<PageUrl>
    userId: number
    cron: string
    createdAt: Date
    updatedAt: Date
}

export interface PageReq {
    title: string
    urls: Array<PageUrl>
    cron: string
    page_id?: number
}

export interface PageUrl {
    title: string
    url: string
}
