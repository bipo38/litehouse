import { insertReport } from "./queries.ts";

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

const { links } = await Bun.file("./links.json").json();

const parsedLhrFile = (
  items: Item[],
  link: { name: string; url: string }
): object => {
  const metrics: Record<string, Record<string, number>> = {};

  items.forEach((item: Item) => {
    metrics[item.lhr.configSettings.formFactor] = {
      seo: item.lhr.categories.seo?.score * 100,
      performance: item.lhr.categories.performance?.score * 100,
      accessibility: item.lhr.categories.accessibility?.score * 100,
      bestPractices: item.lhr.categories["best-practices"]?.score * 100,
    };
  });

  return {
    name: link.name,
    url: link.url,
    metrics,
  };
};

const startAnalysis = async (): Promise<void> => {
  let result: Analysis = {
    results: [],
    created_at: Intl.DateTimeFormat("es-ES").format(Date.now()),
  };

  for await (const link of links) {
    const items: Array<any> = [];

    for (let i = 0; i != 2; i++) {
      const cmd = Bun.spawn([
        "node",
        "lighthouse/main.js",
        `${link.url}`,
        `${i.toString()}`,
      ]);

      const text = await new Response(cmd.stdout).text();

      const parsed = JSON.parse(text);

      items.push(parsed);
    }

    const parsedItem: object = parsedLhrFile(items, link);

    result.results.push(parsedItem);
  }

  insertReport(result);
};

startAnalysis();
