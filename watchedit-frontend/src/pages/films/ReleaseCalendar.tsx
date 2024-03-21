import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import LoadingMessage from '../../components/Loading/LoadingMessage';
import { searchFilmsPaginated } from '../../api/filmsApi';
import { FilmCalendarEntry, FilmSearchParameters } from '../../types/Films';
import { format, parseISO } from 'date-fns';
import FilmGrid from '../../components/Films/FilmGrid';
import CalendarIcon from '../../components/Icons/CalendarIcon';

function ReleaseCalendar() {
  const page = 1;
  const filmsPerPage = 32;
  const currentDate = new Date().toISOString();
  const searchParams = {
    releasedAfterDate: currentDate,
    sort: 'release_asc',
  } as FilmSearchParameters;

  const { isLoading, data, error } = useQuery({
    queryKey: ['film-calendar', filmsPerPage, page],
    queryFn: () =>
      searchFilmsPaginated(searchParams, page, filmsPerPage).then((res) => {
        const dates = [] as FilmCalendarEntry[];
        res.data.forEach((film) => {
          const formattedReleaseDate = format(
            parseISO(film.releaseDate.toString()),
            'dd/MM/yyyy',
          );
          const entry = dates.find((x) => x.date == formattedReleaseDate);
          if (entry) {
            entry.films.push(film);
            return;
          }
          const newEntry = {
            date: formattedReleaseDate,
            films: [],
          } as FilmCalendarEntry;
          newEntry.films.push(film);
          dates.push(newEntry);
        });
        return dates;
      }),
  });

  if (isLoading)
    return <LoadingMessage message={'Loading release calendar.'} />;

  if (error) {
    toast.error(`Error getting release calendar ${error.data.Exception}`, {
      autoClose: false,
    });
    return;
  }

  if (data)
    return (
      <div className='release-calendar'>
        <h1 className='my-4 text-center text-4xl font-semibold text-primary'>
          Release calendar
        </h1>
        {data.length > 0 ? (
          <div className='grid grid-cols-12'>
            {data.map((data) => {
              return (
                <div key={data.date} className='col-span-12'>
                  <p className='inline-flex items-center text-2xl font-semibold text-primary'>
                    {data.date}
                  </p>
                  <FilmGrid films={data.films} editable={false} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className='my-16'>
            <div className='flex justify-center text-center'>
              <CalendarIcon color='primary' height={14} width={14} />
            </div>
            <p className='text-center text-2xl'>No upcoming releases</p>
          </div>
        )}
      </div>
    );
}

export default ReleaseCalendar;
