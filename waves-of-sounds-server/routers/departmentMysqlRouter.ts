import { Router } from "express";
import { AppDataSource } from "../startup/data-source";
import { Department } from "../entities/Department";

interface Response {
  count: number;
  results: Department[];
}

const departmentRouter = Router();
const departmentRepository = AppDataSource.getRepository(Department);

// Get all departments
departmentRouter.get("/", async (req, res) => {
  const departments = await departmentRepository.find();
  const response: Response = {
    count: departments.length,
    results: departments,
  };
  res.send(response);
});

export default departmentRouter;

