import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCategoryById } from "../../api/categoriesApi";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import FilmGrid from "../../components/Films/FilmGrid";
import PaginationControls from "../../components/PaginationControls";
import { searchFilmsPaginated } from "../../api/filmsApi";
import TextInput from "../../components/Inputs/TextInput";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import ErrorMessage from "../../components/Error/ErrorMessage";
import { RootState } from "../../redux/store";

function Category() {
  const { id } = useParams();
  const isAdmin = useSelector((state: RootState) => state.isAdmin);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const filmsPerPage = 32;
  const queryKeyParams = useDebounce([searchTerm, id, page, filmsPerPage], 100);

  const { data: category, error: categoryLoadError } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(Number(id)),
  });

  const { data: filmsPaginator } = useQuery({
    queryKey: ["category-films", ...queryKeyParams],
    queryFn: () =>
      searchFilmsPaginated(
        { searchTerm: searchTerm, category: Number(id) },
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

  function handleSearchTermChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    const { value } = event.target;
    setSearchTerm(value);
    if (page != 1) setPage(1);
  }

  if (categoryLoadError) {
    return (
      <ErrorMessage
        message={"Error loading category"}
        error={categoryLoadError.data.Exception}
      />
    );
  }

  return (
    <div className="categories-page">
      {!category ? (
        <LoadingMessage message={"Loading category"} />
      ) : (
        <div>
          <h1 className="text-center text-primary text-4xl my-4 font-semibold">
            {category.name}
          </h1>
          {isAdmin && (
            <div className="admin-controls bg-backgroundOffset mt-4 shadow rounded">
              <div className="bg-backgroundOffset2 rounded-t-md">
                <p className="text-primary font-semibold text-lg px-2 py-1">
                  Admin controls
                </p>
              </div>
              <div className="px-2 py-2">
                <Link
                  to={`/categories/${id}/edit`}
                  className="bg-backgroundOffset2 text-primary font-semibold rounded py-2 px-4 hover:opacity-75 inline-block"
                >
                  Edit category
                </Link>
              </div>
            </div>
          )}
          {!filmsPaginator ? (
            <LoadingMessage message={"Loading films."} />
          ) : (
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
                        label="Search"
                        value={searchTerm}
                        onChange={handleSearchTermChange}
                        required={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {filmsPaginator.data.length > 0 ? (
                <>
                  <FilmGrid films={filmsPaginator.data} editable={false} />
                  <PaginationControls
                    currentPage={page}
                    onPageChange={setPage}
                    of={filmsPaginator.of}
                    from={filmsPaginator.from}
                    to={filmsPaginator.to}
                    lastPage={filmsPaginator.lastPage}
                  />
                </>
              ) : (
                <div className="my-16">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-14 h-14 text-primary mx-auto text-center"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
                    />
                  </svg>
                  <p className="text-center text-2xl">
                    No films match your search
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Category;
