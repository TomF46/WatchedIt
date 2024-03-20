import { useNavigate } from 'react-router-dom';
import { User } from '../../types/Auth';
import EyeIcon from '../Icons/EyeIcon';
import ReviewIcon from '../Icons/ReviewIcon';

type Props = {
  user: User;
  isLink: boolean;
};

const UserPreview = ({ user, isLink }: Props) => {
  const navigate = useNavigate();
  return (
    <div className='col-span-8 mt-2 md:col-span-4 lg:col-span-2'>
      <div
        onClick={() => {
          if (isLink) navigate(`/profile/${user.id}`);
        }}
        className='mx-2 h-full cursor-pointer rounded bg-backgroundOffset shadow hover:opacity-75'
      >
        <img
          src={user.imageUrl}
          className='headshot w-full rounded-t'
          alt={`${user.username} profile picture.`}
        />
        <div className='p-2'>
          <div className='grid grid-cols-12'>
            <div className='relative col-span-6'>
              <div className='inline-flex items-center text-center'>
                <EyeIcon color='success' height={5} width={5} />
                <p className='ml-1'>{user.watchedFilmCount}</p>
              </div>
            </div>
            <div className='relative col-span-6'>
              <div className='absolute right-0 top-0 inline-flex items-center text-center'>
                <ReviewIcon color='rating' height={5} width={5} />
                <p className='ml-1'>{user.reviewCount}</p>
              </div>
            </div>
            <div className='col-span-12'>
              <h3 className='text-center text-primary'>{user.username}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPreview;
