import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { GuessFilmFromCastGame } from '../../../types/Games';

const GuessFilmFromCastGamesList = ({
  games,
}: {
  games: GuessFilmFromCastGame[];
}) => {
  const navigate = useNavigate();
  return (
    <div className='rounded bg-backgroundOffset p-4 shadow'>
      <h3 className='mb-4 text-center text-2xl font-semibold text-primary'>
        Your games
      </h3>
      <table className='w-full table-auto'>
        <thead className='text-primary'>
          <tr>
            <th>Status</th>
            <th>Guesses</th>
            <th>Date Started</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => {
            return (
              <tr className='text-center' key={game.id}>
                <td className='py-4'>{game.statusText}</td>
                <td>{game.clues.length}</td>
                <td>
                  {format(
                    parseISO(game.createdDate.toString()),
                    'dd/MM/yyyy HH:mm',
                  )}
                </td>
                <td>
                  <button
                    onClick={() => {
                      navigate(`/games/filmFromCast/${game.id}`);
                    }}
                    className='h-full w-full rounded bg-primary px-4 py-2 hover:opacity-75'
                  >
                    {game.status == 1 ? 'Play' : 'View'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GuessFilmFromCastGamesList;
