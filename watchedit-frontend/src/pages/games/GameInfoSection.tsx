import { format, parseISO } from 'date-fns';
import {
  ConnectionsGame,
  GuessFilmFromCastGame,
  GuessFilmFromDescriptionGame,
} from '../../types/Games';

type Props = {
  game: ConnectionsGame | GuessFilmFromCastGame | GuessFilmFromDescriptionGame;
  forefeit: () => void;
  startAgain: () => void;
};

const GameInfoSection = ({ game, forefeit, startAgain }: Props) => {
  return (
    <div className='grid grid-cols-12 rounded bg-backgroundOffset p-4 text-center shadow'>
      {game.clues != null && ( //todo
        <div className='col-span-12 mb-4'>
          <p className='text-lg'>Guesses:</p>
          <p className='text-lg text-primary'>{game.clues.length}</p>
        </div>
      )}
      {game.score != null && (
        <div className='col-span-12 mb-4'>
          <p className='text-lg'>Score:</p>
          <p className='text-lg text-primary'>{game.score}</p>
        </div>
      )}
      <div className='col-span-12 mb-4'>
        <p className='text-lg'>Started:</p>
        <p className='text-lg text-primary'>
          {format(parseISO(game.createdDate.toString()), 'dd/MM/yyyy HH:mm')}
        </p>
      </div>
      <div className='col-span-12 mb-4'>
        <p className='text-lg'>Status</p>
        <p className='text-lg text-primary'>{game.statusText}</p>
      </div>
      <div className='col-span-12'>
        <button
          onClick={startAgain}
          className='mt-4 inline-block w-full rounded bg-primary px-4 py-2 text-center text-white hover:opacity-75'
        >
          Start another
        </button>
      </div>
      {game.status == 1 && (
        <div className='col-span-12'>
          <button
            onClick={forefeit}
            className='mt-4 inline-block w-full rounded bg-red-400 px-4 py-2 text-center text-white hover:opacity-75'
          >
            Forefeit
          </button>
        </div>
      )}
    </div>
  );
};

export default GameInfoSection;
