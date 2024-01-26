import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import { toast } from "react-toastify";
import { searchPeoplePaginated } from "../../../api/peopleApi";
import SelectPersonWSearch from "../../../components/People/Credits/SelectPersonWSearch";
import LoadingMessage from "../../../components/Loading/LoadingMessage";
import PaginationControls from "../../../components/PaginationControls";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const ConnectionsGuessSection = ({ guess }) => {
  const [page, setPage] = useState(1);
  const peoplePerPage = 16;
  const [searchTerms, setSearchTerms] = useState({
    firstName: "",
    lastName: "",
    stageName: "",
  });

  const { data: peoplePaginator, refetch } = useQuery({
    queryKey: ["people", searchTerms, page, peoplePerPage],
    queryFn: () =>
      searchPeoplePaginated(searchTerms, page, peoplePerPage).catch((error) => {
        toast.error(`Error getting people ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    let debounced = debounce(() => {
      refetch();
    }, 50);

    debounced();
  }, [page, searchTerms, refetch]);

  function handleSearchTermChange(event) {
    const { name, value } = event.target;
    setSearchTerms((prevSearchTerms) => ({
      ...prevSearchTerms,
      [name]: value,
    }));
    if (page != 1) setPage(1);
  }

  function handlePersonSelected(person) {
    guess(person);
  }

  return (
    <div>
      <h3 className="text-4xl text-primary text-center mb-2">Guess</h3>
      <div>
        {!peoplePaginator ? (
          <LoadingMessage message={"Loading people."} />
        ) : (
          <>
            <SelectPersonWSearch
              people={peoplePaginator.data}
              searchTerms={searchTerms}
              onSearchTermChange={handleSearchTermChange}
              onPersonSelected={handlePersonSelected}
              cardMode={true}
            />
            <PaginationControls
              currentPage={page}
              onPageChange={setPage}
              of={peoplePaginator.of}
              from={peoplePaginator.from}
              to={peoplePaginator.to}
              lastPage={peoplePaginator.lastPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

ConnectionsGuessSection.propTypes = {
  guess: PropTypes.func.isRequired,
};

export default ConnectionsGuessSection;
