import { Link } from "react-router-dom";
import { Review } from "../../types/Reviews";
import StarIcon from "../Icons/StarIcon";

type Props = {
  review: Review;
  showFilm: boolean;
};

const ReviewOverview = ({ review, showFilm }: Props) => {
  return (
    <div className="col-span-12 my-2 p-2 bg-backgroundOffset shadow rounded">
      <div className="grid grid-cols-24">
        {showFilm && (
          <div className="col-span-4 md:col-span-2 lg:col-span-1">
            <img
              src={review.film.posterUrl}
              className="w-full poster"
              alt={`${review.film.name} poster.`}
            />
          </div>
        )}
        <div
          className={`${
            showFilm
              ? "col-span-20 md:col-span-22 lg:col-span-23"
              : "col-span-24"
          } ml-2`}
        >
          <div className="inline-flex items-center">
            <Link
              to={`/films/${review.film.id}/reviews/${review.id}`}
              className="text-rating hover:opacity-75"
            >
              {review.rating}/10
            </Link>
            <div className="ml-1 inline-flex items-center">
              <StarIcon color="rating" height={5} width={5} strokeWidth={1.5} />
            </div>
            <p className="ml-2">
              By{" "}
              <Link
                className="text-primary hover:opacity-75"
                to={`/profile/${review.user.id}`}
              >
                {review.user.username}
              </Link>
            </p>
          </div>
          <p>
            {review.text.length > 400
              ? `${review.text.substring(0, 400)}...`
              : review.text}
          </p>
          <Link
            to={`/films/${review.film.id}/reviews/${review.id}`}
            className="text-primary hover:opacity-75"
          >
            View full review
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReviewOverview;
