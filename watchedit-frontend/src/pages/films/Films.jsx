import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import debounce from 'lodash.debounce';
import FilmGrid from "../../components/Films/FilmGrid";
import PaginationControls from "../../components/PaginationControls";
import { Link } from "react-router-dom";
import { searchFilmsWithCategoryPaginated } from "../../api/filmsApi";
import TextInput from "../../components/Inputs/TextInput";
import { getCategories } from "../../api/categoriesApi";
import SelectInput from "../../components/Inputs/SelectInput";
import LoadingMessage from "../../components/Loading/LoadingMessage";

function Films({ isAdmin }) {
    const [filmsPaginator, setFilmsPaginator] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState(null);
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);
    const filmsPerPage = 32;
    const [lastPageLoaded, setLastPageLoaded] = useState(null);
    const [sort, setSort] = useState("rating_desc");
    const sortOptions = [
        {id: "name_asc", name: "A - Z"},
        {id: "name_desc", name: "Z - A"},
        {id: "release_desc", name: "Newest"},
        {id: "release_asc", name: "Oldest"},
        {id: "rating_desc", name: "Highest rated"},
        {id: "rating_asc", name: "Lowest rated"},
        {id: "watched_desc", name: "Most watched"},
        {id: "watched_asc", name: "Least watched"}
    ]

    useEffect(() => {
        if (!filmsPaginator) {
            getFilms();
        }
    }, [filmsPaginator]);

    useEffect(() => {
        if (lastPageLoaded != null) getFilms();
    }, [page]);

    useEffect(() => {
        let debounced = debounce(
            () => { getFilms(); }, 50
        );

        debounced();
    }, [searchTerm, category, sort])

    useEffect(() => {
        if (!categories) {
            getCategories().then(res => {
                setCategories(res);
            }).catch(error => {
                toast.error(`Error fetching categories ${error.message}`, {
                    autoClose: false
                }
                );
            });
        }
    }, [categories]);


    function getFilms() {
        if(isNaN(category)){
            setCategory("");
            return;
        }
        searchFilmsWithCategoryPaginated(searchTerm, category ,page, filmsPerPage, sort)
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

    function handleNextPage() {
        var newPage = page + 1;
        setPage(newPage);
    }

    function handlePreviousPage() {
        var newPage = page - 1;
        setPage(newPage);
    }

    function handleSearchTermChange(event){
        const { value } = event.target;
        setSearchTerm(value);
    }

    function handleCategoryChange(event) {
        const { value } = event.target;
        setCategory(value);
    }
    function handleSortChange(event) {
        const { value } = event.target;
        setSort(value);
    }

    return (
        <div className="films-page">
            <h1 className="text-center text-primary text-4xl my-4 font-bold">
                Films
            </h1>
            {isAdmin && (
                <div className="admin-controls bg-backgroundOffset mt-4 rounded-md shadow shadow rounded">
                    <div className="bg-backgroundOffset2 rounded-t-md">
                        <p className="text-primary font-bold text-lg px-2 py-1">
                            Admin controls
                        </p>
                    </div>
                    <div className="px-2 py-2">
                        <Link
                            to={"/films/add"}
                            className="bg-backgroundOffset2 text-primary font-bold rounded py-2 px-4 hover:opacity-75 inline-block"
                        >
                            Add film
                        </Link>
                    </div>
                </div>
            )}
            {!filmsPaginator ? (
                <LoadingMessage message={"Loading films."} />
            ) : (
                <div className="mt-4">
                    <div className="search-controls bg-backgroundOffset mt-4 rounded-md shadow mb-4 shadow shadow rounded">
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
                                        label="Search"
                                        value={searchTerm}
                                        onChange={handleSearchTermChange}
                                        required={false}
                                    />
                                </div>
                                {categories && categories.length > 0 && (
                                    <div className="ml-4">
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
                                <div className="ml-4">
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
                    {filmsPaginator.data.length > 0 ? (
                        <>
                            <FilmGrid films={filmsPaginator.data} editable={false} />
                            <PaginationControls
                                currentPage={page}
                                onNext={handleNextPage}
                                onPrevious={handlePreviousPage}
                                of={filmsPaginator.of}
                                from={filmsPaginator.from}
                                to={filmsPaginator.to}
                                lastPage={filmsPaginator.lastPage}
                            />
                        </>
                    ) : (
                        <div className="my-16">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14 text-primary mx-auto text-center">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                            </svg>
                            <p className="text-center text-2xl">No films match your search</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

Films.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        isAdmin: state.isAdmin,
    };
};

export default connect(mapStateToProps)(Films);
