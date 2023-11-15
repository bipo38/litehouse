import { insertPage } from "../db/queries/page";
import { insertReport } from "../db/queries/report";
import { mockAnalysis } from "../mocks/analysis";
import { mockPage } from "../mocks/page";

insertReport(mockAnalysis , 1)
// insertPage(mockPage , 1)