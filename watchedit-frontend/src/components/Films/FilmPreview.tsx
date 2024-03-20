import { useNavigate } from 'react-router-dom';
import { Film } from '../../types/Films';
import StarIcon from '../Icons/StarIcon';
import EyeIcon from '../Icons/EyeIcon';

type Props = {
  film: Film;
  editable: boolean;
  onRemove?: (film: Film) => void;
};

const FilmPreview = ({ film, editable, onRemove }: Props) => {
  const navigate = useNavigate();
  return (
    <div className='col-span-8 my-2 md:col-span-4 lg:col-span-2'>
      <div className='group mx-2 h-full cursor-pointer rounded bg-backgroundOffset shadow'>
        {editable && onRemove && (
          <button
            onClick={() => {
              onRemove(film);
            }}
            className='w-full rounded-t bg-red-400 p-2 text-center hover:opacity-75'
          >
            Remove
          </button>
        )}
        <div
          onClick={() => {
            navigate(`/films/${film.id}`);
          }}
          className='relative hover:opacity-75'
        >
          <div className='relative'>
            <img
              src={film.posterUrl}
              className={`poster w-full ${editable ? '' : 'rounded-t'}`}
              alt={`${film.name} poster.`}
            />
            <div className='invisible absolute bottom-0 w-full bg-backgroundOffset2 p-1 group-hover:visible'>
              <p className='text-center text-primary'>{film.name}</p>
            </div>
          </div>
          <div className='p-2'>
            <div className='grid grid-cols-12'>
              <div className='relative col-span-6'>
                <div className='inline-flex items-center text-center'>
                  <StarIcon
                    color='rating'
                    height={5}
                    width={5}
                    strokeWidth={1.5}
                  />
                  <p className='ml-1'>
                    {film.averageRating ? film.averageRating : '- -'}
                  </p>
                </div>
              </div>
              <div className='relative col-span-6'>
                <div className='absolute right-0 top-0 inline-flex items-center text-center'>
                  <EyeIcon color='success' height={5} width={5} />
                  <p className='ml-1'>{film.watchedByCount}</p>
                </div>
              </div>
              <div className='col-span-12 lg:hidden'>
                <h3 className='text-center text-primary'>{film.name}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmPreview;
