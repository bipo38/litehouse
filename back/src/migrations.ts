import { db } from "./db";
import path from "path";
import fs from "node:fs";

const route: string = "./migrations/";

const init = () => {
  db((Db: any) => {
    migrate(Db);
  });
};

const migrate = (Db: any) => {
  const filenames = fs.readdirSync(route);

  filenames.forEach((f: string) => {
    if (path.extname(f) !== ".sql") {
      return;
    }

    const query = Db.prepare(getFileContent(f));
    query.run();
  });
};

const getFileContent = (f: string): string => {
  const path = route + f;

  const parsedFile = fs.readFileSync(path).toString();

  return parsedFile;
};

init();
