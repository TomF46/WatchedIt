import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getFilmListsPaginated,  } from "../../api/filmListsApi";
import FilmListList from "../../components/Lists/FilmListList";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import PaginationControls from "../../components/PaginationControls";

function Lists() {
  const [listsPaginator, setListsPaginator] = useState(null);
  const [page, setPage] = useState(1);
  const listsPerPage = 20;
  const [isLastPage, setIsLastPage] = useState(false);
  const [lastPageLoaded, setLastPageLoaded] = useState(null);

  useEffect(() => {
    if (!listsPaginator) {
      getLists();
    }
  }, [listsPaginator]);

  useEffect(() => {
    if(lastPageLoaded != null) getLists();
  }, [page]);

  function getLists(){
    getFilmListsPaginated(page, listsPerPage).then(res => {
      setListsPaginator(res);
      setLastPageLoaded(page);
    }).catch(err => {
      toast.error(`Error getting lists ${err.data.Exception}`, {
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
      {!listsPaginator ? (
        <LoadingMessage message={"Loading lists."} />
      ) : (
        <>
          <div className="lists-controls bg-backgroundOffset mt-4 rounded-md">
              <div className="bg-primary rounded-t-md">
                  <p className="text-white font-bold text-lg px-2 py-1">
                      Lists controls
                  </p>
              </div>
              <div className="px-2 py-2">
                  <Link
                      to={"/lists/add"}
                      className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block"
                  >
                      Add list
                  </Link>
              </div>
          </div>
          <div className="mt-4">
            <h1 className="text-center text-primary text-2xl mb-4">Lists</h1>
            {listsPaginator.data.length > 0 ? (
              <>
                <FilmListList lists={listsPaginator.data} />
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
                <p className="text-center text-primary text-2xl">No lists available</p>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Lists;
