declare global {
  interface Analysis {
    name: string;
    stats: Record<string, Stats>;
    url: string;
  }

  interface Page {
    id: number;
    title: string;
    page_id: number;
    urls: Array<PageUrl>;
    user_id: number;
    cron: string;
    created_at: Date;
    updated_at: Date;
  }

  interface PageUrl {
    title: string;
    url: string;
  }

  interface Stats {
    seo: number;
    performance: number;
    accessibility: number;
    bestPractices: number;
    average: number;
  }

  interface Report {
    id: number;
    report_id: number;
    analysis: Array<Analysis>;
    created_at: Date;
    updated_at: Date;
  }
}
export {};
