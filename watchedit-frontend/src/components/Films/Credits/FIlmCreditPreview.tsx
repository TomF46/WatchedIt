import { useNavigate } from 'react-router-dom';
import { FilmCredit } from '../../../types/Films';

type Props = {
  credit: FilmCredit;
  isLink: boolean;
  showFilmName: boolean;
};

const FilmCreditPreview = ({ credit, isLink, showFilmName }: Props) => {
  const navigate = useNavigate();
  return (
    <div className='h-full'>
      <div className='mx-2 h-full cursor-pointer rounded bg-backgroundOffset shadow'>
        <div
          onClick={() => {
            if (isLink) navigate(`/people/${credit.person.id}`);
          }}
          className='relative hover:opacity-75'
        >
          <img
            src={credit.person.imageUrl}
            className='headshot w-full rounded-t'
            alt={`${credit.person.fullName} headshot.`}
          />
          <div className='p-2'>
            <div className='grid grid-cols-12'>
              <div className='col-span-12'>
                <h3 className='text-center text-primary'>
                  {credit.person.fullName}
                </h3>
                <p className='text-center opacity-75'>{credit.role}</p>
                {showFilmName && (
                  <p className='text-center opacity-75'>({credit.film.name})</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmCreditPreview;
