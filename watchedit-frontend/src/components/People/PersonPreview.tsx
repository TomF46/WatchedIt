import { useNavigate } from 'react-router-dom';
import { Person } from '../../types/People';
import ThumbsUpIcon from '../Icons/ThumbsUpIcon';
import CameraIcon from '../Icons/CameraIcon';

const PersonPreview = ({
  person,
  isLink,
}: {
  person: Person;
  isLink: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <div className='col-span-8 mt-2 md:col-span-4 lg:col-span-2'>
      <div
        onClick={() => {
          if (isLink) navigate(`/people/${person.id}`);
        }}
        className='group mx-2 h-full cursor-pointer rounded bg-backgroundOffset shadow hover:opacity-75'
      >
        <div className='relative'>
          <img
            src={person.imageUrl}
            className='headshot w-full rounded-t'
            alt={`${person.fullName} headshot.`}
          />
          <div className='invisible absolute bottom-0 w-full bg-backgroundOffset2 p-1 group-hover:visible'>
            <p className='text-center text-primary'>{person.fullName}</p>
          </div>
        </div>
        <div className='p-2'>
          <div className='grid grid-cols-12'>
            <div className='relative col-span-6'>
              <div className='inline-flex items-center text-center'>
                <CameraIcon color='primary' height={5} width={5} />
                <p className='ml-1'>{person.creditCount}</p>
              </div>
            </div>
            <div className='relative col-span-6'>
              <div className='absolute right-0 top-0 inline-flex items-center text-center'>
                <ThumbsUpIcon color='success' height={5} width={5} />
                <p className='ml-1'>{person.likedByCount}</p>
              </div>
            </div>
            <div className='col-span-12 lg:hidden'>
              <h3 className='text-center text-primary'>{person.fullName}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonPreview;
