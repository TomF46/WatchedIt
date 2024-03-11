import { useState } from "react";
import { toast } from "react-toastify";
import FilmGrid from "../../components/Films/FilmGrid";
import PaginationControls from "../../components/PaginationControls";
import { Link } from "react-router-dom";
import { searchFilmsPaginated } from "../../api/filmsApi";
import TextInput from "../../components/Inputs/TextInput";
import { getCategories } from "../../api/categoriesApi";
import SelectInput from "../../components/Inputs/SelectInput";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import RatingInput from "../../components/Inputs/RatingInput";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useAppSelector } from "../../redux/store";
import FilmIcon from "../../components/Icons/FilmIcon";

function Films() {
  const isAdmin = useAppSelector((state) => state.admin.isAdmin);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<number | undefined>(undefined);
  const [ratings, setRatings] = useState({
    maxRating: undefined,
    minRating: undefined,
  });
  const [page, setPage] = useState(1);
  const filmsPerPage = 32;
  const [sort, setSort] = useState("rating_desc");
  const sortOptions = [
    { id: "name_asc", name: "A - Z" },
    { id: "name_desc", name: "Z - A" },
    { id: "release_desc", name: "Newest" },
    { id: "release_asc", name: "Oldest" },
    { id: "rating_desc", name: "Highest rated" },
    { id: "rating_asc", name: "Lowest rated" },
    { id: "watched_desc", name: "Most watched" },
    { id: "watched_asc", name: "Least watched" },
  ];

  const queryKeyParams = useDebounce(
    [searchTerm, category, sort, ratings, page, filmsPerPage],
    100,
  );

  const { isLoading, data: filmsPaginator } = useQuery({
    queryKey: ["films", ...queryKeyParams],
    queryFn: () =>
      searchFilmsPaginated(
        {
          searchTerm: searchTerm,
          category: category,
          sort: sort,
          maxRating: ratings.maxRating,
          minRating: ratings.minRating,
        },
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

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      getCategories()
        .then((res) => {
          return res;
        })
        .catch((error) => {
          toast.error(`Error getting categories ${error.data.Exception}`, {
            autoClose: false,
          });
          return error;
        }),
  });

  function handleSearchTermChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    const { value } = event.target;
    setSearchTerm(value);
    if (page != 1) setPage(1);
  }

  function handleCategoryChange(
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void {
    const { value } = event.target;
    if (isNaN(Number(value))) {
      setCategory(undefined);
    } else {
      setCategory(Number(value));
    }
    if (page != 1) setPage(1);
  }
  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    const { value } = event.target;
    setSort(value);
    if (page != 1) setPage(1);
  }

  function handleRatingsChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    const { name, value } = event.target;
    const converted = Number(value);
    if (converted < 0 || converted > 10) return;
    setRatings((prevRatings) => ({
      ...prevRatings,
      [name]: Number(value),
    }));
    if (page != 1) setPage(1);
  }

  return (
    <div className="films-page">
      <h1 className="text-center text-primary text-4xl my-4 font-semibold">
        Films
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
              to={"/films/add"}
              className="bg-backgroundOffset2 text-primary font-semibold rounded py-2 px-4 hover:opacity-75 inline-block"
            >
              Add film
            </Link>
          </div>
        </div>
      )}
      <div className="mt-4">
        <div className="search-controls bg-backgroundOffset mt-4 mb-4 shadow rounded">
          <div className="bg-backgroundOffset2 rounded-t-md">
            <p className="text-primary font-semibold text-lg px-2 py-1">
              Search
            </p>
          </div>
          <div className="px-2 py-2">
            <div className="search-box grid grid-cols-12">
              <div className="col-span-12 md:col-span-4 lg:col-span-2 px-2">
                <TextInput
                  name="searchTerm"
                  label="Search"
                  value={searchTerm}
                  onChange={handleSearchTermChange}
                  required={false}
                />
              </div>
              {categories && categories.length > 0 && (
                <div className="col-span-12 md:col-span-3 lg:col-span-2 px-2">
                  <SelectInput
                    name="category"
                    label="Category"
                    defaultText="All"
                    value={category}
                    options={categories}
                    onChange={handleCategoryChange}
                  />
                </div>
              )}
              <div className="col-span-6 md:col-span-2 lg:col-span-1 px-2">
                <RatingInput
                  name="minRating"
                  label="Min Rating"
                  value={ratings.minRating}
                  onChange={handleRatingsChange}
                  required={false}
                />
              </div>
              <div className="col-span-6 md:col-span-2 lg:col-span-1 px-2">
                <RatingInput
                  name="maxRating"
                  label="Max Rating"
                  value={ratings.maxRating}
                  onChange={handleRatingsChange}
                  required={false}
                />
              </div>
              <div className="col-span-12 md:col-span-3 lg:col-span-2 px-2">
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
        {isLoading ? (
          <LoadingMessage message={"Loading films."} />
        ) : (
          <>
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
                <div className="flex justify-center text-center">
                  <FilmIcon color="primary" height={14} width={14} />
                </div>
                <p className="text-center text-2xl">
                  No films match your search
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Films;
