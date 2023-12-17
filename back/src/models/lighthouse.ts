export interface Metrics {
    name: string
    url: string
    stats: Array<Stats>
}

export interface Stats {
    seo: number
    performance: number
    accessibility: number
    bestPractices: number
    average: number
    formFactor: string
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
