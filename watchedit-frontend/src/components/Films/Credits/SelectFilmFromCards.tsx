import { Film } from '../../../types/Films';

type Props = {
  films: Film[];
  onFilmSelected: (film: Film) => void;
};

const SelectFilmFromCards = ({ films, onFilmSelected }: Props) => {
  return (
    <>
      {films.map((film) => {
        return (
          <div
            key={film.id}
            className='col-span-8 my-2 md:col-span-4 lg:col-span-2'
          >
            <div className='mx-2 h-full cursor-pointer rounded bg-backgroundOffset shadow'>
              <div
                onClick={() => {
                  onFilmSelected(film);
                }}
                className='relative hover:opacity-75'
              >
                <img
                  src={film.posterUrl}
                  className={`poster w-full rounded-t`}
                  alt={`${film.name} poster.`}
                />
                <div className='p-2'>
                  <div className='grid grid-cols-12'>
                    <div className='col-span-12'>
                      <h3 className='text-center text-primary'>{film.name}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SelectFilmFromCards;
