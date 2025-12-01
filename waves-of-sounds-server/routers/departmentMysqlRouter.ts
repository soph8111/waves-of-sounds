
import { Router } from "express";
import { AppDataSource } from "../startup/data-source";
import { Department } from "../entities/Department";

interface Response {
  count: number;
  results: Department[];
}

const departmentRouter = Router();
const departmentRepository = AppDataSource.getRepository(Department);

/**
 * @openapi
 * /departments:
 *   get:
 *     summary: Get all departments
 *     description: Returns a list of all departments in the system.
 *     responses:
 *       '200':
 *         description: List of departments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 3
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Department'
 */

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

