import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import debounce from 'lodash.debounce';
import { searchPeoplePaginated } from "../../api/peopleApi";
import PersonGrid from "../../components/People/PersonGrid";
import PaginationControls from "../../components/PaginationControls";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import TextInput from "../../components/Inputs/TextInput";

function People({ isAdmin }) {
    const [people, setPeople] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [peoplePerPage, setPeoplePerPage] = useState(20);
    const [isLastPage, setIsLastPage] = useState(false);
    const [lastPageLoaded, setLastPageLoaded] = useState(null);

    useEffect(() => {
        if (!people) {
            getPeople();
        }
    }, [people]);

    useEffect(() => {
        if (lastPageLoaded != null) getPeople();
    }, [page]);

    useEffect(() => {
        let debounced = debounce(
            () => { getPeople(); }, 50
        );

        debounced();
    }, [searchTerm])

    function getPeople() {
        searchPeoplePaginated(searchTerm, page, peoplePerPage)
            .then((res) => {
                setPeople(res);
                let lastPage = res.length != peoplePerPage;
                setIsLastPage(lastPage);
                setLastPageLoaded(page);
            })
            .catch((err) => {
                console.log(err);
                toast.error(`Error getting people ${err.data.Exception}`, {
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

    return (
        <div className="people-page">
            {isAdmin && (
                <div className="admin-controls bg-backgroundOffset mt-4 rounded-md">
                    <div className="bg-primary rounded-t-md">
                        <p className="text-white font-bold text-lg px-2 py-1">
                            Admin controls
                        </p>
                    </div>
                    <div className="px-2 py-2">
                        <Link
                            to={"/people/add"}
                            className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block"
                        >
                            Add person
                        </Link>
                    </div>
                </div>
            )}
            {!people ? (
                <p>Loading people....</p>
            ) : (
                <div className="mt-4">
                    <div className="search-controls bg-backgroundOffset mt-4 rounded-md mb-4">
                        <div className="bg-primary rounded-t-md">
                            <p className="text-white font-bold text-lg px-2 py-1">
                                Search
                            </p>
                        </div>
                        <div className="px-2 py-2">
                            <div className="search-box">
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
                    <PersonGrid people={people} />
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

People.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        isAdmin: state.isAdmin,
    };
};

export default connect(mapStateToProps)(People);
