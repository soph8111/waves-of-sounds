import { useLocation } from 'react-router-dom'

export default function  NewsArticle () {
  const location = useLocation()
  const news = location.state

  return (
    <>
    <h1>TEST</h1>
    <h1>{news.titel}</h1>
    </>
  )
}
