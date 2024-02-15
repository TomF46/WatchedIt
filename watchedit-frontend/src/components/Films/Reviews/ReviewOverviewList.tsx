import ReviewOverview from "../../Reviews/ReviewOverview";
import { Review } from "../../../types/Reviews";

type Props = {
  reviews: Review[];
  showFilm: boolean;
};

const ReviewOverviewList = ({ reviews, showFilm }: Props) => {
  return (
    <div className="grid grid-cols-12">
      {reviews.map((review) => {
        return (
          <ReviewOverview key={review.id} review={review} showFilm={showFilm} />
        );
      })}
    </div>
  );
};

export default ReviewOverviewList;
