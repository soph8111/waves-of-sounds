import express from "express";
import artistRouter from "../routers/artistMysqlRouter";
import stageRouter from "../routers/stageMysqlRouter";
import scheduleRouter from "../routers/scheduleMysqlRouter";
import genreRouter from "../routers/genreMysqlRouter";
import articleRouter from "../routers/articleMysqlRouter";
import newsletterRouter from "../routers/newsletterMysqlRouter";
import departmentRouter from "../routers/departmentMysqlRouter";
import volunteerRouter from "../routers/volunteerMysqlRouter";
import userRouter from "../routers/userMysqlRouter";

const setupMysqlRouters = (app: express.Application) => {
    app.use("/artists", artistRouter);
    app.use("/stages", stageRouter);
    app.use("/dates", scheduleRouter);
    app.use("/genres", genreRouter);
    app.use("/articles", articleRouter);
    app.use("/newsletter", newsletterRouter);
    app.use("/departments", departmentRouter);
    app.use("/volunteers", volunteerRouter);
    app.use("/user", userRouter);
};

export default setupMysqlRouters;