import { useState } from "react";
import PropTypes from "prop-types";
import { searchFilmsPaginated } from "../../api/filmsApi";
import { toast } from "react-toastify";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import SelectFilmWSearch from "../../components/Films/Credits/SelectFilmWSearch";
import PaginationControls from "../../components/PaginationControls";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";

const GuessSection = ({ guess }) => {
  const [page, setPage] = useState(1);
  const filmsPerPage = 16;
  const [searchTerm, setSearchTerm] = useState("");
  const queryKeyParams = useDebounce([searchTerm, page, filmsPerPage], 100);

  const { data: filmsPaginator } = useQuery({
    queryKey: ["films", ...queryKeyParams],
    queryFn: () =>
      searchFilmsPaginated(
        { searchTerm: searchTerm },
        page,
        filmsPerPage,
      ).catch((error) => {
        toast.error(`Error getting films ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
    placeholderData: keepPreviousData,
    staleTime: 100,
  });

  function handleSearchTermChange(event) {
    const { value } = event.target;
    setSearchTerm(value);
    if (page != 1) setPage(1);
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
