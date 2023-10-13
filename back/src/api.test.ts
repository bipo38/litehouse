import { describe, expect, test } from "bun:test";

import { api as app } from "./api";

describe("List Reports", () => {
  test("GET /reports", async () => {
    const res = await app.request("reports");
    expect(res.status).toBe(200);
  });
});

describe("Report get", () => {
  test("GET /reports/:id", async () => {
    const res = await app.request("reports/1");
    expect(res.status).toBe(200);
  });
});

describe("Not exist report", () => {
  test("GET /reports/:id", async () => {
    const res = await app.request("reports/10");
    expect(res.status).toBe(404);
  });
});

describe("Not found page", () => {
  test("GET /hola", async () => {
    const res = await app.request("hola");
    expect(res.status).toBe(404);
  });
});
