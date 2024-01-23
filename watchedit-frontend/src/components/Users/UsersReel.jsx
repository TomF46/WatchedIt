import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import UserPreview from "../User/UserPreview";
import { getUsersPaginated } from "../../api/usersApi";
import LoadingMessage from "../Loading/LoadingMessage";

function UsersReel({ title, sort }) {
  const [usersPaginator, setPeoplePaginator] = useState(null);
  const page = 1;
  const usersPerPage = 8;

  useEffect(() => {
    getUsersPaginated(page, usersPerPage, sort)
      .then((res) => {
        setPeoplePaginator(res);
      })
      .catch((err) => {
        toast.error(`Error getting users ${err.data.Exception}`, {
          autoClose: false,
        });
      });
  }, [page, usersPerPage, sort]);

  return (
    <div className="users-reel">
      {!usersPaginator ? (
        <LoadingMessage message={"Loading users."} />
      ) : (
        <div className="mt-4">
          <Link
            to={"/users"}
            className="text-primary font-semibold text-2xl hover:opacity-75"
          >
            {title}
          </Link>
          {usersPaginator.data.length > 0 ? (
            <div className="grid grid-cols-16">
              {usersPaginator.data.map((user) => {
                return <UserPreview key={user.id} user={user} isLink={true} />;
              })}
            </div>
          ) : (
            <p className="text-center text-primary text-2xl">
              No users match your search
            </p>
          )}
        </div>
      )}
    </div>
  );
}

UsersReel.propTypes = {
  title: PropTypes.string.isRequired,
  sort: PropTypes.string.isRequired,
};

export default UsersReel;
