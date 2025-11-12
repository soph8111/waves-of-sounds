import { Router, RequestHandler } from "express";
import { AppDataSource } from "../startup/data-source";
import { Article } from "../entities/Article";

interface Response {
  count: number;
  results: Article[];
}

const articleRouter = Router();
const articleRepository = AppDataSource.getRepository(Article);

// Get all articles ( GET )
articleRouter.get("/", async (req, res) => {
  const article = await articleRepository.find();
  const response: Response = {
    count: article.length,
    results: article,
  };
  res.send(response);
});

// Create article ( POST )


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

articleRouter.post("/", createArticle);

export default articleRouter;

