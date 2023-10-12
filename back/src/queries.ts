import { log } from "console";
import { db } from "./db";

export const selectReports = () => {
  return db((Db: any) => {
    const query = Db.query("SELECT * FROM reports;");
    return query.all();
  });
};

export const selectReport = (id: string) => {
  return db((Db: any) => {
    const query = Db.query("SELECT * FROM reports WHERE id = ?");

    return query.get(id);
  });
};

export const insertReport = (report: Analysis) => {
  db((Db: any) => {
    const query = Db.query(
      "INSERT INTO reports(created_at, result) values (? ,?)"
    );
    query.run(report.created_at, JSON.stringify(report.results));
  });
};
