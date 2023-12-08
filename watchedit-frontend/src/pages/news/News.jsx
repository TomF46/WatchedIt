import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { searchNewsPaginated } from "../../api/newsApi";
import { toast } from "react-toastify";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import PaginationControls from "../../components/PaginationControls";
import { Link } from "react-router-dom";
import NewsList from "../../components/News/NewsList";
import { getCurrentUserIsPublisher } from "../../api/usersApi";
import debounce from "lodash.debounce";
import TextInput from "../../components/Inputs/TextInput";
import SelectInput from "../../components/Inputs/SelectInput";

function News() {
  const userIsAuthenticated = useSelector((state) => state.tokens != null);
  const [userIsPublisher, setUserIsPublisher] = useState(false);
  const [articlesPaginator, setArticlesPaginator] = useState(null);
  const [searchTerms, setSearchTerms] = useState({
    title: "",
    publisher: "",
  });
  const [page, setPage] = useState(1);
  const articlesPerPage = 32;

  const [sort, setSort] = useState("created_desc");
  const sortOptions = [
    { id: "created_asc", name: "Oldest" },
    { id: "created_desc", name: "Latest" },
  ];

  useEffect(() => {
    let debounced = debounce(() => {
      searchNewsPaginated(searchTerms, page, articlesPerPage, sort)
        .then((res) => {
          setArticlesPaginator(res);
        })
        .catch((err) => {
          toast.error(`Error getting articles ${err.data.Exception}`, {
            autoClose: false,
          });
        });
    }, 50);

    debounced();
  }, [searchTerms, sort, page, articlesPerPage]);

  useEffect(() => {
    getCurrentUserIsPublisher().then((res) => {
      setUserIsPublisher(res.canPublish);
    });
  }, [userIsAuthenticated]);

  function handleSearchTermChange(event) {
    const { name, value } = event.target;
    setSearchTerms((prevSearchTerms) => ({
      ...prevSearchTerms,
      [name]: value,
    }));
    if (page != 1) setPage(1);
  }

  function handleSortChange(event) {
    const { value } = event.target;
    setSort(value);
    if (page != 1) setPage(1);
  }

  return (
    <div className="news-page">
      <h1 className="text-center text-primary text-4xl my-4 font-bold">News</h1>
      {userIsPublisher && (
        <div className="admin-controls bg-backgroundOffset mt-4 shadow rounded">
          <div className="bg-backgroundOffset2 rounded-t-md">
            <p className="text-primary font-bold text-lg px-2 py-1">
              Publisher controls
            </p>
          </div>
          <div className="px-2 py-2">
            <Link
              to={"/news/add"}
              className="bg-backgroundOffset2 text-primary font-bold rounded py-2 px-4 hover:opacity-75 inline-block"
            >
              Add article
            </Link>
            <Link
              to={"/profile/news"}
              className="bg-backgroundOffset2 text-primary font-bold rounded py-2 px-4 ml-2 hover:opacity-75 inline-block"
            >
              View my articles
            </Link>
          </div>
        </div>
      )}
      {!articlesPaginator ? (
        <LoadingMessage message={"Loading articles."} />
      ) : (
        <div className="mt-4">
          <div className="controls bg-backgroundOffset mt-4 rounded-md mb-4 shadow">
            <div className="bg-backgroundOffset2 rounded-t-md">
              <p className="text-primary font-bold text-lg px-2 py-1">Search</p>
            </div>
            <div className="px-2 py-2">
              <div className="search-box flex">
                <div>
                  <TextInput
                    name="title"
                    label="Title"
                    value={searchTerms.title}
                    onChange={handleSearchTermChange}
                    required={false}
                  />
                </div>
                <div className="ml-2">
                  <TextInput
                    name="publisher"
                    label="Publisher"
                    value={searchTerms.publisher}
                    onChange={handleSearchTermChange}
                    required={false}
                  />
                </div>
                <div className="ml-2">
                  <SelectInput
                    name="sort"
                    label="Sort"
                    value={sort}
                    options={sortOptions}
                    onChange={handleSortChange}
                  />
                </div>
              </div>
            </div>
          </div>
          {articlesPaginator.data.length > 0 ? (
            <>
              <NewsList articles={articlesPaginator.data} gridMode={true} />
              <PaginationControls
                currentPage={page}
                onPageChange={setPage}
                of={articlesPaginator.of}
                from={articlesPaginator.from}
                to={articlesPaginator.to}
                lastPage={articlesPaginator.lastPage}
              />
            </>
          ) : (
            <div className="my-16">
              <p className="text-center text-2xl">No articles match search.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default News;
