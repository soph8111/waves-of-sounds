import useArticle from "../hooks/useArticle";
import ArticleCard from "../components/news/ArticleCard";

const News = () => {
  const { data: articles = [] } = useArticle();

    return (
      <div className="container">
        <h1>news</h1>
        <div id="article_grid">
        {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
  );
  }

export default News