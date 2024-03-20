import { Link } from 'react-router-dom';
import { EditableUser, User } from '../../types/Auth';

const UserMiniDetail = ({ user }: { user: User | EditableUser }) => {
  return (
    <div className='grid grid-cols-12 rounded bg-backgroundOffset shadow'>
      <div className='col-span-4'>
        <img
          src={user.imageUrl}
          className='headshot h-full rounded-l'
          alt={`${user.username} profile picture.`}
        />
      </div>
      <div className='col-span-8 p-2'>
        <Link
          to={`/profile/${user.id}`}
          className='font-semibold text-primary hover:opacity-75'
        >
          {user.username}
        </Link>
      </div>
    </div>
  );
};

export default UserMiniDetail;
