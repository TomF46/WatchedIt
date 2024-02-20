import { useNavigate } from "react-router-dom";
import { GuessFilmFromCastGame } from "../../types/Games";

const CorrectGuessFilm = ({ game }: { game: GuessFilmFromCastGame }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h3 className="text-primary text-2xl text-center">
        Well done! You guessed the correct film
      </h3>
      <div className="grid grid-cols-12 my-4">
        <div className="col-span-12 md:col-span-4 md:col-start-4 lg:col-span-2 lg:col-start-6 my-2">
          <div
            onClick={() => {
              navigate(`/films/${game.film.id}`);
            }}
            className="mx-2 bg-backgroundOffset cursor-pointer h-full shadow rounded"
          >
            <div className="hover:opacity-75 relative">
              <img
                src={game.film.posterUrl}
                className={`w-full poster rounded-t`}
                alt={`${game.film.name} poster.`}
              />
              <div className="p-2">
                <div className="grid grid-cols-12">
                  <div className="col-span-12">
                    <h3 className="text-center text-primary">
                      {game.film.name}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorrectGuessFilm;
