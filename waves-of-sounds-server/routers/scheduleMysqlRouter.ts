import { Router } from "express";
import { AppDataSource } from "../startup/data-source";
import { Schedule } from "../entities/Schedule";

interface Response {
  count: number;
  results: Schedule[];
}

const scheduleRouter = Router();
const scheduleRepository = AppDataSource.getRepository(Schedule);

/**
 * @openapi
 * /dates:
 *   get:
 *     summary: Get all schedules
 *     description: Returns all schedule entries.
 *     responses:
 *       '200':
 *         description: List of schedules
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 10
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Schedule'
 */

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

