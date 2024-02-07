import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";

const NewsArticlePreview = ({ article }) => {
  const navigate = useNavigate();
  return (
    <div className="col-span-10 md:col-span-5 lg:col-span-4 my-2">
      <div className="mx-2 bg-backgroundOffset cursor-pointer h-full shadow rounded">
        <div
          onClick={() => {
            navigate(`/news/${article.id}`);
          }}
          className="hover:opacity-75 relative"
        >
          <img
            src={article.thumbnailUrl}
            className={`w-full thumbnail rounded-t`}
            alt={`${article.title} thumbnail.`}
          />
          <div className="p-2">
            <div className="grid grid-cols-12">
              <div className="col-span-12">
                <h3 className="text-gray-400 text-sm">
                  {article.createdDate &&
                    format(parseISO(article.createdDate), "dd/MM/yyyy HH:mm")}
                  {!article.published && (
                    <span className="text-primary"> &#40;Unpublished&#41;</span>
                  )}
                </h3>
              </div>
              <div className="col-span-12">
                <h3 className="text-primary text-lg">{article.title}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

NewsArticlePreview.propTypes = {
  article: PropTypes.object.isRequired,
};

export default NewsArticlePreview;
