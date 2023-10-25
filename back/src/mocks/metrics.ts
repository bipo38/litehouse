import { Metrics } from '../models/lighthouse'

export const mockMetrics = {
    name: 'Home',
    url: 'www.google.com',
    stats: {
        mobile: {
            seo: 90,
            performance: 90,
            accessibility: 90,
            bestPractices: 90,
            average: 90,
        },
    },
} as Metrics
