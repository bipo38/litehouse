export interface Page {
    id: number
    urls: Array<Url>
    userId: number
    cron: string
    createdAt: Date
    updatedAt: Date
}

export interface PageBase {
    urls: Array<Url>
    userId: number
    cron: string
}

export interface Url {
    name: string
    url: string
}

export interface PageReq {
    url: Array<Url>
    cron: string
}
