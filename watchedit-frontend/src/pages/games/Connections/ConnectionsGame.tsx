import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingMessage from '../../../components/Loading/LoadingMessage';
import {
  forefeitConnectionsGameById,
  getConnectionsGameById,
  makeGuessForConnectionsGame,
} from '../../../api/games/connectionsGameApi';
import { toast } from 'react-toastify';
import GameInfoSection from '../GameInfoSection';
import { confirmAlert } from 'react-confirm-alert';
import ConnectionsClueSection from './ConnectionsClueSection';
import GuessPersonFailed from '../GuessPersonFailed';
import CorrectGuessPerson from '../CorrectGuessPerson';
import ConnectionsGuessSection from './ConnectionsGuessSection';
import { useMutation, useQuery } from '@tanstack/react-query';
import ErrorMessage from '../../../components/Error/ErrorMessage';
import { ConnectionsGame as ConnectionsGameType } from '../../../types/Games';
import { Person } from '../../../types/People';
import NoEntryIcon from '../../../components/Icons/NoEntryIcon';

function ConnectionsGame() {
  const { id } = useParams();
  const [game, setGame] = useState<ConnectionsGameType | null>(null);
  const cluesRef = useRef<null | HTMLDivElement>(null);
  const navigate = useNavigate();

  const { isLoading, error } = useQuery({
    queryKey: ['connections-game', id],
    queryFn: () =>
      getConnectionsGameById(Number(id)).then((res) => {
        setGame(res);
        return res;
      }),
  });

  const guess = useMutation({
    mutationFn: (person: Person) =>
      makeGuessForConnectionsGame(game!.id, { personId: person.id! }),
    onSuccess: (res) => {
      setGame(res);
      if (cluesRef.current)
        cluesRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
      if (res.status == 1)
        toast.info('Thats not right, try again with a new clue');
      if (res.status == 2)
        toast.error(
          "Unlucky, you've ran out of clues and still haven't got it correct, you lose!",
        );
      if (res.status == 3)
        toast.success(`Correct the person was ${res.person.fullName}`);
    },
    onError: (err) => {
      toast.error(`Error submitting guess ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  const forefeit = useMutation({
    mutationFn: (game: ConnectionsGameType) =>
      forefeitConnectionsGameById(game.id),
    onSuccess: () => {
      navigate(`/games/connections`);
    },
    onError: (err) => {
      toast.error(`Error forefeiting game ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  function confirmForefeit(): void {
    confirmAlert({
      title: 'Confirm forefeit',
      message: `Are you sure you want to forefeit this game?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => forefeit.mutate(game!),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  }

  function startAgain(): void {
    navigate(`/games/connections`);
  }

  if (isLoading) return <LoadingMessage message={'Loading game.'} />;

  if (error) {
    return (
      <ErrorMessage
        message={'Error loading game.'}
        error={error.data.Exception}
      />
    );
  }

  if (game)
    return (
      <div className='game-page'>
        <div className='mt-4 grid grid-cols-12'>
          <div className='col-span-12 md:col-span-2'>
            <GameInfoSection
              game={game}
              forefeit={confirmForefeit}
              startAgain={startAgain}
            />
          </div>
          <div className='col-span-12 mt-4 md:col-span-10 md:mt-0 md:pl-4'>
            {game.status == 4 ? (
              <div className='my-16'>
                <div className='flex justify-center text-center'>
                  <NoEntryIcon color='primary' height={14} width={14} />
                </div>
                <p className='text-center text-2xl'>
                  You have forefeited this game
                </p>
              </div>
            ) : (
              <>
                <div className='mt-4' ref={cluesRef}>
                  <ConnectionsClueSection clues={game.clues} />
                </div>
                <div className='mt-4'>
                  {game.status == 1 && (
                    <ConnectionsGuessSection
                      guess={(person) => guess.mutate(person)}
                    />
                  )}
                  {game.status == 2 && <GuessPersonFailed />}
                  {game.status == 3 && <CorrectGuessPerson game={game} />}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
}

export default ConnectionsGame;
