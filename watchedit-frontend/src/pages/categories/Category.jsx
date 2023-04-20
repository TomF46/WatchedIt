import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import debounce from 'lodash.debounce';
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCategoryById } from "../../api/categoriesApi";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import FilmGrid from "../../components/Films/FilmGrid";
import PaginationControls from "../../components/PaginationControls";
import { searchFilmsWithCategoryPaginated } from "../../api/filmsApi";
import TextInput from "../../components/Inputs/TextInput";


function Category({isAdmin}){
    const { id } = useParams();
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState(null);
    const [filmsPaginator, setFilmsPaginator] = useState(null);
    const [page, setPage] = useState(1);
    const filmsPerPage = 32;
    const [lastPageLoaded, setLastPageLoaded] = useState(null);

    useEffect(() => {
        if (!category) {
            getCategory();
        }
    }, [id, category]);

    useEffect(() => {
        if (lastPageLoaded != null) getFilms(category);
    }, [page]);

    useEffect(() => {
        let debounced = debounce(
            () => { getFilms(category); }, 50
        );

        debounced();
    }, [searchTerm])

    function getCategory(){
        getCategoryById(id).then(res => {
            setCategory(res);
            getFilms(res);
        }).catch(err => {
            toast.error(`Error getting category ${err.data.Exception}`, {
                autoClose: false,
            });
        });
    }

    function getFilms(category) {
        console.log(category);
        searchFilmsWithCategoryPaginated(searchTerm, category.id ,page, filmsPerPage)
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

    return(
        <div className="categories-page">
            {!category ? (
                <LoadingMessage message={"Loading category"} />
            ) : (
                <div>
                    {isAdmin && (
                        <div className="admin-controls bg-backgroundOffset mt-4 rounded-md shadow rounded">
                            <div className="bg-backgroundOffset2 rounded-t-md">
                                <p className="text-primary font-bold text-lg px-2 py-1">
                                    Admin controls
                                </p>
                            </div>
                            <div className="px-2 py-2">
                                <Link
                                    to={`/categories/${id}/edit`}
                                    className="bg-backgroundOffset2 text-primary rounded py-2 px-4 hover:opacity-75 inline-block"
                                >
                                    Edit category
                                </Link>
                            </div>
                        </div>
                    )}
                    <h1 className="text-center text-primary text-4xl my-4 font-bold">
                        {category.name}
                    </h1>
                    {!filmsPaginator ? (
                        <LoadingMessage message={"Loading films."} />
                    ) : (
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
                                        onNext={handleNextPage}
                                        onPrevious={handlePreviousPage}
                                        of={filmsPaginator.of}
                                        from={filmsPaginator.from}
                                        to={filmsPaginator.to}
                                        lastPage={filmsPaginator.lastPage}
                                    />
                                </>
                            ) : (
                                <p className="text-center text-primary text-2xl">No films match your search</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )

}

Category.propTypes = {
    isAdmin: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        isAdmin: state.isAdmin
    };
};

export default connect(mapStateToProps)(Category);

