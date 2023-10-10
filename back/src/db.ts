import { Database } from "bun:sqlite";

export const db = (callback: Function) => {
  const db = new Database("example.db", { create: true });

  const result = callback(db);

  db.close();

  return result;
};
