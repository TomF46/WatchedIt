import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import LoadingMessage from '../../Loading/LoadingMessage';
import { searchFilmsPaginated } from '../../../api/filmsApi';
import FilmPreview from '../../Films/FilmPreview';
import { useQuery } from '@tanstack/react-query';
import { FilmSearchParameters } from '../../../types/Films';

type Props = {
  title: string;
  subtitle: string;
  sort: string;
};

function FilmsComingSoonReel({ title, subtitle, sort }: Props) {
  const page = 1;
  const filmsPerPage = 8;
  const currentDate = new Date().toISOString();
  const searchParams = {
    releasedAfterDate: currentDate,
    sort: sort,
  } as FilmSearchParameters;

  const { isLoading, data, error } = useQuery({
    queryKey: ['films-coming-soon', sort, filmsPerPage, page],
    queryFn: () =>
      searchFilmsPaginated(searchParams, page, filmsPerPage).then(
        (res) => res.data,
      ),
  });

  if (isLoading) return <LoadingMessage message={'Loading films.'} />;

  if (error) {
    toast.error(`Error getting films ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  if (data)
    return (
      <div className='films-reel'>
        {data.length > 0 && (
          <div className='mt-4'>
            <Link
              to={'/films'}
              className='inline-flex items-center text-2xl font-semibold text-primary hover:opacity-75'
            >
              {title}
            </Link>
            {subtitle && <p>{subtitle}</p>}
            <div className='grid grid-cols-16'>
              {data.map((film) => {
                return (
                  <FilmPreview key={film.id} film={film} editable={false} />
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
}

export default FilmsComingSoonReel;
