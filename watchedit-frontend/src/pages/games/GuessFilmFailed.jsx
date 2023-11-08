import { Link } from "react-router-dom";

function GuessFilmFailed() {
  return (
    <div className="bg-backgroundOffset p-4 shadow rounded text-center">
      <h1 className="text-center text-primary text-2xl my-4 font-bold">
        Game over! You failed to guess the film and have no clues remaining.
      </h1>
      <div className="my-4">
        <Link
          to={"/games/filmFromCast"}
          className="bg-primary text-white rounded py-2 px-4 mt-4 hover:opacity-75"
        >
          Try again
        </Link>
      </div>
    </div>
  );
}

export default GuessFilmFailed;
