import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import FilmListList from "../Lists/FilmListList";
import PaginationControls from "../PaginationControls";
import { getUsersFilmListsPaginated } from "../../api/filmListsApi";
import LoadingMessage from "../Loading/LoadingMessage";

function UserLists({user}) {
  const [listsPaginator, setListsPaginator] = useState(null);
  const [page, setPage] = useState(1);
  const listsPerPage = 8;
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
    getUsersFilmListsPaginated(user.id, page, listsPerPage).then(res => {
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
    <div className="users-lists">
      {!listsPaginator ? (
        <LoadingMessage message={"Loading users lists"} />
      ) : (
        <>
          <div className="mt-4">
            <h2 className="mt-4 text-primary text-xl ">{user.username} lists</h2>
            {listsPaginator.data.length > 0 ? (
              <>
                <FilmListList lists={listsPaginator.data} showUser={false}/>
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
                <p className="text-lg">user has not created any lists.</p>
            )}
          </div>
        </>
      )}
    </div>
  )
}

UserLists.propTypes = {
    user: PropTypes.object.isRequired,
};


export default UserLists;
