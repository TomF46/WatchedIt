import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import debounce from "lodash.debounce";
import { searchFilmListsPaginated } from "../../api/filmListsApi";
import FilmListList from "../../components/Lists/FilmListList";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import PaginationControls from "../../components/PaginationControls";
import TextInput from "../../components/Inputs/TextInput";

function Lists() {
    const [listsPaginator, setListsPaginator] = useState(null);
    const [searchTerms, setSearchTerms] = useState({
        searchTerm: "",
        username: "",
    });
    const [page, setPage] = useState(1);
    const listsPerPage = 20;
    const [lastPageLoaded, setLastPageLoaded] = useState(null);

    useEffect(() => {
        if (!listsPaginator) {
            getLists();
        }
    }, [listsPaginator]);

    useEffect(() => {
        if (lastPageLoaded != null) getLists();
    }, [page]);

    useEffect(() => {
        let debounced = debounce(() => {
            getLists();
        }, 50);

        debounced();
    }, [searchTerms]);

    function getLists() {
        searchFilmListsPaginated(
            searchTerms.searchTerm,
            searchTerms.username,
            page,
            listsPerPage
        )
            .then((res) => {
                setListsPaginator(res);
                setLastPageLoaded(page);
            })
            .catch((err) => {
                toast.error(`Error getting lists ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    function handleNextPage() {
        var newPage = page + 1;
        setPage(newPage);
    }

    function handlePreviousPage() {
        var newPage = page - 1;
        setPage(newPage);
    }

    function handleSearchTermChange(event) {
        const { name, value } = event.target;
        setSearchTerms((prevSearchTerms) => ({
            ...prevSearchTerms,
            [name]: value,
        }));
    }

    return (
        <div className="lists-page">
            {!listsPaginator ? (
                <LoadingMessage message={"Loading lists."} />
            ) : (
                <>
                    <h1 className="text-center text-primary text-4xl my-4 font-bold">
                        Lists
                    </h1>
                    <div className="lists-controls bg-backgroundOffset mt-4 rounded-md shadow rounded">
                        <div className="bg-backgroundOffset2 rounded-t-md">
                            <p className="text-primary font-bold text-lg px-2 py-1">
                                Lists controls
                            </p>
                        </div>
                        <div className="px-2 py-2">
                            <Link
                                to={"/lists/add"}
                                className="bg-backgroundOffset2 text-primary rounded py-2 px-4 hover:opacity-75 inline-block"
                            >
                                Add list
                            </Link>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="mt-4">
                            <div className="controls bg-backgroundOffset mt-4 rounded-md shadow mb-4 shadow">
                                <div className="bg-backgroundOffset2 rounded-t-md">
                                    <p className="text-primary font-bold text-lg px-2 py-1">
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
                            {listsPaginator.data.length > 0 ? (
                                <>
                                    <FilmListList lists={listsPaginator.data} showUser={true}/>
                                    <PaginationControls
                                        currentPage={page}
                                        onNext={handleNextPage}
                                        onPrevious={handlePreviousPage}
                                        of={listsPaginator.of}
                                        from={listsPaginator.from}
                                        to={listsPaginator.to}
                                        lastPage={listsPaginator.lastPage}
                                    />
                                </>
                            ) : (
                                <p className="text-center text-primary text-2xl">
                                    No lists available
                                </p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Lists;
