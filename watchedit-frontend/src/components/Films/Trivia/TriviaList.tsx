import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Trivia } from '../../../types/Trivia';
import useCurrentUserId from '../../../hooks/useCurrentUserId';

type Props = {
  trivia: Trivia[];
  onRemove?: (trivia: Trivia) => void;
  canControl: boolean;
};

const TriviaList = ({ trivia, onRemove, canControl }: Props) => {
  const userId = useCurrentUserId();
  const navigate = useNavigate();
  return (
    <div className='grid grid-cols-12'>
      {trivia.map((triviaItem) => {
        return (
          <div key={triviaItem.id} className='col-span-12 my-2'>
            <div className='grid grid-cols-24'>
              <div
                className={`${
                  canControl && triviaItem.user.id == userId
                    ? 'col-span-16 md:col-span-20'
                    : 'col-span-24'
                } rounded bg-backgroundOffset p-2 shadow`}
              >
                <p>{triviaItem.text}</p>
                <Link
                  className='text-primary hover:opacity-75'
                  to={`/profile/${triviaItem.user.id}`}
                >
                  - {triviaItem.user.username}
                </Link>
              </div>
              {canControl && triviaItem.user.id == userId && onRemove && (
                <>
                  <div className='col-span-4 pl-1 md:col-span-2'>
                    <button
                      onClick={() =>
                        navigate(
                          `/films/${triviaItem.film.id}/trivia/${triviaItem.id}/edit`,
                        )
                      }
                      className='h-full w-full rounded bg-primary text-sm hover:opacity-75'
                    >
                      Edit
                    </button>
                  </div>
                  <div className='col-span-4 pl-1 md:col-span-2'>
                    <button
                      onClick={() => onRemove(triviaItem)}
                      className='h-full w-full rounded bg-red-400 text-sm hover:opacity-75'
                    >
                      Remove
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TriviaList;
