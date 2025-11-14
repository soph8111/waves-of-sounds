import useArticle from "../hooks/useArticle";
import ArticleCard from "./ArticleCard";

const LatestNews = () => {
    
      const { data: articles = [] } = useArticle();
    
        return (
          <div className="container">
            <h1>latest news</h1>
            <div className="latest_news">
              <div className="article_grid">
              {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
              ))}
              </div>
            </div>
          </div>
      );
      }

  
  export default LatestNews