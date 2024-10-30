import { Router } from "express";
import { AppDataSource } from "../startup/data-source";
import { Schedule } from "../entities/Schedule";

interface Response {
  count: number;
  results: Schedule[];
}

const scheduleRouter = Router();
const scheduleRepository = AppDataSource.getRepository(Schedule);

// Get all schedules
scheduleRouter.get("/", async (req, res) => {
  const schedules = await scheduleRepository.find();
  const response: Response = {
    count: schedules.length,
    results: schedules,
  };
  res.send(response);
});

export default scheduleRouter;

