import NewsArticlePreview from "./NewsArticlePreview";
import { NewsArticle } from "../../types/News";

const NewsArticleGrid = ({ articles }: { articles: NewsArticle[] }) => {
  return (
    <div className="grid grid-cols-20">
      {articles.map((article) => {
        return <NewsArticlePreview key={article.id} article={article} />;
      })}
    </div>
  );
};

export default NewsArticleGrid;
