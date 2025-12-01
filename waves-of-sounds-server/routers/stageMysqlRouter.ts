import { Router } from "express";
import { AppDataSource } from "../startup/data-source";
import { Stage } from "../entities/Stage";

interface Response {
  count: number;
  results: Stage[];
}

const stageRouter = Router();
const stageRepository = AppDataSource.getRepository(Stage);

/**
 * @openapi
 * /stages:
 *   get:
 *     summary: Get all stages
 *     description: Returns all stage entries.
 *     responses:
 *       '200':
 *         description: List of stages
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
 *                     $ref: '#/components/schemas/Stage'
 */

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

