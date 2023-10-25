import { Analysis } from './lighthouse'

export interface Report {
    id: number
    report_id: number
    analysis: Analysis
    userId: number
    created_at: Date
    updated_at: Date
}
