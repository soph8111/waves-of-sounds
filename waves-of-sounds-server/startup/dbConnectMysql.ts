// import { AppDataSource } from "./data-source";

// const dbConnectMysql = async () => {
//   try {
//     await AppDataSource.initialize(); // initialize the datasource
//     console.log("Database connection successful");
//   } catch (err) {
//     console.log("Error connecting to Mysql", err);
//   }
// };

// export default dbConnectMysql;

import { AppDataSource } from "./data-source";

const dbConnectMysql = async () => {
  try {
    await AppDataSource.initialize(); // initialize the datasource
    console.log("Database connection successful");

    // Kør en hurtig test-query for at sikre forbindelsen i logs
    try {
      const result = await AppDataSource.query("SELECT 1 AS ok");
      console.log("DB test query result:", result);
    } catch (qErr) {
      console.log("DB test query failed:", qErr);
    }
  } catch (err) {
    console.log("Error connecting to Mysql", err);
    // Valgfrit: exit process hvis der ikke er forbindelse (gør fejlsøgning lettere)
    // process.exit(1);
  }
};

export default dbConnectMysql;
