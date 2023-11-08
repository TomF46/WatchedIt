import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import { searchFilmsPaginated } from "../../api/filmsApi";
import { toast } from "react-toastify";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import SelectFilmWSearch from "../../components/Films/Credits/SelectFilmWSearch";
import PaginationControls from "../../components/PaginationControls";

const GuessSection = ({ guess }) => {
  const [filmsPaginator, setFilmsPaginator] = useState(null);
  const [page, setPage] = useState(1);
  const filmsPerPage = 16;
  const [lastPageLoaded, setLastPageLoaded] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!filmsPaginator) {
      search();
    }
  }, [filmsPaginator]);

  useEffect(() => {
    if (lastPageLoaded != null) search();
  }, [page]);

  useEffect(() => {
    let debounced = debounce(() => {
      search();
    }, 50);

    debounced();
  }, [searchTerm]);

  function search() {
    searchFilmsPaginated(searchTerm, page, filmsPerPage)
      .then((res) => {
        setFilmsPaginator(res);
        setLastPageLoaded(page);
      })
      .catch((err) => {
        toast.error(`Error getting films ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }

  function handleSearchTermChange(event) {
    const { value } = event.target;
    setSearchTerm(value);
  }

  function handleFilmSelected(film) {
    guess(film);
  }

  return (
    <div>
      <h3 className="text-4xl text-primary text-center mb-2">Guess</h3>
      <div>
        {!filmsPaginator ? (
          <LoadingMessage message={"Loading films."} />
        ) : (
          <>
            <SelectFilmWSearch
              films={filmsPaginator.data}
              searchTerm={searchTerm}
              onSearchTermChange={handleSearchTermChange}
              onFilmSelected={handleFilmSelected}
              cardMode={true}
            />
            <PaginationControls
              currentPage={page}
              onPageChange={setPage}
              of={filmsPaginator.of}
              from={filmsPaginator.from}
              to={filmsPaginator.to}
              lastPage={filmsPaginator.lastPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

GuessSection.propTypes = {
  guess: PropTypes.func.isRequired,
};

export default GuessSection;
