
// https://reactrouter.com/en/main/components/link

import data from '../services/news.json';

import { Link } from "react-router-dom";

function News() {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.news.map((news) => (
          <li key={news.id}>
            <Link to={news.titel} state={news}>{news.titel}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
  
export default News
