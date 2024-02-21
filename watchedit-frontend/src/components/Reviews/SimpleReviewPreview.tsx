import { useNavigate } from "react-router-dom";
import { Review } from "../../types/Reviews";

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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-rating"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
                <p className="ml-1">{review.rating}</p>
              </div>
            </div>
            {/* <div className="col-span-12">
              <h3 className="text-center text-primary text-sm">
                {review.film.name}
              </h3>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleReviewPreview;
