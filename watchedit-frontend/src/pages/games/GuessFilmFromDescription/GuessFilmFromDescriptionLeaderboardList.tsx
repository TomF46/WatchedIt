import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import { GuessFilmFromDescriptionGameLeaderboardEntry } from '../../../types/Games';

const GuessFilmFromDescriptionLeaderboardList = ({
  entries,
}: {
  entries: GuessFilmFromDescriptionGameLeaderboardEntry[];
}) => {
  return (
    <div className='rounded bg-backgroundOffset p-4 shadow'>
      <table className='w-full table-auto'>
        <thead className='text-primary'>
          <tr>
            <th>Score</th>
            <th>User</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => {
            return (
              <tr className='text-center' key={entry.id}>
                <td className='py-4'>{entry.score}</td>
                <td>
                  <Link
                    to={`/profile/${entry.user.id}`}
                    className='text-primary hover:opacity-75'
                  >
                    {entry.user.username}
                  </Link>
                </td>
                <td>
                  {format(
                    parseISO(entry.updatedDate.toString()),
                    'dd/MM/yyyy HH:mm',
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GuessFilmFromDescriptionLeaderboardList;
