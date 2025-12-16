import express from "express";
import dbConnectMysql from "./dbConnectMysql";
import setupMysqlRouters from "./setupMysqlRouters";

// Connecting til databasen. App er exppress-server (fra index.ts)
const init = (app: express.Application) => {
  dbConnectMysql();
  setupMysqlRouters(app);
};

export default init;