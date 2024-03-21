import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { format, parseISO } from 'date-fns';
import { getFilmById, removeFilm } from '../../api/filmsApi';
import WatchedFilmControls from '../../components/Films/Watched/WatchedFilmControls';
import FilmCreditsOverviewList from '../../components/Films/Credits/FilmCreditsOverviewList';
import LoadingMessage from '../../components/Loading/LoadingMessage';
import LatestReviews from '../../components/Reviews/LatestReviews';
import SimilarFilmsReel from '../../components/Films/SimilarFilmsReel';
import TriviaOverview from '../../components/Films/Trivia/TriviaOverview';
import { useMutation, useQuery } from '@tanstack/react-query';
import ErrorMessage from '../../components/Error/ErrorMessage';
import { Film as FilmType } from '../../types/Films';
import EyeIcon from '../../components/Icons/EyeIcon';
import StarIcon from '../../components/Icons/StarIcon';
import useIsAdmin from '../../hooks/useIsAdmin';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import CalendarIcon from '../../components/Icons/CalendarIcon';

function Film() {
  const { id } = useParams();
  const userIsAuthenticated = useIsAuthenticated();
  const isAdmin = useIsAdmin();
  const navigate = useNavigate();

  const {
    isLoading,
    data: film,
    error,
    refetch,
  } = useQuery({
    queryKey: ['film', id],
    queryFn: () => getFilmById(Number(id)),
  });

  const deleteFilm = useMutation({
    mutationFn: (filmToRemove: FilmType) => removeFilm(filmToRemove),
    onSuccess: () => {
      toast.success('Film removed');
      navigate('/films');
    },
    onError: (err) => {
      toast.error(`Error removing film ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  function confirmDeleteFilm(): void {
    confirmAlert({
      title: 'Confirm deletion',
      message: `Are you sure you want to remove ${film!.name}?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteFilm.mutate(film!),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  }

  function handleWatchedCountChange(): void {
    refetch();
  }

  function getDaysTillRelease(releaseDate: Date) : string {
    const currentDate = new Date();
    const release = new Date(releaseDate);
    const difference = release.getTime() - currentDate.getTime();
    const daysDiff = Math.ceil(difference / (1000 * 3600 * 24));
    return `${daysDiff} days till release.`
  }

  if (isLoading) return <LoadingMessage message={'Loading film.'} />;

  if (error) {
    return (
      <ErrorMessage
        message={'Error loading film.'}
        error={error.data.Exception}
      />
    );
  }

  if (film)

    return (
      <div className='film-page'>
        <h1 className='my-4 text-center text-4xl font-semibold text-primary'>
          {film.name}
        </h1>
        {isAdmin && (
          <div className='admin-controls mt-4 rounded bg-backgroundOffset shadow'>
            <div className='rounded-t-md bg-backgroundOffset2'>
              <p className='px-2 py-1 text-lg font-semibold text-primary'>
                Admin controls
              </p>
            </div>
            <div className='px-2 py-2'>
              <Link
                to={`/films/${id}/edit`}
                className='inline-block rounded bg-backgroundOffset2 px-4 py-2 font-semibold text-primary hover:opacity-75'
              >
                Edit film
              </Link>
              <button
                onClick={() => {
                  confirmDeleteFilm();
                }}
                className='ml-2 inline-block rounded bg-backgroundOffset2 px-4 py-2 font-semibold text-red-400 hover:opacity-75'
              >
                Remove
              </button>
            </div>
          </div>
        )}
        <div className='mt-4 grid grid-cols-12'>
          <div className='col-span-12 md:col-span-2'>
            <img
              src={film.posterUrl}
              className='poster rounded shadow'
              alt={`${film.name} poster.`}
            />
            <div className='flex flex-col'>
              {userIsAuthenticated && (
                <WatchedFilmControls
                  film={film}
                  onChange={handleWatchedCountChange}
                />
              )}
              <Link
                to={`/films/${id}/credits`}
                className='mt-4 inline-block rounded bg-primary px-4 py-2 text-center text-white hover:opacity-75'
              >
                Cast / Crew
              </Link>
              <Link
                to={`/films/${id}/reviews`}
                className='mt-4 inline-block rounded bg-primary px-4 py-2 text-center text-white hover:opacity-75'
              >
                Reviews
              </Link>
              <Link
                to={`/films/${id}/trivia`}
                className='mt-4 inline-block rounded bg-primary px-4 py-2 text-center text-white hover:opacity-75'
              >
                Trivia
              </Link>
            </div>
          </div>
          <div className='col-span-12 mt-4 md:col-span-10 md:mt-0 md:pl-4'>
            <div className='grid grid-cols-12'>
              <div className='col-span-12 rounded bg-backgroundOffset p-2 shadow md:col-span-8'>
                <h3 className='text-lg font-semibold text-primary'>Details</h3>
                <p>Name: {film.name}</p>
                <p>
                  Release date:{' '}
                  {format(parseISO(film.releaseDate.toString()), 'dd/MM/yyyy')}
                </p>
                <p>tagline: {film.shortDescription}</p>
                <p>Runtime: {film.runtime} minutes</p>
                <p>Categories:</p>
                {film.categories.length > 0 ? (
                  <ul>
                    {film.categories.map((category) => {
                      return (
                        <li key={category.id}>
                          <Link
                            to={`/categories/${category.id}`}
                            className='text-primary hover:opacity-75'
                          >
                            {category.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p>No categories added</p>
                )}
              </div>
              {film.isReleased ? (
                <>
                <div className='col-span-12 mt-4 rounded bg-success p-4 text-center shadow md:col-span-2 md:ml-4 md:mt-0'>
                <h3 className='mb-4 text-xl font-semibold text-black'>
                  Watched by
                </h3>
                <p className='text-2xl font-semibold text-black'>
                  {film.watchedByCount} user
                  {film.watchedByCount == 1 ? '' : 's'}
                </p>
                <div className='mt-4 inline-flex items-center'>
                  <EyeIcon color='black' height={10} width={10} />
                </div>
              </div>
              <div className='col-span-12 mt-4 rounded bg-rating p-4 text-center shadow md:col-span-2 md:ml-4 md:mt-0'>
                <h3 className='mb-4 text-xl font-semibold text-black'>
                  Rating
                </h3>
                {film.averageRating ? (
                  <div>
                    <p className='text-2xl font-semibold text-black'>
                      {film.averageRating} / 10
                    </p>
                    <div className='mt-4 inline-flex items-center'>
                      <StarIcon
                        color='black'
                        height={10}
                        width={10}
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <p className='text-black'>
                      This film has not yet been rated.
                    </p>
                    <Link
                      to={`/films/${id}/reviews/add`}
                      className='mt-2 inline-block rounded bg-primary px-4 py-2 text-white hover:opacity-75'
                    >
                      Add rating
                    </Link>
                  </>
                )}
              </div>
              </>
              ) : (
                <div className='col-span-12 mt-4 rounded bg-primary p-4 text-center shadow md:col-span-4 md:ml-4 md:mt-0'>
                  <h3 className='mb-4 text-xl font-semibold text-white'>
                  Release countdown
                </h3>
                <p className='text-2xl font-semibold text-white'>
                  {getDaysTillRelease(film.releaseDate)}
                </p>
                <p>{format(parseISO(film.releaseDate.toString()), 'dd/MM/yyyy')}</p>
                <div className='mt-4 inline-flex items-center'>
                      <CalendarIcon
                        color='white'
                        height={10}
                        width={10}
                        strokeWidth={1.5}
                      />
                    </div>
                </div>
              )}
              <div className='col-span-12 mt-4 rounded bg-backgroundOffset p-2 shadow md:col-span-8'>
                <h3 className='text-lg font-semibold text-primary'>
                  Description
                </h3>
                <p>{film.fullDescription}</p>
              </div>
              <div className='col-span-12'>
                <LatestReviews film={film} totalReviews={3} />
              </div>
              <div className='col-span-12'>
                <div className='grid grid-cols-12'>
                  <div className='col-span-12'>
                    {film.credits.cast.length > 0 && (
                      <>
                        <h2 className='mt-4 text-xl text-primary '>Cast</h2>
                        <FilmCreditsOverviewList credits={film.credits.cast} />
                      </>
                    )}
                  </div>
                  <div className='col-span-12 mt-4'>
                    {film.credits.crew.length > 0 && (
                      <>
                        <h2 className='mt-4 text-xl text-primary '>Crew</h2>
                        <FilmCreditsOverviewList credits={film.credits.crew} />
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className='col-span-12'>
                <TriviaOverview film={film} totalItems={4} />
              </div>
              {film.trailerUrl && (
                <div className='col-span-12'>
                  <h2 className='mt-4 text-xl text-primary '>Trailer</h2>
                  <div className='video-container grid grid-cols-12 justify-center'>
                    <iframe
                      className='video col-span-12'
                      src={film.trailerUrl}
                      frameBorder='0'
                      allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
              <div className='col-span-12'>
                <SimilarFilmsReel filmId={film.id!} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Film;
