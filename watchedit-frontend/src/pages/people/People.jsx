import { React, useState, useEffect } from "react";
import { getPeoplePaginated } from "../../api/peopleApi";
import PersonGrid from "../../components/People/PersonGrid";
import PaginationControls from "../../components/PaginationControls";
import { toast } from "react-toastify";

function People() {
    const [people, setPeople] = useState(null);
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

    function getPeople() {
        getPeoplePaginated(page, peoplePerPage)
            .then((res) => {
                setPeople(res);
                let lastPage = res.length != peoplePerPage;
                setIsLastPage(lastPage);
                setLastPageLoaded(page);
            })
            .catch((err) => {
                console.log(err);
                toast.error(`Error getting people ${err.message}`, {
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

    return (
        <div className="people-page">
            {!people ? (
                <p>Loading people....</p>
            ) : (
                <div className="mt-4">
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

export default People;
