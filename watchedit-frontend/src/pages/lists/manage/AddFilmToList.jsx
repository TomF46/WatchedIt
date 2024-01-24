import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import debounce from "lodash.debounce";
import PaginationControls from "../../../components/PaginationControls";
import { addFilmToFilmList, getFilmListById } from "../../../api/filmListsApi";
import SelectFilmListWSearch from "../../../components/Films/SelectFilmListWSearch";
import { searchFilmsPaginated } from "../../../api/filmsApi";
import LoadingMessage from "../../../components/Loading/LoadingMessage";

function AddFilmToList() {
  const userId = useSelector((state) =>
    state.tokens ? state.tokens.id : null,
  );
  const navigate = useNavigate();
  const { id } = useParams();
  const [list, setList] = useState(null);
  const [filmsPaginator, setFilmsPaginator] = useState(null);
  const [page, setPage] = useState(1);
  const filmsPerPage = 20;
  const [searchTerm, setSearchTerm] = useState("");

  const getList = useCallback(() => {
    getFilmListById(id)
      .then((res) => {
        if (res.createdBy.id != userId) navigate(`/lists/${res.id}`);
        setList(res);
      })
      .catch((err) => {
        toast.error(`Error getting list ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }, [id, navigate, userId]);

  const search = useCallback(() => {
    searchFilmsPaginated({ searchTerm: searchTerm }, page, filmsPerPage)
      .then((res) => {
        setFilmsPaginator(res);
      })
      .catch((err) => {
        toast.error(`Error getting films ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }, [page, searchTerm, filmsPerPage]);

  useEffect(() => {
    getList();
  }, [id, getList]);

  useEffect(() => {
    let debounced = debounce(() => {
      search();
    }, 50);

    debounced();
  }, [page, searchTerm, search]);

  function handleSearchTermChange(event) {
    const { value } = event.target;
    setSearchTerm(value);
    if (page != 1) setPage(1);
  }

  function handleFilmSelected(film) {
    addFilmToFilmList(list.id, film)
      .then(() => {
        getList();
      })
      .catch((err) => {
        toast.error(`Error adding film to list ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }

  return (
    <div className="add-film-to-list-page">
      {!list ? (
        <LoadingMessage message={"Loading list."} />
      ) : (
        <div>
          <h1 className="text-center text-primary text-4xl my-4 font-semibold">
            Add films to {list.name}
          </h1>
          {!filmsPaginator ? (
            <LoadingMessage message={"Loading films."} />
          ) : (
            <>
              <Link
                to={`/lists/${list.id}`}
                className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block mt-4 text-center"
              >
                Back to list
              </Link>
              <div className="mt-4">
                <SelectFilmListWSearch
                  films={filmsPaginator.data}
                  currentFilms={list.films}
                  searchTerm={searchTerm}
                  onSearchTermChange={handleSearchTermChange}
                  onFilmSelected={handleFilmSelected}
                />
                <PaginationControls
                  currentPage={page}
                  onPageChange={setPage}
                  of={filmsPaginator.of}
                  from={filmsPaginator.from}
                  to={filmsPaginator.to}
                  lastPage={filmsPaginator.lastPage}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default AddFilmToList;
