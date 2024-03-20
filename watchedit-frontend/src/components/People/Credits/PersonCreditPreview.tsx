import { useNavigate } from 'react-router-dom';
import { PersonCredit } from '../../../types/People';

const PersonCreditPreview = ({ credit }: { credit: PersonCredit }) => {
  const navigate = useNavigate();
  return (
    <div className='h-full'>
      <div className='mx-2 h-full cursor-pointer rounded bg-backgroundOffset shadow'>
        <div
          onClick={() => {
            navigate(`/films/${credit.film.id}`);
          }}
          className='relative hover:opacity-75'
        >
          <img
            src={credit.film.posterUrl}
            className='poster h-full rounded-t'
            alt={`${credit.film.name} poster.`}
          />
          <div className='p-2'>
            <div className='grid grid-cols-12'>
              <div className='col-span-12'>
                <h3 className='text-center text-primary'>{credit.role}</h3>
                <p className='text-center opacity-75'>{`(${credit.type})`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonCreditPreview;
