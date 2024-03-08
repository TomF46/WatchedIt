import TextInput from "../Inputs/TextInput";
import { Film } from "../../types/Films";
import FilmIcon from "../Icons/FilmIcon";

type Props = {
  currentFilms: Film[];
  films: Film[];
  searchTerm: string;
  onSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilmSelected: (film: Film) => void;
};

const SelectFilmListWSearch = ({
  currentFilms,
  films,
  searchTerm,
  onSearchTermChange,
  onFilmSelected,
}: Props) => {
  function isAlreadyInList(film: Film) {
    return currentFilms.some((x) => x.id == film.id);
  }

  return (
    <>
      <div className="controls bg-backgroundOffset mt-4 rounded-md shadow mb-4">
        <div className="bg-backgroundOffset2 rounded-t-md">
          <p className="text-primary font-semibold text-lg px-2 py-1">Search</p>
        </div>
        <div className="px-2 py-2">
          <div className="search-box">
            <TextInput
              name="searchTerm"
              label="Search"
              value={searchTerm}
              onChange={onSearchTermChange}
              required={false}
            />
          </div>
        </div>
      </div>
      {films.length > 0 ? (
        <div className="grid grid-cols-12">
          {films.map((film) => {
            return (
              <div
                key={film.id}
                onClick={() => {
                  if (!isAlreadyInList(film)) onFilmSelected(film);
                }}
                className={`col-span-12 my-2 shadow rounded ${
                  isAlreadyInList(film)
                    ? "bg-green-400"
                    : "bg-backgroundOffset cursor-pointer hover:opacity-75"
                }`}
              >
                <div className="grid grid-cols-24">
                  <div className="col-span-3 md:col-span-2 lg:col-span-1">
                    <img
                      src={film.posterUrl}
                      className="h-full poster rounded-l"
                      alt={`${film.name} poster.`}
                    />
                  </div>
                  <div className="col-span-21 md:col-span-22 lg:col-span-23 inline-flex items-center">
                    <p className="p-4">{film.name}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="my-16">
          <div className="flex justify-center text-center">
            <FilmIcon color="primary" height={14} width={14} />
          </div>
          <p className="text-center text-2xl">No films match your search</p>
        </div>
      )}
    </>
  );
};

export default SelectFilmListWSearch;
