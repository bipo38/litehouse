import { Analysis } from '../types/analysis'

export interface Report {
    id: number
    report_id: number
    title: string
    analysis: Analysis
    user_id?: number
    created_at: Date
    updated_at: Date
}

export interface ReportDated {
    date: Date | string
    reports: Array<Report>
}

export interface ReportBase {
    title: string
    analysis: Analysis
    user_id: number
}
