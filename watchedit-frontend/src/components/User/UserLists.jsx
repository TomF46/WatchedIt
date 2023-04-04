import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import FilmListList from "../Lists/FilmListList";
import PaginationControls from "../PaginationControls";
import { getUsersFilmListsPaginated } from "../../api/filmListsApi";
import LoadingMessage from "../Loading/LoadingMessage";

function UserLists({user}) {
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
    getUsersFilmListsPaginated(user.id, page, listsPerPage).then(res => {
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
    <div className="users-lists">
      {!lists ? (
        <LoadingMessage message={"Loading users lists"} />
      ) : (
        <>
          <div className="mt-4">
            <h2 className="mt-4 text-primary text-xl ">{user.username} lists</h2>
            <FilmListList lists={lists} />
            <PaginationControls currentPage={page} onNext={handleNextPage} onPrevious={handlePreviousPage} isLastPage={isLastPage} />
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
