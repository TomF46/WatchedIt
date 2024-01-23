import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserById, getLikedPeopleByUserId } from "../../api/usersApi";
import PaginationControls from "../../components/PaginationControls";
import { useParams } from "react-router-dom";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import PersonGrid from "../../components/People/PersonGrid";

function UserLikes() {
  const { id } = useParams();
  const currentUserId = useSelector((state) =>
    state.tokens ? state.tokens.id : null,
  );
  const userId = id ? id : currentUserId;
  const [user, setUser] = useState(null);
  const [peoplePaginator, setPeoplePaginator] = useState(null);
  const [page, setPage] = useState(1);
  const peoplePerPage = 32;

  useEffect(() => {
    getUserById(userId)
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        toast.error(`Error getting user ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }, [userId]);

  useEffect(() => {
    getLikedPeopleByUserId(userId, page, peoplePerPage)
      .then((res) => {
        setPeoplePaginator(res);
      })
      .catch((err) => {
        toast.error(`Error getting people ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }, [page, userId, peoplePerPage]);

  return (
    <div className="watched-people-page">
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
