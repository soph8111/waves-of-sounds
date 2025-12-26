import { Router, RequestHandler } from "express";
import { AppDataSource } from "../startup/data-source";
import { Article } from "../entities/Article";
import { requireAdmin } from "../src/middleware/requireAdmin";

interface Response {
  count: number;
  results: Article[];
}

const articleRouter = Router();
const articleRepository = AppDataSource.getRepository(Article);

/**
 * @openapi
 * /articles:
 *   get:
 *     summary: Get all articles
 *     description: Returns count and list of article objects.
 *     responses:
 *       '200':
 *         description: List of articles
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
 *                     $ref: '#/components/schemas/Article'
 */

// Get all articles ( GET )
articleRouter.get("/", async (req, res) => {
  const article = await articleRepository.find();
  const response: Response = {
    count: article.length,
    results: article,
  };
  res.send(response);
});


/**
 * @openapi
 * /articles:
 *   post:
 *     summary: Create a new article
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleInput'
 *           example:
 *             title: "New article"
 *             article: "Here is the article content..."
 *             image: "https://images.unsplash.com/photo....."
 *             date: "2025-11-28T12:00:00Z"
 *     responses:
 *       '201':
 *         description: Article created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       '400':
 *         description: Validation error (missing fields)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Server error
 */

// Create article ( POST )
const createArticle: RequestHandler = async (req, res) => {
  try {
    const { title, article: bodyArticle, image, date } = req.body;

    // Simple validation — brug res.* og returnér void (eller 'return;' for at stoppe funktionen)
    if (!title || !bodyArticle || !image) {
      res.status(400).json({ message: "title, article and image are required" });
      return;
    }

    const newArticle = articleRepository.create({
      title,
      article: bodyArticle,
      image,
      date: date ? new Date(date) : new Date(),
    } as Partial<Article>);

    const saved = await articleRepository.save(newArticle);
    res.status(201).json(saved); // <-- kald res og DON'T "return res"
  } catch (err) {
    console.error("Failed to save article:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

articleRouter.post("/", requireAdmin, createArticle);

export default articleRouter;

