import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { Person } from '../../types/People';
import ThumbsUpIcon from '../Icons/ThumbsUpIcon';

const PersonMiniDetail = ({ person }: { person: Person }) => {
  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-12 md:col-span-6 lg:col-span-4'>
        <div className='grid grid-cols-12 rounded bg-backgroundOffset shadow'>
          <div className='col-span-4'>
            <img
              src={person.imageUrl}
              className='headshot rounded-l'
              alt={`${person.fullName} headshot.`}
            />
          </div>
          <div className='col-span-8 p-2'>
            <Link
              to={`/people/${person.id}`}
              className='font-semibold text-primary hover:opacity-75'
            >
              {person.fullName}
            </Link>
            {person.stageName && <p>Stage name: {person.stageName}</p>}
            <p>
              DOB:{' '}
              {format(parseISO(person.dateOfBirth.toString()), 'dd/MM/yyyy')}
            </p>
            {person.credits && (
              <p>
                Credits:{' '}
                {person.credits.cast.length + person.credits.crew.length}
              </p>
            )}
            {person.likedByCount && (
              <div className='mt-1 inline-flex items-center'>
                <ThumbsUpIcon color='white' height={5} width={5} />
                <p className='ml-2'>{person.likedByCount}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonMiniDetail;
