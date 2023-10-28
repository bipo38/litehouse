import { startAnalysys as startLighthouseAnalysys } from '../lighthouse'
import { mockPage } from '../mocks/page'

await startLighthouseAnalysys(mockPage)
