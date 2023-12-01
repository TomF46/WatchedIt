import PropTypes from "prop-types";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";

const NewsList = ({ articles }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-12">
      {articles.map((article) => {
        return (
          <div
            onClick={() => {
              navigate(`/news/${article.id}`);
            }}
            className="col-span-12 bg-backgroundOffset p-4 my-1 shadow rounded cursor-pointer"
            key={article.id}
          >
            <div className="grid grid-cols-12">
              <div className="col-span-12 md:col-span-8">
                {article.title} by{" "}
                <span className="text-primary">{article.authorName}</span>
                {!article.published && (
                  <span className="text-primary"> &#40;Unpublished&#41;</span>
                )}
              </div>
              <div className="col-span-12 md:col-span-4 text-right">
                {format(parseISO(article.createdDate), "dd/MM/yyyy HH:mm")}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

NewsList.propTypes = {
  articles: PropTypes.array.isRequired,
};

export default NewsList;
