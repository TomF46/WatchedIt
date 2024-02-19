import { useState } from "react";
import { useSelector } from "react-redux";
import { searchPeoplePaginated } from "../../api/peopleApi";
import PersonGrid from "../../components/People/PersonGrid";
import PaginationControls from "../../components/PaginationControls";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import TextInput from "../../components/Inputs/TextInput";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import SelectInput from "../../components/Inputs/SelectInput";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { RootState } from "../../redux/store";
import { PeopleSearchTerms } from "../../types/People";

function People() {
  const isAdmin = useSelector((state: RootState) => state.isAdmin);
  const [searchTerms, setSearchTerms] = useState<PeopleSearchTerms>({
    firstName: "",
    lastName: "",
    stageName: "",
  });
  const [page, setPage] = useState(1);
  const peoplePerPage = 32;
  const [sort, setSort] = useState("likes_desc");
  const sortOptions = [
    { id: "fName_asc", name: "First name A - Z" },
    { id: "fName_desc", name: "First name Z - A" },
    { id: "lName_asc", name: "Last name A - Z" },
    { id: "lName_desc", name: "Last name Z - A" },
    { id: "likes_desc", name: "Most likes" },
    { id: "likes_asc", name: "Least likes" },
    { id: "dob_asc", name: "Oldest" },
    { id: "dob_desc", name: "Youngest" },
  ];
  const queryKeyParams = useDebounce(
    [searchTerms, sort, page, peoplePerPage],
    100,
  );

  const { isLoading, data: peoplePaginator } = useQuery({
    queryKey: ["people", ...queryKeyParams],
    queryFn: () =>
      searchPeoplePaginated(searchTerms, page, peoplePerPage, sort).catch(
        (error) => {
          toast.error(`Error getting people ${error.data.Exception}`, {
            autoClose: false,
          });
          return error;
        },
      ),
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

  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    const { value } = event.target;
    setSort(value);
    if (page != 1) setPage(1);
  }

  return (
    <div className="people-page">
      <h1 className="text-center text-primary text-4xl my-4 font-semibold">
        People
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
              to={"/people/add"}
              className="bg-backgroundOffset2 text-primary font-semibold rounded py-2 px-4 hover:opacity-75 inline-block"
            >
              Add person
            </Link>
          </div>
        </div>
      )}
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
                  name="firstName"
                  label="First name"
                  value={searchTerms.firstName}
                  onChange={handleSearchTermChange}
                  required={false}
                />
              </div>
              <div className="ml-2">
                <TextInput
                  name="lastName"
                  label="Last name"
                  value={searchTerms.lastName}
                  onChange={handleSearchTermChange}
                  required={false}
                />
              </div>
              <div className="ml-2">
                <TextInput
                  name="stageName"
                  label="Stage name"
                  value={searchTerms.stageName}
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
        {isLoading ? (
          <LoadingMessage message={"Loading people."} />
        ) : (
          <>
            {peoplePaginator.data.length > 0 ? (
              <>
                <PersonGrid people={peoplePaginator.data} />
                <PaginationControls
                  currentPage={page}
                  onPageChange={setPage}
                  of={peoplePaginator.of}
                  from={peoplePaginator.from}
                  to={peoplePaginator.to}
                  lastPage={peoplePaginator.lastPage}
                />
              </>
            ) : (
              <p className="text-center text-primary text-2xl">
                No people match your search
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default People;
