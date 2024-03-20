import { useNavigate } from 'react-router-dom';
import { Credit } from '../../../types/Credits';

type Props = {
  credits: Credit[];
  canEdit: boolean;
  onRemove: (credit: Credit) => void;
};

const PersonCreditsList = ({ credits, canEdit, onRemove }: Props) => {
  const navigate = useNavigate();
  return (
    <div className='grid grid-cols-12'>
      {credits.map((credit) => {
        return (
          <div className='col-span-12' key={credit.id}>
            <div className='my-1 grid grid-cols-24 rounded shadow'>
              <div className='col-span-3 md:col-span-2 lg:col-span-1'>
                <img
                  src={credit.film.posterUrl}
                  className='poster h-full rounded-l'
                  alt={`${credit.film.name} poster.`}
                />
              </div>
              <div
                className={`${
                  canEdit
                    ? 'col-span-13 md:col-span-18 lg:col-span-19'
                    : 'col-span-21 md:col-span-22 lg:col-span-23'
                }`}
              >
                <div
                  onClick={() => {
                    navigate(`/films/${credit.film.id}`);
                  }}
                  className='inline-flex h-full w-full cursor-pointer items-center bg-backgroundOffset p-4 hover:opacity-75'
                >
                  <p>
                    {credit.film.name} - {credit.role}
                  </p>
                </div>
              </div>
              {canEdit && (
                <>
                  <div className='col-span-4 pl-1 md:col-span-2'>
                    <button
                      onClick={() => navigate(`${credit.id}/edit`)}
                      className='h-full w-full rounded bg-primary text-sm hover:opacity-75'
                    >
                      Edit
                    </button>
                  </div>
                  <div className='col-span-4 pl-1 md:col-span-2'>
                    <button
                      onClick={() => onRemove(credit)}
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

export default PersonCreditsList;
