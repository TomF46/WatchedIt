import { toast } from "react-toastify";
import { getUserById } from "../../api/usersApi";
import { Link, useParams } from "react-router-dom";
import UserLists from "../../components/User/UserLists";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import { confirmAlert } from "react-confirm-alert";
import UserLatestReviews from "../../components/Reviews/UserLatestReviews";
import UserAdminControls from "../../components/User/UserAdminControls";
import UserReviewsReel from "../../components/Reviews/UserReviewReel";
import { useQuery } from "@tanstack/react-query";
import ErrorMessage from "../../components/Error/ErrorMessage";
import { AppDispatch, useAppDispatch, useAppSelector } from "../../redux/store";
import { logout } from "../../redux/reducers/authenticationReducer";
import EyeIcon from "../../components/Icons/EyeIcon";

function Profile() {
  const { id } = useParams();
  const isAdmin = useAppSelector((state) => state.admin.isAdmin);
  const dispatch: AppDispatch = useAppDispatch();
  const currentUserId = useAppSelector((state) =>
    state.authentication.tokens ? state.authentication.tokens.id : null,
  );
  const userId = id ? id : currentUserId;

  const {
    isLoading,
    data: user,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(Number(userId)),
  });

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

  if (isLoading) return <LoadingMessage message={"Loading user."} />;

  if (error) {
    return (
      <ErrorMessage
        message={"Error loading profile."}
        error={error.data.Exception}
      />
    );
  }

  if (user)
    return (
      <div className="user-page">
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <h1 className="my-4 text-center text-primary text-4xl font-semibold">
              {user.username}
            </h1>
          </div>
          {isAdmin && userId != currentUserId && (
            <div className="col-span-12 mb-4">
              <UserAdminControls user={user} onUserReload={refetch} />
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
              <div className="col-span-12 md:col-span-6 bg-backgroundOffset p-2 shadow rounded">
                <h3 className="text-primary text-lg">Details</h3>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Watched films: {user.watchedFilmCount}</p>
                {user.canPublish && <p className="text-success">Publisher</p>}
              </div>
              <div className="col-span-12 md:col-span-4 bg-backgroundOffset md:ml-2 mt-4 md:mt-0 p-2 shadow rounded">
                {user.biography && (
                  <>
                    <h3 className="text-primary text-lg">About</h3>
                    <p>{user.biography}</p>
                  </>
                )}
              </div>
              <div className="col-span-12 md:col-span-2 text-center bg-success md:ml-4 mt-4 md:mt-0 p-4 shadow rounded">
                <h3 className="text-xl text-black font-semibold mb-4">
                  Films watched
                </h3>
                <p className="text-2xl text-black font-semibold">
                  {user.watchedFilmCount}
                </p>
                <div className="inline-flex items-center mt-4">
                  <EyeIcon color="black" height={10} width={10} />
                </div>
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
      </div>
    );
}

export default Profile;
