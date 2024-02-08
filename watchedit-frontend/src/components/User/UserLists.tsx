import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import FilmListList from "../Lists/FilmListList";
import PaginationControls from "../PaginationControls";
import { getUsersFilmListsPaginated } from "../../api/filmListsApi";
import LoadingMessage from "../Loading/LoadingMessage";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

function UserLists({ user }) {
  const [page, setPage] = useState(1);
  const listsPerPage = 8;

  const {
    isLoading,
    data: listsPaginator,
    error,
  } = useQuery({
    queryKey: ["user-lists", user.id, page, listsPerPage],
    queryFn: () => getUsersFilmListsPaginated(user.id, page, listsPerPage),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <LoadingMessage message={"Loading user lists."} />;

  if (error) {
    toast.error(`Error getting user lists ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  return (
    <div className="users-lists">
      <div className="mt-4">
        <h2 className="mt-4 text-primary text-xl ">{user.username} lists</h2>
        {listsPaginator.data.length > 0 ? (
          <>
            <FilmListList lists={listsPaginator.data} showUser={false} />
            <PaginationControls
              currentPage={page}
              onPageChange={setPage}
              of={listsPaginator.of}
              from={listsPaginator.from}
              to={listsPaginator.to}
              lastPage={listsPaginator.lastPage}
            />
          </>
        ) : (
          <p className="text-lg">{user.username} has not created any lists.</p>
        )}
      </div>
    </div>
  );
}

UserLists.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserLists;