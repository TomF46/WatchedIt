import PropTypes from "prop-types";
import NewsArticlePreview from "./NewsArticlePreview";

const NewsArticleGrid = ({ articles }) => {
  return (
    <div className="grid grid-cols-20">
      {articles.map((article) => {
        return <NewsArticlePreview key={article.id} article={article} />;
      })}
    </div>
  );
};

NewsArticleGrid.propTypes = {
  articles: PropTypes.array.isRequired,
};

export default NewsArticleGrid;
