export interface Analysys {
    created_at: string
    results: Array<object>
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
