import { CronJob } from 'cron'
import { selectPagesByCron } from './db/queries/page'
import { startAnalysys } from './lighthouse'
import { insertReport } from './db/queries/report'

export const jobWeek = new CronJob(
    '0 3 * * 3',
    function () {
        jobLighthouse('week')
    },
    null,
    true,
    'Europe/Madrid'
)

export const jobMonth = new CronJob(
    '0 3 1 * *',
    function () {
        jobLighthouse('month')
    },
    null,
    true,
    'Europe/Madrid'
)

const jobLighthouse = async (time: string): Promise<void> => {
    const userPages = selectPagesByCron(time)

    if (userPages.length <= 0) {
        console.log('Any reports to do')

        return
    }

    for await (const page of userPages) {
        const analysis = await startAnalysys(page)

        insertReport(analysis, page.user_id)
    }
}
