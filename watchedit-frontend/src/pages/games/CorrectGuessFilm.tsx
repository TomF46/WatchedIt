import { useNavigate } from 'react-router-dom';
import { GuessFilmFromCastGame } from '../../types/Games';

const CorrectGuessFilm = ({ game }: { game: GuessFilmFromCastGame }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h3 className='text-center text-2xl text-primary'>
        Well done! You guessed the correct film
      </h3>
      <div className='my-4 grid grid-cols-12'>
        <div className='col-span-12 my-2 md:col-span-4 md:col-start-4 lg:col-span-2 lg:col-start-6'>
          <div
            onClick={() => {
              navigate(`/films/${game.film.id}`);
            }}
            className='mx-2 h-full cursor-pointer rounded bg-backgroundOffset shadow'
          >
            <div className='relative hover:opacity-75'>
              <img
                src={game.film.posterUrl}
                className={`poster w-full rounded-t`}
                alt={`${game.film.name} poster.`}
              />
              <div className='p-2'>
                <div className='grid grid-cols-12'>
                  <div className='col-span-12'>
                    <h3 className='text-center text-primary'>
                      {game.film.name}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorrectGuessFilm;
