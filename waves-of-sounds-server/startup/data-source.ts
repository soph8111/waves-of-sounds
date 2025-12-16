import { DataSource } from "typeorm";
import "reflect-metadata";
import path from "path";

const connectionString = process.env.MYSQL_URL; // Din connection string fra Azure
const isProduction = process.env.NODE_ENV === "production";

const entitiesPath = isProduction
  ? path.join(__dirname, "../entities/**/*.js")
  : path.join(__dirname, "../entities/**/*.ts");

// Hvis Azure/MySQL kræver SSL (typisk), sæt DB_REQUIRE_SSL=true i Render env
const requireSSL = process.env.DB_REQUIRE_SSL === "true";

// TypeORM's `extra` option videregiver parametre til mysql2-driveren
const extraOptions = requireSSL
  ? {
      ssl: {
        // rejectUnauthorized: false -> undgår cert-valideringsfejl (brug kun til test hvis nødvendigt).
        // For bedre sikkerhed, afprøv true hvis du kan installere og bruge cert korrekt.
        rejectUnauthorized: false,
      },
    }
  : {};

export const AppDataSource = new DataSource({
  type: "mysql",
  url: connectionString,
  synchronize: false,
  logging: true,
  entities: [entitiesPath],
  extra: extraOptions,
});
