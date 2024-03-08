import TextInput from "../../Inputs/TextInput";
import SelectFilmFromList from "./SelectFilmFromList";
import SelectFilmFromCards from "./SelectFilmFromCards";
import { Film } from "../../../types/Films";
import FilmIcon from "../../Icons/FilmIcon";

type Props = {
  films: Film[];
  searchTerm: string;
  onSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilmSelected: (film: Film) => void;
  cardMode: boolean;
};

const SelectFilmWSearch = ({
  films,
  searchTerm,
  onSearchTermChange,
  onFilmSelected,
  cardMode,
}: Props) => {
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
        <div className={`grid  ${cardMode ? "grid-cols-16" : "grid-cols-12"}`}>
          {cardMode ? (
            <SelectFilmFromCards
              films={films}
              onFilmSelected={onFilmSelected}
            />
          ) : (
            <SelectFilmFromList films={films} onFilmSelected={onFilmSelected} />
          )}
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

export default SelectFilmWSearch;
