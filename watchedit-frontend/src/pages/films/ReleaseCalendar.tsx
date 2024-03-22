import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import LoadingMessage from '../../components/Loading/LoadingMessage';
import { searchFilmsPaginated } from '../../api/filmsApi';
import { FilmCalendarEntry, FilmSearchParameters } from '../../types/Films';
import { format, parseISO } from 'date-fns';
import FilmGrid from '../../components/Films/FilmGrid';
import CalendarIcon from '../../components/Icons/CalendarIcon';
import ReactDatePicker from 'react-datepicker';
import { useState } from 'react';

function ReleaseCalendar() {
  const [chosenDate, setChosenDate] = useState<Date | null>(null);
  const page = 1;
  const filmsPerPage = 32;
  const currentDate = new Date().toISOString();
  const tomorrowsDate = new Date();
  tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);

  const searchParams = {
    releasedAfterDate: currentDate,
    releasedOnDate: chosenDate?.toISOString(),
    sort: 'release_asc',
  } as FilmSearchParameters;

  const { isLoading, data, error } = useQuery({
    queryKey: ['film-calendar', filmsPerPage, page, chosenDate],
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
        <div className='mt-4'>
          <div className='controls mb-4 mt-4 rounded-md bg-backgroundOffset shadow'>
            <div className='rounded-t-md bg-backgroundOffset2'>
              <p className='px-2 py-1 text-lg font-semibold text-primary'>
                Or choose a date
              </p>
            </div>
            <div className='px-2 py-2'>
              <div className='search-box flex'>
                <div>
                  <ReactDatePicker
                    dateFormat='dd-MM-yyyy'
                    className='rounded border border-gray-500 bg-backgroundOffset2 p-2 focus:border-primary focus:outline-none'
                    selected={chosenDate}
                    onChange={(date) => setChosenDate(date)}
                    placeholderText='Choose a date'
                    minDate={tomorrowsDate}
                  />
                </div>
                {chosenDate && (
                  <button
                    onClick={() => setChosenDate(null)}
                    className='ml-4 rounded bg-primary px-4 py-2 text-white hover:opacity-75'
                  >
                    Show all
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
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
            <p className='text-center text-2xl'>
              No upcoming releases {chosenDate && 'on this day'}
            </p>
          </div>
        )}
      </div>
    );
}

export default ReleaseCalendar;
