import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { searchFilmListsPaginated } from "../../api/filmListsApi";
import FilmListList from "../../components/Lists/FilmListList";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import PaginationControls from "../../components/PaginationControls";
import TextInput from "../../components/Inputs/TextInput";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import ListIcon from "../../components/Icons/ListIcon";

function Lists() {
  const [searchTerms, setSearchTerms] = useState({
    searchTerm: "",
    username: "",
  });
  const [page, setPage] = useState(1);
  const listsPerPage = 20;
  const queryKeyParams = useDebounce([searchTerms, page, listsPerPage], 100);

  const { isLoading, data: listsPaginator } = useQuery({
    queryKey: ["lists", ...queryKeyParams],
    queryFn: () =>
      searchFilmListsPaginated(
        searchTerms.searchTerm,
        searchTerms.username,
        page,
        listsPerPage,
      ).catch((error) => {
        toast.error(`Error getting people ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
    placeholderData: keepPreviousData,
    staleTime: 100,
  });

  function handleSearchTermChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    const { name, value } = event.target;
    setSearchTerms((prevSearchTerms) => ({
      ...prevSearchTerms,
      [name]: value,
    }));
    if (page != 1) setPage(1);
  }

  return (
    <div className="lists-page">
      <h1 className="text-center text-primary text-4xl my-4 font-semibold">
        Lists
      </h1>
      <div className="lists-controls bg-backgroundOffset mt-4 shadow rounded">
        <div className="bg-backgroundOffset2 rounded-t-md">
          <p className="text-primary font-semibold text-lg px-2 py-1">
            Lists controls
          </p>
        </div>
        <div className="px-2 py-2">
          <Link
            to={"/lists/add"}
            className="bg-backgroundOffset2 text-primary font-semibold rounded py-2 px-4 hover:opacity-75 inline-block"
          >
            Add list
          </Link>
        </div>
      </div>
      <div className="mt-4">
        <div className="mt-4">
          <div className="controls bg-backgroundOffset mt-4 rounded-md mb-4 shadow">
            <div className="bg-backgroundOffset2 rounded-t-md">
              <p className="text-primary font-semibold text-lg px-2 py-1">
                Search
              </p>
            </div>
            <div className="px-2 py-2">
              <div className="search-box flex">
                <div>
                  <TextInput
                    name="searchTerm"
                    label="Search term"
                    value={searchTerms.searchTerm}
                    onChange={handleSearchTermChange}
                    required={false}
                  />
                </div>
                <div className="ml-2">
                  <TextInput
                    name="username"
                    label="User"
                    value={searchTerms.username}
                    onChange={handleSearchTermChange}
                    required={false}
                  />
                </div>
              </div>
            </div>
          </div>
          {isLoading ? (
            <LoadingMessage message={"Loading lists."} />
          ) : (
            <>
              {listsPaginator.data.length > 0 ? (
                <>
                  <FilmListList lists={listsPaginator.data} />
                  <PaginationControls
                    currentPage={page}
                    onPageChange={setPage}
                    of={listsPaginator.of}
                    from={listsPaginator.from}
                    to={listsPaginator.to}
                    lastPage={listsPaginator.lastPage}
                  />
                </>
              ) : (
                <div className="my-16">
                  <div className="flex justify-center text-center">
                    <ListIcon color="primary" height={14} width={14} />
                  </div>
                  <p className="text-center text-2xl">
                    No lists match your search
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Lists;
