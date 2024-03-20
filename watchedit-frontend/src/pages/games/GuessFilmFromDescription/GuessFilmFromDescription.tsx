import { useState } from 'react';
import { toast } from 'react-toastify';
import LoadingMessage from '../../../components/Loading/LoadingMessage';
import PaginationControls from '../../../components/PaginationControls';
import {
  getGuessFilmFromDescriptionGames,
  startGuessFilmFromDescriptionGame,
} from '../../../api/games/guessFilmFromDescriptionApi';
import GuessFilmFromDescriptionGamesList from './GuessFilmFromDescriptionGamesList';
import { Link, useNavigate } from 'react-router-dom';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';

function GuessFilmFromDescription() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const gamesPerPage = 20;

  const { data: gamesPaginator } = useQuery({
    queryKey: ['description-games', page, gamesPerPage],
    queryFn: () =>
      getGuessFilmFromDescriptionGames(page, gamesPerPage).catch((error) => {
        toast.error(`Error getting games ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
    placeholderData: keepPreviousData,
  });

  const startNewGame = useMutation({
    mutationFn: () => startGuessFilmFromDescriptionGame(),
    onSuccess: (res) => {
      navigate(`/games/filmFromDescription/${res.id}`);
    },
    onError: (err) => {
      toast.error(`Error starting new game ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  return (
    <div className='films-from-description-page'>
      <h1 className='my-4 text-center text-4xl font-semibold text-primary'>
        Guess the film from its description
      </h1>
      <div className='grid grid-cols-12'>
        <div className='col-span-12 md:col-span-8'>
          <div className='mb-4 rounded bg-backgroundOffset p-4 shadow'>
            <h3 className='mb-4 text-center text-2xl font-semibold text-primary'>
              Game rules
            </h3>
            <ul className='ml-2 list-disc'>
              <li>When game starts you get the first description.</li>
              <li>
                Every time you guess correctly you gain a point and a new
                description is added.
              </li>
              <li>
                If you get one wrong the game is over and your score is how many
                you got correct.
              </li>
              <li>Score as high as possible to climb the leaderboard.</li>
            </ul>
          </div>
        </div>
        <div className='col-span-12 mb-4 ml-1 flex items-center justify-center rounded bg-backgroundOffset p-4 text-center shadow md:col-span-2'>
          <button
            onClick={() => startNewGame.mutate()}
            className='mb-4 rounded bg-primary px-4 py-2 text-center text-white hover:opacity-75'
          >
            New game
          </button>
        </div>
        <div className='col-span-12 mb-4 ml-1 flex items-center justify-center rounded bg-backgroundOffset p-4 text-center shadow md:col-span-2'>
          <Link
            to={`/games/filmFromDescription/leaderboard`}
            className='mb-4 rounded bg-primary px-4 py-2 text-center text-white hover:opacity-75'
          >
            Leaderboard
          </Link>
        </div>
      </div>
      {gamesPaginator ? (
        <>
          {gamesPaginator.data.length > 0 ? (
            <>
              <GuessFilmFromDescriptionGamesList games={gamesPaginator.data} />
              <PaginationControls
                currentPage={page}
                onPageChange={setPage}
                of={gamesPaginator.of}
                from={gamesPaginator.from}
                to={gamesPaginator.to}
                lastPage={gamesPaginator.lastPage}
              />
            </>
          ) : (
            <p className='text-center text-2xl text-primary'>
              You have not started any games.
            </p>
          )}
        </>
      ) : (
        <LoadingMessage message={'Loading games.'} />
      )}
    </div>
  );
}

export default GuessFilmFromDescription;
