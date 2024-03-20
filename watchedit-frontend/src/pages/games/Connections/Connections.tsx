import { useState } from 'react';
import { toast } from 'react-toastify';
import LoadingMessage from '../../../components/Loading/LoadingMessage.js';
import PaginationControls from '../../../components/PaginationControls.js';
import {
  getConnectionsGames,
  startConnectionsGame,
} from '../../../api/games/connectionsGameApi.js';
import ConnectionsGamesList from './ConnectionsGamesList';
import { useNavigate } from 'react-router-dom';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';

function Connections() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const gamesPerPage = 20;

  const { data: gamesPaginator } = useQuery({
    queryKey: ['connections-games', page, gamesPerPage],
    queryFn: () =>
      getConnectionsGames(page, gamesPerPage).catch((error) => {
        toast.error(`Error getting connections games ${error.data.Exception}`, {
          autoClose: false,
        });
        return error;
      }),
    placeholderData: keepPreviousData,
  });

  const startNewGame = useMutation({
    mutationFn: () => startConnectionsGame(),
    onSuccess: (res) => {
      navigate(`/games/connections/${res.id}`);
    },
    onError: (err) => {
      toast.error(`Error starting new game ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  return (
    <div className='connections-page'>
      <h1 className='my-4 text-center text-4xl font-semibold text-primary'>
        Connections
      </h1>
      <div className='grid grid-cols-12'>
        <div className='col-span-12 md:col-span-8'>
          <div className='mb-4 rounded bg-backgroundOffset p-4 shadow'>
            <h3 className='mb-4 text-center text-2xl font-semibold text-primary'>
              Game rules
            </h3>
            <ul className='ml-2 list-disc'>
              <li>When game starts you get the first cast member as a clue.</li>
              <li>
                Make your first guess if you are wrong a second cast member is
                revealed.
              </li>
              <li>
                This continues until you either run out of new clues or guess
                correctly
              </li>
              <li>
                If you guess correctly you win, and your score is the number of
                guesses, the lower the better.
              </li>
              <li>
                If you run our of new cast member clues then its game over!
              </li>
            </ul>
          </div>
        </div>
        <div className='col-span-12 mb-4 ml-1 flex items-center justify-center rounded bg-backgroundOffset p-4 text-center shadow md:col-span-4'>
          <button
            onClick={() => startNewGame.mutate()}
            className='mb-4 rounded bg-primary px-4 py-2 text-center text-white hover:opacity-75'
          >
            New game
          </button>
        </div>
      </div>
      {gamesPaginator ? (
        <>
          {gamesPaginator.data.length > 0 ? (
            <>
              <ConnectionsGamesList games={gamesPaginator.data} />
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

export default Connections;
