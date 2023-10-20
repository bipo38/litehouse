import { insertReport } from './queries'
import { currentDate } from './utils'
import { Item, Analysys } from './models/lighthouse'

const { links } = await Bun.file('./links.json').json()

export const startAnalysys = async (): Promise<Analysys> => {
    let result: Analysys = {
        results: [],
        created_at: currentDate(),
    }

    for await (const link of links) {
        const items: Array<any> = []

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

        const parsedItem: object = parseLhrFile(items, link)

        result.results.push(parsedItem)
    }

    return result
}

const parseLhrFile = (
    items: Item[],
    link: { name: string; url: string }
): object => {
    const metrics: Record<string, Record<string, number>> = {}

    items.forEach((item: Item) => {
        const i = (metrics[item.lhr.configSettings.formFactor] = {
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
        })
    })

    return {
        name: link.name,
        url: link.url,
        metrics,
    }
}
