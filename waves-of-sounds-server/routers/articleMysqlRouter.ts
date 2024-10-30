import { Router } from "express";
import { AppDataSource } from "../startup/data-source";
import { Article } from "../entities/Article";

interface Response {
  count: number;
  results: Article[];
}

const articleRouter = Router();
const articleRepository = AppDataSource.getRepository(Article);

// Get all articles
articleRouter.get("/", async (req, res) => {
  const article = await articleRepository.find();
  const response: Response = {
    count: article.length,
    results: article,
  };
  res.send(response);
});

export default articleRouter;

