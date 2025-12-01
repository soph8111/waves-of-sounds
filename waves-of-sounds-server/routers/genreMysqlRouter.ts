import { Router } from "express";
import { AppDataSource } from "../startup/data-source";
import { Genre } from "../entities/Genre";

interface Response {
  count: number;
  results: Genre[];
}

const genreRouter = Router();
const genreRepository = AppDataSource.getRepository(Genre);

/**
 * @openapi
 * /genres:
 *   get:
 *     summary: Get all genres
 *     description: Returns a list of all genres.
 *     responses:
 *       '200':
 *         description: List of genres
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 5
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Genre'
 */

// Get all genres
genreRouter.get("/", async (req, res) => {
  const genres = await genreRepository.find();
  const response: Response = {
    count: genres.length,
    results: genres,
  };
  res.send(response);
});

export default genreRouter;

