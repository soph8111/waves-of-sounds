import express from "express";
import artistRouter from "../routers/artistMysqlRouter";

const setupMysqlRouters = (app: express.Application) => {
    app.use("/artist", artistRouter);
};

export default setupMysqlRouters;