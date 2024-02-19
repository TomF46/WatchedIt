import { Film } from "../../../types/Films";

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
            className="col-span-8 md:col-span-4 lg:col-span-2 my-2"
          >
            <div className="mx-2 bg-backgroundOffset cursor-pointer h-full shadow rounded">
              <div
                onClick={() => {
                  onFilmSelected(film);
                }}
                className="hover:opacity-75 relative"
              >
                <img
                  src={film.posterUrl}
                  className={`w-full poster rounded-t`}
                  alt={`${film.name} poster.`}
                />
                <div className="p-2">
                  <div className="grid grid-cols-12">
                    <div className="col-span-12">
                      <h3 className="text-center text-primary">{film.name}</h3>
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
