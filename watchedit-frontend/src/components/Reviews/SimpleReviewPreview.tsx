import { useNavigate } from "react-router-dom";
import { Review } from "../../types/Reviews";
import StarIcon from "../Icons/StarIcon";

type Props = {
  review: Review;
  isLink: boolean;
};

const SimpleReviewPreview = ({ review, isLink }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="col-span-8 md:col-span-4 lg:col-span-2 mt-2">
      <div
        onClick={() => {
          if (isLink) navigate(`/films/${review.film.id}/reviews/${review.id}`);
        }}
        className="mx-2 bg-backgroundOffset cursor-pointer hover:opacity-75 h-full shadow rounded"
      >
        <img
          src={review.film.posterUrl}
          className="w-full poster rounded-t"
          alt={`${review.film.posterUrl} poster.`}
        />
        <div className="p-2">
          <div className="grid grid-cols-12">
            <div className="col-span-12 relative text-center">
              <div className="text-center inline-flex items-center">
                <StarIcon
                  color="rating"
                  height={5}
                  width={5}
                  strokeWidth={1.5}
                />
                <p className="ml-1">{review.rating}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleReviewPreview;
