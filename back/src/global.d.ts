export {};

declare global {
  interface Analysis {
    created_at: string;
    results: Array<object>;
  }

  interface Item {
    lhr: {
      configSettings: {
        formFactor: string;
      };
      categories: {
        performance: {
          score: number;
        };
        seo: {
          score: number;
        };
        accessibility: {
          score: number;
        };
        "best-practices": {
          score: number;
        };
      };
    };
  }
}
