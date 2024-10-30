import useData from "./useData";

export interface Article {
  id: number;
  date: number;
  title: string;
  article: string;
  image: string;
}

const useArticle = () => useData<Article>("/articles");

export default useArticle;

