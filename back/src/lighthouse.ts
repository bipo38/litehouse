import { Item, Metrics, Stats } from './models/lighthouse'
import { Page, PageUrl } from './models/page'
import { Analysis } from './types/analysis'

export const startAnalysys = async (page: Page): Promise<Analysis> => {
    const result: Analysis = []

    for await (const url of JSON.parse(page.urls) as Array<PageUrl>) {
        const items = []

        for (let i = 0; i != 2; i++) {
            const cmd = Bun.spawn([
                'node',
                'lighthouse/main.js',
                `${url.url}`,
                `${i.toString()}`,
            ])
            const text = await new Response(cmd.stdout).text()
            const parsed = JSON.parse(text)
            items.push(parsed)
        }

        const parsedItem = parseLhrFile(items, url)

        result.push(parsedItem)
    }

    return result
}

const parseLhrFile = (items: Item[], url: PageUrl): Metrics => {
    const metrics: Record<string, Stats> = {}

    items.forEach((item: Item) => {
        metrics[item.lhr.configSettings.formFactor] = {
            seo: item.lhr.categories.seo?.score * 100,
            performance: item.lhr.categories.performance?.score * 100,
            accessibility: item.lhr.categories.accessibility?.score * 100,
            bestPractices: item.lhr.categories['best-practices']?.score * 100,
            average: Math.trunc(
                (item.lhr.categories.performance?.score * 100 +
                    item.lhr.categories.seo?.score * 100 +
                    item.lhr.categories.accessibility?.score * 100 +
                    item.lhr.categories['best-practices']?.score * 100) /
                    4
            ),
        }
    })

    return {
        name: url.title,
        url: url.url,
        stats: metrics,
    }
}
