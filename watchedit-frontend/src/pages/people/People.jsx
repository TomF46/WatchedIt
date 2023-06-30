import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import debounce from 'lodash.debounce';
import { searchPeoplePaginated } from "../../api/peopleApi";
import PersonGrid from "../../components/People/PersonGrid";
import PaginationControls from "../../components/PaginationControls";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import TextInput from "../../components/Inputs/TextInput";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import SelectInput from "../../components/Inputs/SelectInput";

function People({ isAdmin }) {
    const [peoplePaginator, setPeoplePaginator] = useState(null);
    const [searchTerms, setSearchTerms] = useState({firstName: "", lastName: "", stageName: ""});
    const [page, setPage] = useState(1);
    const peoplePerPage = 32;
    const [lastPageLoaded, setLastPageLoaded] = useState(null);
    const [sort, setSort] = useState("likes_desc");
    const sortOptions = [
        {id: "fName_asc", name: "First name A - Z"},
        {id: "fName_desc", name: "First name Z - A"},
        {id: "lName_asc", name: "Last name A - Z"},
        {id: "lName_desc", name: "Last name Z - A"},
        {id: "likes_desc", name: "Most likes"},
        {id: "likes_asc", name: "Least likes"},
        {id: "dob_asc", name: "Oldest"},
        {id: "dob_desc", name: "Youngest"},
    ]

    useEffect(() => {
        if (!peoplePaginator) {
            getPeople();
        }
    }, [peoplePaginator]);

    useEffect(() => {
        if (lastPageLoaded != null) getPeople();
    }, [page]);

    useEffect(() => {
        let debounced = debounce(
            () => { getPeople(); }, 50
        );

        debounced();
    }, [searchTerms, sort])

    function getPeople() {
        searchPeoplePaginated(searchTerms, page, peoplePerPage, sort)
            .then((res) => {
                setPeoplePaginator(res);
                setLastPageLoaded(page);
            })
            .catch((err) => {
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
        const { name, value } = event.target;
        setSearchTerms(prevSearchTerms => ({
            ...prevSearchTerms,
            [name]: value
        }));
    }

    function handleSortChange(event) {
        const { value } = event.target;
        setSort(value);
    }

    return (
        <div className="people-page">
            <h1 className="text-center text-primary text-4xl my-4 font-bold">
                People
            </h1>
            {isAdmin && (
                <div className="admin-controls bg-backgroundOffset mt-4 rounded-md shadow rounded">
                    <div className="bg-backgroundOffset2 rounded-t-md">
                        <p className="text-primary font-bold text-lg px-2 py-1">
                            Admin controls
                        </p>
                    </div>
                    <div className="px-2 py-2">
                        <Link
                            to={"/people/add"}
                            className="bg-backgroundOffset2 text-primary font-bold rounded py-2 px-4 hover:opacity-75 inline-block"
                        >
                            Add person
                        </Link>
                    </div>
                </div>
            )}
            {!peoplePaginator ? (
                <LoadingMessage message={"Loading people."} />
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
                    {peoplePaginator.data.length > 0 ? (
                        <>
                            <PersonGrid people={peoplePaginator.data} />
                            <PaginationControls
                                currentPage={page}
                                onNext={handleNextPage}
                                onPrevious={handlePreviousPage}
                                of={peoplePaginator.of}
                                from={peoplePaginator.from}
                                to={peoplePaginator.to}
                                lastPage={peoplePaginator.lastPage}
                            />
                        </>
                    ) : (
                        <p className="text-center text-primary text-2xl">No people match your search</p>
                    )}
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
