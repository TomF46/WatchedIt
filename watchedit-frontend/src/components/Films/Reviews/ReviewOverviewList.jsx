import PropTypes from "prop-types";
import ReviewOverview from "../../Reviews/ReviewOverview";

const ReviewOverviewList = ({ reviews, showFilm }) => {
    return (
        <div className="grid grid-cols-12">
            {reviews.map((review) => {
                return (
                    <ReviewOverview key={review.id} review={review} showFilm={showFilm} />
                )
            })}
        </div>
    );
};

ReviewOverviewList.propTypes = {
    reviews: PropTypes.array.isRequired,
    showFilm: PropTypes.bool.isRequired
};

export default ReviewOverviewList;
