import { AppDataSource } from "./data-source";

const dbConnectMysql = async () => {
  try {
    await AppDataSource.initialize(); // initialize the datasource
    console.log("Database connection successful");
  } catch (err) {
    console.log("Error connecting to Mysql", err);
  }
};

export default dbConnectMysql;