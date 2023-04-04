import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getFilmListsPaginated,  } from "../../api/filmListsApi";
import FilmListList from "../../components/Lists/FilmListList";
import LoadingMessage from "../../components/Loading/LoadingMessage";
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
      {!lists ? (
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
            <FilmListList lists={lists} />
            <PaginationControls currentPage={page} onNext={handleNextPage} onPrevious={handlePreviousPage} isLastPage={isLastPage} />
          </div>
        </>
      )}
    </div>
  )
}

export default Lists;
