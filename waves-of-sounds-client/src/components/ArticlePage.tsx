

import { useLocation } from 'react-router-dom'

export default function  ArticlePage () {
  const location = useLocation()
  const article = location.state

  return (
    <div className='container article_grid'>
        <div>
            <h1>{article.title}</h1>
            <p>{article.article}</p>
        </div>
        <img 
        className='article_img' 
        src={article.image} 
        alt={article.title} 
        onError={(e) => {
            e.currentTarget.src = "./public/img/article/placeholder.jpg";
          }}/>
    </div>
  )
}
