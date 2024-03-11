import EyeIcon from "../Icons/EyeIcon";
import FilmIcon from "../Icons/FilmIcon";
import ListIcon from "../Icons/ListIcon";
import SearchIcon from "../Icons/SearchIcon";
import StarIcon from "../Icons/StarIcon";
import ThumbsUpIcon from "../Icons/ThumbsUpIcon";

function ReasonsToLoginSection() {
  return (
    <div className="grid grid-cols-12 mt-4">
      <div className="col-span-12 md:col-span-4 md:mx-2 mt-4">
        <div className="grid grid-cols-12 bg-backgroundOffset shadow rounded h-full">
          <div className="col-span-3 inline-flex items-center justify-center">
            <EyeIcon color="primary" height={10} width={10} />
          </div>
          <div className="col-span-9 p-2">
            <p className="text-left">
              Track for yourself or show your friends which films you&apos;ve
              watched by adding films to your watched list.
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 md:mx-2 mt-4">
        <div className="grid grid-cols-12 bg-backgroundOffset shadow rounded h-full">
          <div className="col-span-3 inline-flex items-center justify-center">
            <StarIcon
              color="primary"
              height={10}
              width={10}
              strokeWidth={1.5}
            />
          </div>
          <div className="col-span-9 p-2">
            <p className="text-left">
              Leave reviews for others and read other users reviews to find the
              best films for you.
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 md:mx-2 mt-4">
        <div className="grid grid-cols-12 bg-backgroundOffset shadow rounded h-full">
          <div className="col-span-3 inline-flex items-center justify-center">
            <ListIcon
              color="primary"
              height={10}
              width={10}
              strokeWidth={1.5}
            />
          </div>
          <div className="col-span-9 p-2">
            <p className="text-left">
              Create, view, and share lists based on any topic of your choice.
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 md:mx-2 mt-4">
        <div className="grid grid-cols-12 bg-backgroundOffset shadow rounded h-full">
          <div className="col-span-3 inline-flex items-center justify-center">
            <ThumbsUpIcon color="primary" height={10} width={10} />
          </div>
          <div className="col-span-9 p-2">
            <p className="text-left">
              Like people such as cast and crew, and quickly see your favourites
              peoples latest projects.
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 md:mx-2 mt-4">
        <div className="grid grid-cols-12 bg-backgroundOffset shadow rounded h-full">
          <div className="col-span-3 inline-flex items-center justify-center">
            <FilmIcon color="primary" height={10} width={10} />
          </div>
          <div className="col-span-9 p-2">
            <p className="text-left">
              Rate films, which allows us to promote the best films to our
              users.
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 md:mx-2 mt-4">
        <div className="grid grid-cols-12 bg-backgroundOffset shadow rounded h-full">
          <div className="col-span-3 inline-flex items-center justify-center">
            <SearchIcon color="primary" height={10} width={10} />
          </div>
          <div className="col-span-9 p-2">
            <p>
              Compehensive search and sorting to easily find the best films for
              you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReasonsToLoginSection;
