import { setUserCanPublishByUserId } from '../../api/usersApi';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { User } from '../../types/Auth';

type Props = {
  user: User;
  onUserReload: () => void;
};

function UserAdminControls({ user, onUserReload }: Props) {
  const setUserCanPublish = useMutation({
    mutationFn: (canPublish: boolean) =>
      setUserCanPublishByUserId(user.id, canPublish),
    onSuccess: (res) => {
      toast.success(`User ${res.canPublish ? 'set' : 'removed'} as publisher.`);
      onUserReload();
    },
    onError: (err) => {
      toast.error(
        `Error setting user publisher status. ${err.data.Exception}`,
        {
          autoClose: false,
        },
      );
    },
  });

  return (
    <div className='admin-controls mt-4 rounded bg-backgroundOffset shadow'>
      <div className='rounded-t-md bg-backgroundOffset2'>
        <p className='px-2 py-1 text-lg font-semibold text-primary'>
          Admin controls
        </p>
      </div>
      <div className='px-2 py-2'>
        <button
          onClick={() => setUserCanPublish.mutate(!user.canPublish)}
          className='inline-block rounded bg-backgroundOffset2 px-4 py-2 font-semibold text-primary hover:opacity-75'
        >
          {user.canPublish ? 'Remove as publisher' : 'Add as publisher'}
        </button>
      </div>
    </div>
  );
}

export default UserAdminControls;
