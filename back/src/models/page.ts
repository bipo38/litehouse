export interface Page {
    id: number
    title: string
    page_id: number
    urls: Array<PageUrl>
    user_id: number
    cron: string
    created_at: Date
    updated_at: Date
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
