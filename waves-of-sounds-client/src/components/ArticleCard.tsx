import { Link } from "react-router-dom";
import { Article } from "../hooks/useArticle";

interface Props {
    article: Article;
  }

  const ArticleCard = ({ article }: Props) => {

    
    return (

        <Link to={`/news/${article.title}`} relative="path" state={article}>
        <div className="article_card" key={article.id} >
            <img src={article.image} alt={article.title} 
            onError={(e) => {
            e.currentTarget.src = "/img/articles/placeholder.jpg";
          }}/>
            <div className="article_card_info">
               {article.title}
            </div>
        </div>
        </Link>

    );
  }

  export default ArticleCard 


