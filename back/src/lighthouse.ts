import { Analysis, Item, Metrics, Stats } from './models/lighthouse'

const { links } = await Bun.file('./links.json').json()

export const startAnalysys = async (): Promise<Analysis> => {
    const result: Analysis = []

    for await (const link of links) {
        const items = []

        for (let i = 0; i != 2; i++) {
            const cmd = Bun.spawn([
                'node',
                'lighthouse/main.js',
                `${link.url}`,
                `${i.toString()}`,
            ])

            const text = await new Response(cmd.stdout).text()

            const parsed = JSON.parse(text)

            items.push(parsed)
        }

        const parsedItem = parseLhrFile(items, link)

        result.push(parsedItem)
    }

    return result
}

const parseLhrFile = (
    items: Item[],
    link: { name: string; url: string }
): Metrics => {
    const metrics: Record<string, Stats> = {}

    items.forEach((item: Item) => {
        metrics[item.lhr.configSettings.formFactor] = {
            seo: item.lhr.categories.seo?.score * 100,
            performance: item.lhr.categories.performance?.score * 100,
            accessibility: item.lhr.categories.accessibility?.score * 100,
            bestPractices: item.lhr.categories['best-practices']?.score * 100,
            average:
                (item.lhr.categories.performance?.score * 100 +
                    item.lhr.categories.seo?.score * 100 +
                    item.lhr.categories.accessibility?.score * 100 +
                    item.lhr.categories['best-practices']?.score * 100) /
                4,
        }
    })

    return {
        name: link.name,
        url: link.url,
        stats: metrics,
    }
}
