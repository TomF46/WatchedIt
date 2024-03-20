import { toast } from 'react-toastify';
import { getUserById } from '../../api/usersApi';
import { Link, useParams } from 'react-router-dom';
import UserLists from '../../components/User/UserLists';
import LoadingMessage from '../../components/Loading/LoadingMessage';
import { confirmAlert } from 'react-confirm-alert';
import UserLatestReviews from '../../components/Reviews/UserLatestReviews';
import UserAdminControls from '../../components/User/UserAdminControls';
import UserReviewsReel from '../../components/Reviews/UserReviewReel';
import { useQuery } from '@tanstack/react-query';
import ErrorMessage from '../../components/Error/ErrorMessage';
import { AppDispatch, useAppDispatch, useAppSelector } from '../../redux/store';
import { logout } from '../../redux/reducers/authenticationReducer';
import EyeIcon from '../../components/Icons/EyeIcon';

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
    queryKey: ['user', userId],
    queryFn: () => getUserById(Number(userId)),
  });

  function handleLogout() {
    confirmAlert({
      title: 'Confirm logout',
      message: `Are you sure you want to logout?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            dispatch(logout());
            toast.info('Logged out');
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  }

  if (isLoading) return <LoadingMessage message={'Loading user.'} />;

  if (error) {
    return (
      <ErrorMessage
        message={'Error loading profile.'}
        error={error.data.Exception}
      />
    );
  }

  if (user)
    return (
      <div className='user-page'>
        <div className='grid grid-cols-12'>
          <div className='col-span-12'>
            <h1 className='my-4 text-center text-4xl font-semibold text-primary'>
              {user.username}
            </h1>
          </div>
          {isAdmin && userId != currentUserId && (
            <div className='col-span-12 mb-4'>
              <UserAdminControls user={user} onUserReload={refetch} />
            </div>
          )}
          <div className='col-span-12 md:col-span-2'>
            <img
              src={user.imageUrl}
              className='headshot rounded shadow'
              alt={`${user.username} profile picture.`}
            />
            <div className='flex flex-col'>
              <Link
                to={`/profile/${user.id}/watched`}
                className='mt-4 inline-block w-full rounded bg-primary px-4 py-2 text-center text-white hover:opacity-75'
              >
                Watched
              </Link>
              <Link
                to={`/profile/${user.id}/likes`}
                className='mt-4 inline-block w-full rounded bg-primary px-4 py-2 text-center text-white hover:opacity-75'
              >
                Likes
              </Link>
              <Link
                to={`/profile/${user.id}/reviews`}
                className='mt-4 inline-block w-full rounded bg-primary px-4 py-2 text-center text-white hover:opacity-75'
              >
                Reviews
              </Link>
              {user.canPublish && (
                <Link
                  to={`/profile/${user.id}/news`}
                  className='mt-4 inline-block w-full rounded bg-primary px-4 py-2 text-center text-white hover:opacity-75'
                >
                  News articles
                </Link>
              )}
              {user.id == currentUserId && (
                <>
                  <Link
                    to={`/profile/edit`}
                    className='mt-4 inline-block w-full rounded bg-primary px-4 py-2 text-center text-white hover:opacity-75'
                  >
                    Edit profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='mt-4 inline-block w-full rounded bg-red-400 px-4 py-2 text-center text-white hover:opacity-75'
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
          <div className='col-span-12 mt-4 md:col-span-10 md:mt-0 md:pl-4'>
            <div className='grid grid-cols-12'>
              <div className='col-span-12 rounded bg-backgroundOffset p-2 shadow md:col-span-6'>
                <h3 className='text-lg text-primary'>Details</h3>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Watched films: {user.watchedFilmCount}</p>
                {user.canPublish && <p className='text-success'>Publisher</p>}
              </div>
              <div className='col-span-12 mt-4 rounded bg-backgroundOffset p-2 shadow md:col-span-4 md:ml-2 md:mt-0'>
                {user.biography && (
                  <>
                    <h3 className='text-lg text-primary'>About</h3>
                    <p>{user.biography}</p>
                  </>
                )}
              </div>
              <div className='col-span-12 mt-4 rounded bg-success p-4 text-center shadow md:col-span-2 md:ml-4 md:mt-0'>
                <h3 className='mb-4 text-xl font-semibold text-black'>
                  Films watched
                </h3>
                <p className='text-2xl font-semibold text-black'>
                  {user.watchedFilmCount}
                </p>
                <div className='mt-4 inline-flex items-center'>
                  <EyeIcon color='black' height={10} width={10} />
                </div>
              </div>
            </div>
            <div className='col-span-12'>
              <div className='grid grid-cols-12'>
                <div className='col-span-12'>
                  <UserLists user={user} />
                </div>
              </div>
            </div>
            <div className='col-span-12'>
              <UserReviewsReel
                user={user}
                title={`${user.username} favourite films`}
                sort='score_desc'
              />
            </div>
            <div className='col-span-12'>
              <UserReviewsReel
                user={user}
                title={`${user.username} least favourite films`}
                sort='score_asc'
              />
            </div>
            <div className='col-span-12'>
              <UserLatestReviews user={user} totalReviews={4} />
            </div>
          </div>
        </div>
      </div>
    );
}

export default Profile;
