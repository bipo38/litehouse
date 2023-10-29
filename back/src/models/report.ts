import { Analysis } from '../types/analysis'

export interface Report {
    id: number
    report_id: number
    analysis: Analysis
    user_id: number
    created_at: Date
    updated_at: Date
}

export interface ReportBase {
    analysis: Analysis
    user_id: number
}
