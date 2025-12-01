import useArticle from "../../hooks/useArticle";
import ArticleCard from "../news/ArticleCard";
import { getLatest } from "../../utils/articles";

const LatestNews = () => {
  const { data: articles = [] } = useArticle();

  const latestFive = getLatest(articles, 5);

  return (
    <div className="container">
      <h1>latest news</h1>
      <div className="latest_news">
        <div className="article_grid">
          {latestFive.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
