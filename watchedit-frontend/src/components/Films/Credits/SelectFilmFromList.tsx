import { Film } from '../../../types/Films';

type Props = {
  films: Film[];
  onFilmSelected: (film: Film) => void;
};

const SelectFilmFromList = ({ films, onFilmSelected }: Props) => {
  return (
    <>
      {films.map((film) => {
        return (
          <div key={film.id} className='col-span-12 my-2'>
            <div
              className='grid cursor-pointer grid-cols-24 rounded bg-backgroundOffset shadow hover:opacity-75'
              onClick={() => {
                onFilmSelected(film);
              }}
            >
              <div className='col-span-3 md:col-span-2 lg:col-span-1'>
                <img
                  src={film.posterUrl}
                  className='poster h-full rounded-l'
                  alt={`${film.name} poster.`}
                />
              </div>
              <div
                className={`col-span-21 mx-2 inline-flex w-full items-center p-4 md:col-span-22 lg:col-span-23`}
              >
                <p>{film.name}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SelectFilmFromList;
