
// // https://reactrouter.com/en/main/components/link

// import data from '../services/news.json';

// import { Link } from "react-router-dom";

// function News() {
//   return (
//     <div>
//       <h1>News</h1>
//       <ul>
//         {data.news.map((news) => (
//           <li key={news.id}>
//             <Link to={news.titel} state={news}>{news.titel}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
  
// export default News


import useArticle from "../hooks/useArticle";
import ArticleCard from "./ArticleCard";

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




