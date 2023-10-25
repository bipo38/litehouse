import { Analysis } from '../types/analysis'

export interface Report {
    id: number
    reportId: number
    analysis: Analysis
    userId: number
    createdAt: Date
    updatedAt: Date
}

export interface ReportBase {
    analysis: Analysis
    userId: number
}
