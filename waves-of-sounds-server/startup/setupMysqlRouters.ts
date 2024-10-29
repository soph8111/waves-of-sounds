import express from "express";
import artistRouter from "../routers/artistMysqlRouter";
import stageRouter from "../routers/stageMysqlRouter";

const setupMysqlRouters = (app: express.Application) => {
    app.use("/artist", artistRouter);
    app.use("/stage", stageRouter);
};

export default setupMysqlRouters;