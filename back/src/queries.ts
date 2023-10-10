import { db } from "./db.ts";

export const getReports = () => {
  return db((Db) => {
    const query = Db.query("SELECT * FROM reports;");
    return query.all();
  });
};

export const getReport = (id: string) => {
  return db((Db) => {
    const query = Db.query("SELECT * FROM reports WHERE id =?");
    return query.all();
  });
};

export const insertReport = (report: Analysis) => {
  const r = JSON.stringify(report);

  db((Db) => {
    const query = Db.query(
      "INSERT INTO reports(created_at, result) values (? ,?)"
    );
    query.run(report.created_at, r);
  });
};
