import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import debounce from 'lodash.debounce';
import FilmGrid from "../../components/Films/FilmGrid";
import PaginationControls from "../../components/PaginationControls";
import { Link } from "react-router-dom";
import { searchFilmsPaginated, searchFilmsWithCategoryPaginated } from "../../api/filmsApi";
import TextInput from "../../components/Inputs/TextInput";
import { getCategories } from "../../api/categoriesApi";
import SelectInput from "../../components/Inputs/SelectInput";
import LoadingMessage from "../../components/Loading/LoadingMessage";

function Films({ isAdmin }) {
    const [films, setFilms] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [categories, setCategories] = useState(null);
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);
    const filmsPerPage = 20;
    const [isLastPage, setIsLastPage] = useState(false);
    const [lastPageLoaded, setLastPageLoaded] = useState(null);

    useEffect(() => {
        if (!films) {
            getFilms();
        }
    }, [films]);

    useEffect(() => {
        if (lastPageLoaded != null) getFilms();
    }, [page]);

    useEffect(() => {
        let debounced = debounce(
            () => { getFilms(); }, 50
        );

        debounced();
    }, [searchTerm, category])

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
        searchFilmsWithCategoryPaginated(searchTerm, category ,page, filmsPerPage)
            .then((res) => {
                setFilms(res);
                let lastPage = res.length != filmsPerPage;
                setIsLastPage(lastPage);
                setLastPageLoaded(page);
            })
            .catch((err) => {
                console.log(err);
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
        console.log(category);
    }

    return (
        <div className="films-page">
            {isAdmin && (
                <div className="admin-controls bg-backgroundOffset mt-4 rounded-md">
                    <div className="bg-primary rounded-t-md">
                        <p className="text-white font-bold text-lg px-2 py-1">
                            Admin controls
                        </p>
                    </div>
                    <div className="px-2 py-2">
                        <Link
                            to={"/films/add"}
                            className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block"
                        >
                            Add film
                        </Link>
                    </div>
                </div>
            )}
            {!films ? (
                <LoadingMessage message={"Loading films."} />
            ) : (
                <div className="mt-4">
                    <div className="search-controls bg-backgroundOffset mt-4 rounded-md mb-4">
                        <div className="bg-primary rounded-t-md">
                            <p className="text-white font-bold text-lg px-2 py-1">
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
                            </div>
                        </div>
                    </div>
                    <FilmGrid films={films} editable={false} />
                    <PaginationControls
                        currentPage={page}
                        onNext={handleNextPage}
                        onPrevious={handlePreviousPage}
                        isLastPage={isLastPage}
                    />
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
