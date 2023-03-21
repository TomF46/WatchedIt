import { React, useState, useEffect } from "react";
import { getPeoplePaginated } from "../../api/peopleApi";
import PersonGrid from "../../components/People/PersonGrid";
import PaginationControls from "../../components/PaginationControls";

function People() {
  const [people, setPeople] = useState(null);
  const [page, setPage] = useState(1);
  const [peoplePerPage, setPeoplePerPage] = useState(2);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    if (!people) {
      getPeople();
    }
  }, [people]);

  useEffect(() => {
    getPeople()
  }, [page]);

  function getPeople(){
    getPeoplePaginated(page, peoplePerPage).then(res => {
      setPeople(res);
      let lastPage = res.length != peoplePerPage;
      setIsLastPage(lastPage);
    }).catch(err => {
      console.log(err);
    })
  }

  function handleNextPage(){
    var newPage = page + 1;
    setPage(newPage);
  }

  function handlePreviousPage(){
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
          <PaginationControls currentPage={page} onNext={handleNextPage} onPrevious={handlePreviousPage} isLastPage={isLastPage} />
        </div>
      )}
    </div>
  )
}

export default People;
