import { React, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getFilmListsPaginated,  } from "../../api/filmListsApi";
import FilmListList from "../../components/Lists/FilmListList";
import PaginationControls from "../../components/PaginationControls";

function Lists() {
  const [lists, setLists] = useState(null);
  const [page, setPage] = useState(1);
  const [listsPerPage, setListsPerPage] = useState(20);
  const [isLastPage, setIsLastPage] = useState(false);
  const [lastPageLoaded, setLastPageLoaded] = useState(null);

  useEffect(() => {
    if (!lists) {
      getLists();
    }
  }, [lists]);

  useEffect(() => {
    if(lastPageLoaded != null) getLists();
  }, [page]);

  function getLists(){
    getFilmListsPaginated(page, listsPerPage).then(res => {
      setLists(res);
      let lastPage = res.length != listsPerPage;
      setIsLastPage(lastPage);
      setLastPageLoaded(page);
    }).catch(err => {
      console.log(err);
      toast.error(`Error getting lists ${err.message}`, {
          autoClose: false,
      });
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
    <div className="lists-page">
      {!lists ? (
        <p>Loading lists....</p>
      ) : (
        <div className="mt-4">
          <FilmListList lists={lists} />
          <PaginationControls currentPage={page} onNext={handleNextPage} onPrevious={handlePreviousPage} isLastPage={isLastPage} />
        </div>
      )}
    </div>
  )
}

export default Lists;
