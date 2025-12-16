import { AppDataSource } from "./data-source";

const dbConnectMysql = async () => {
  try {
    await AppDataSource.initialize(); // initialize the datasource
    console.log("Database connection successful");

    // Kør en hurtig test-query for at sikre forbindelsen i logs
    try {
      const result = await AppDataSource.query("SELECT 1 AS ok");
      console.log("DB test query result:", result);
    } catch (error_) {
      console.log("DB test query failed:", error_);
    }
  } catch (err) {
    console.log("Error connecting to Mysql", err);
  }
};

export default dbConnectMysql;
