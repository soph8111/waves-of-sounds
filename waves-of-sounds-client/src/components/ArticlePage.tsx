

import { useLocation } from 'react-router-dom'

export default function  ArticlePage () {
  const location = useLocation()
  const article = location.state

  return (
    <div className='container'>
            <h1>{article.title}</h1>
        <div className="split_content">
            <p>{article.article}</p>
        <img 
        className='article_img' 
        src={article.image} 
        alt={article.title} 
        onError={(e) => {
            e.currentTarget.src = "/img/articles/placeholder.jpg";
          }}/>
          </div>
    </div>
  )
}
