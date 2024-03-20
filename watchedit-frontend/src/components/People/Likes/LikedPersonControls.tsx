import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { like, removeLike } from '../../../api/likesApi';
import LoadingMessage from '../../Loading/LoadingMessage';
import { useMutation } from '@tanstack/react-query';
import { Person } from '../../../types/People';
import ButtonWIcon from '../../Buttons/ButtonWIcon';
import ThumbsUpIcon from '../../Icons/ThumbsUpIcon';

type Props = {
  person: Person;
  onChange: () => void;
};

const LikedPersonControls = ({ person, onChange }: Props) => {
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    setHasLiked(person.isLikedByUser);
  }, [person]);

  const setLiked = useMutation({
    mutationFn: (person: Person) => like(Number(person.id)),
    onSuccess: (res) => {
      setHasLiked(res.liked);
      onChange();
    },
    onError: (err) => {
      toast.error(`Error setting person liked ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  const setLikeRemoved = useMutation({
    mutationFn: (person: Person) => removeLike(Number(person.id)),
    onSuccess: (res) => {
      setHasLiked(res.liked);
      onChange();
    },
    onError: (err) => {
      toast.error(`Error removing liked ${err.data.Exception}`, {
        autoClose: false,
      });
    },
  });

  return (
    <div>
      {hasLiked == null ? (
        <LoadingMessage message={'Loading.'} />
      ) : (
        <div className='mt-4'>
          {hasLiked ? (
            <ButtonWIcon
              text='Liked'
              onClick={() => setLikeRemoved.mutate(person)}
              icon={<ThumbsUpIcon color='white' height={5} width={5} />}
              bgColor='bg-success'
              additionalClasses='justify-center w-full'
            />
          ) : (
            <ButtonWIcon
              text='Like'
              onClick={() => setLiked.mutate(person)}
              icon={<ThumbsUpIcon color='white' height={5} width={5} />}
              bgColor='bg-primary'
              additionalClasses='justify-center w-full'
            />
          )}
        </div>
      )}
    </div>
  );
};

export default LikedPersonControls;
