import { Router } from "express";
import { AppDataSource } from "../startup/data-source";
import { Stage } from "../entities/Stage";

interface Response {
  count: number;
  results: Stage[];
}

const stageRouter = Router();
const stageRepository = AppDataSource.getRepository(Stage);

// Get all stages
stageRouter.get("/", async (req, res) => {
  const stages = await stageRepository.find();
  const response: Response = {
    count: stages.length,
    results: stages,
  };
  res.send(response);
});

export default stageRouter;

