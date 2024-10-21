import "reflect-metadata";
import { DataSource } from "typeorm";
const connectionString = process.env.MYSQL_URL;
if (!connectionString) {
throw new Error("DATABASE_URL is not defined in the .env file");
}
export const AppDataSource = new DataSource({
type: "mysql",
url: connectionString,
synchronize: true,
logging: true,
entities: [__dirname + "/../entities/*.ts"],
subscribers: [],
migrations: [],
});