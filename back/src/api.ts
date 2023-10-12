import { selectReport, selectReports } from "./queries";

import { Hono } from "hono";

const api = new Hono();

//Routes
api.get("/reports", async (c: any): Promise<Response> => {
  const reports = await selectReports();
  if (!reports) {
    return c.json({ error: "Not Found", ok: false }, 404);
  }
  return c.json({ reports, ok: true }, 200);
});

api.get("/reports/:id", async (c: any): Promise<Response> => {
  const { id } = c.req.param();

  const report = await selectReport(id);
  if (!report) {
    return c.json({ error: "Not Found", ok: false }, 404);
  }
  return c.json({ report: report, ok: true });
});

//Handling
api.notFound((c: any) => {
  return c.text("Something not exist", 404);
});

api.onError((err: any, c: any) => {
  console.error(`${err}`);
  return c.text("Server Error", 500);
});

export { api };
