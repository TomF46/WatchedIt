import PropTypes from "prop-types";

const SelectFilmFromList = ({ films, onFilmSelected }) => {
  return (
    <>
      {films.map((film) => {
        return (
          <div key={film.id} className="col-span-12 my-2">
            <div
              className="grid grid-cols-24 bg-backgroundOffset shadow rounded cursor-pointer hover:opacity-75"
              onClick={() => {
                onFilmSelected(film);
              }}
            >
              <div className="col-span-3 md:col-span-2 lg:col-span-1">
                <img
                  src={film.posterUrl}
                  className="h-full poster rounded-l"
                  alt={`${film.name} poster.`}
                />
              </div>
              <div
                className={`col-span-21 md:col-span-22 lg:col-span-23 p-4 inline-flex items-center w-full mx-2`}
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

SelectFilmFromList.propTypes = {
  films: PropTypes.array.isRequired,
  onFilmSelected: PropTypes.func.isRequired,
};

export default SelectFilmFromList;
