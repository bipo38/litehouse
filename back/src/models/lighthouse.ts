export type Analysis = Array<Metrics>

export interface Metrics {
    name: string
    url: string
    stats: Record<string, Stats>
}

export interface Stats {
    seo: number
    performance: number
    accessibility: number
    bestPractices: number
    average: number
}

export interface Item {
    lhr: {
        configSettings: {
            formFactor: string
        }
        categories: {
            performance: {
                score: number
            }
            seo: {
                score: number
            }
            accessibility: {
                score: number
            }
            'best-practices': {
                score: number
            }
        }
    }
}
