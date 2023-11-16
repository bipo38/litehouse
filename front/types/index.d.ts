declare global {
  interface Analysis {
    name: string;
    stats: {
      mobile?: {
        accessibility: number;
        average: number;
        bestPractices: number;
        performance: number;
        seo: number;
      };
      desktop?: {
        accessibility: number;
        average: number;
        bestPractices: number;
        performance: number;
        seo: number;
      };
    };
    url: string;
  }
}
export {};
