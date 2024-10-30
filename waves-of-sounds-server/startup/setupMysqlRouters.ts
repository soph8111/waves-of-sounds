import express from "express";
import artistRouter from "../routers/artistMysqlRouter";
import stageRouter from "../routers/stageMysqlRouter";
import scheduleRouter from "../routers/scheduleMysqlRouter";
import genreRouter from "../routers/genreMysqlRouter";
import articleRouter from "../routers/articleMysqlRouter";

const setupMysqlRouters = (app: express.Application) => {
    app.use("/artists", artistRouter);
    app.use("/stage", stageRouter);
    app.use("/date", scheduleRouter);
    app.use("/genre", genreRouter);
    app.use("/articles", articleRouter);
};

export default setupMysqlRouters;