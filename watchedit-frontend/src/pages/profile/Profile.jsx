import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserById } from "../../api/usersApi";
import { Link, useParams } from "react-router-dom";
import UserLists from "../../components/User/UserLists";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import { logout } from "../../redux/actions/authenticationActions";
import { confirmAlert } from "react-confirm-alert";
import UserLatestReviews from "../../components/Reviews/UserLatestReviews";
import UserAdminControls from "../../components/User/UserAdminControls";
import UserReviewsReel from "../../components/Reviews/UserReviewReel";

function Profile() {
  const { id } = useParams();
  const isAdmin = useSelector((state) => state.isAdmin);
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) =>
    state.tokens ? state.tokens.id : null,
  );
  const userId = id ? id : currentUserId;
  const [user, setUser] = useState(null);

  const getUser = useCallback(() => {
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
    getUser();
  }, [userId, getUser]);

  function handleLogout() {
    confirmAlert({
      title: "Confirm logout",
      message: `Are you sure you want to logout?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(logout());
            toast.info("Logged out");
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }

  return (
    <div className="user-page">
      {!user ? (
        <LoadingMessage message={"Loading user."} />
      ) : (
        <>
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <h1 className="my-4 text-center text-primary text-4xl font-bold">
                {user.username}
              </h1>
            </div>
            {isAdmin && (
              <div className="col-span-12 mb-4">
                <UserAdminControls user={user} onUserReload={getUser} />
              </div>
            )}
            <div className="col-span-12 md:col-span-2">
              <img
                src={user.imageUrl}
                className="headshot shadow rounded"
                alt={`${user.username} profile picture.`}
              />
              <div className="flex flex-col">
                <Link
                  to={`/profile/${user.id}/watched`}
                  className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block mt-4 w-full text-center"
                >
                  Watched
                </Link>
                <Link
                  to={`/profile/${user.id}/likes`}
                  className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block mt-4 w-full text-center"
                >
                  Likes
                </Link>
                <Link
                  to={`/profile/${user.id}/reviews`}
                  className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block mt-4 w-full text-center"
                >
                  Reviews
                </Link>
                {user.canPublish && (
                  <Link
                    to={`/profile/${user.id}/news`}
                    className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block mt-4 w-full text-center"
                  >
                    News articles
                  </Link>
                )}
                {user.id == currentUserId && (
                  <>
                    <Link
                      to={`/profile/edit`}
                      className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block mt-4 w-full text-center"
                    >
                      Edit profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="bg-red-400 text-white rounded py-2 px-4 hover:opacity-75 inline-block mt-4 w-full text-center"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="col-span-12 mt-4 md:col-span-10 md:pl-4 md:mt-0">
              <div className="grid grid-cols-12">
                <div className="col-span-12 md:col-span-6 bg-backgroundOffset p-4 shadow rounded">
                  <h3 className="text-primary text-lg">Details</h3>
                  <p>Username: {user.username}</p>
                  <p>Email: {user.email}</p>
                  <p>Watched films: {user.watchedFilmCount}</p>
                  {user.canPublish && <p className="text-success">Publisher</p>}
                </div>
                <div className="col-span-12 md:col-span-4 bg-backgroundOffset md:ml-2 mt-4 md:mt-0 p-4 shadow rounded">
                  {user.biography && (
                    <>
                      <h3 className="text-primary text-lg">About</h3>
                      <p>{user.biography}</p>
                    </>
                  )}
                </div>
                <div className="col-span-12 md:col-span-2 text-center bg-success md:ml-4 mt-4 md:mt-0 p-4 shadow rounded">
                  <h3 className="text-xl text-black font-bold mb-4">
                    Films watched
                  </h3>
                  <p className="text-2xl text-black font-bold">
                    {user.watchedFilmCount}
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 text-black inline-flex items-center mt-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="col-span-12">
                <div className="grid grid-cols-12">
                  <div className="col-span-12">
                    <UserLists user={user} />
                  </div>
                </div>
              </div>
              <div className="col-span-12">
                <UserReviewsReel
                  user={user}
                  title={`${user.username} favourite films`}
                  sort="score_desc"
                />
              </div>
              <div className="col-span-12">
                <UserReviewsReel
                  user={user}
                  title={`${user.username} least favourite films`}
                  sort="score_asc"
                />
              </div>
              <div className="col-span-12">
                <UserLatestReviews user={user} totalReviews={4} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
