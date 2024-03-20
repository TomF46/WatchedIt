import { Link } from 'react-router-dom';

function GuessFilmFailed() {
  return (
    <div className='rounded bg-backgroundOffset p-4 text-center shadow'>
      <h1 className='my-4 text-center text-2xl font-semibold text-primary'>
        Game over! You failed to guess the film and have no clues remaining.
      </h1>
      <div className='my-4'>
        <Link
          to={'/games/filmFromCast'}
          className='mt-4 rounded bg-primary px-4 py-2 text-white hover:opacity-75'
        >
          Try again
        </Link>
      </div>
    </div>
  );
}

export default GuessFilmFailed;
