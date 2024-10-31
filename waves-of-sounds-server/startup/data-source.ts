// import "reflect-metadata";
// import { DataSource } from "typeorm";
// const connectionString = process.env.MYSQL_URL;
// if (!connectionString) {
// throw new Error("DATABASE_URL is not defined in the .env file");
// }
// export const AppDataSource = new DataSource({
// type: "mysql",
// url: connectionString,
// synchronize: true,
// logging: true,
// entities: [__dirname + "/../entities/*.ts"],
// subscribers: [],
// migrations: [],
// });

import { DataSource } from "typeorm";
import "reflect-metadata";
import path from "path";

const connectionString = process.env.MYSQL_URL;

const isProduction = process.env.NODE_ENV === "production";

const entitiesPath = isProduction
  ? path.join(__dirname, "../entities/**/*.js")
  : path.join(__dirname, "../entities/**/*.ts");

export const AppDataSource = new DataSource({
  type: "mysql",
  url: connectionString,
  synchronize: false,
  logging: true,
  entities: [entitiesPath],
});