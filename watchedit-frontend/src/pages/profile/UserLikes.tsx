import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserById, getLikedPeopleByUserId } from "../../api/usersApi";
import PaginationControls from "../../components/PaginationControls";
import { useParams } from "react-router-dom";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import PersonGrid from "../../components/People/PersonGrid";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ErrorMessage from "../../components/Error/ErrorMessage";
import { RootState } from "../../redux/store";

function UserLikes() {
  const { id } = useParams();
  const currentUserId = useSelector((state : RootState) =>
    state.tokens ? state.tokens.id : null,
  );
  const userId = id ? id : currentUserId;
  const [page, setPage] = useState(1);
  const peoplePerPage = 32;

  const { data: user, error: userLoadError } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
  });

  const { data: peoplePaginator } = useQuery({
    queryKey: ["user-watchedlist", userId, page, peoplePerPage],
    queryFn: () =>
      getLikedPeopleByUserId(userId, page, peoplePerPage).catch((error) => {
        toast.error(`Error getting users likes ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
    placeholderData: keepPreviousData,
  });

  if (userLoadError) {
    return (
      <ErrorMessage message={"Error loading user."} error={userLoadError} />
    );
  }
  return (
    <div className="user-likes-page">
      {!user ? (
        <LoadingMessage message={"Loading user"} />
      ) : (
        <>
          <div>
            <h1 className="text-center text-primary text-4xl my-4 font-semibold">
              {user.username} liked people
            </h1>
            {peoplePaginator ? (
              <>
                {peoplePaginator.data.length > 0 ? (
                  <>
                    <PersonGrid people={peoplePaginator.data} />
                    <PaginationControls
                      currentPage={page}
                      onPageChange={setPage}
                      of={peoplePaginator.of}
                      from={peoplePaginator.from}
                      to={peoplePaginator.to}
                      lastPage={peoplePaginator.lastPage}
                    />
                  </>
                ) : (
                  <p className="text-center text-primary text-2xl">
                    {user.username} has not liked any people.
                  </p>
                )}
              </>
            ) : (
              <LoadingMessage message={"Loading liked people"} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default UserLikes;
