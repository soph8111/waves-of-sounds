import { Link } from "react-router-dom";
import { Article } from "../hooks/useArticle";

interface Props {
    article: Article;
  }

  const ArticleCard = ({ article }: Props) => {

    
    return (

        <div key={article.id} >
            <img src={article.image} alt={article.title} />
            <div>
                <Link to={`/news/${article.title}`} relative="path" state={article}>{article.title}</Link>
            </div>
        </div>

    );
  }

  export default ArticleCard 


