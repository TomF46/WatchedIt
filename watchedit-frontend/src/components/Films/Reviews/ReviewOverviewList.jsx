import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ReviewOverviewList = ({ reviews }) => {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-12">
            {reviews.map((review) => {
                return (
                    <div key={review.id} className="col-span-12 my-2">
                        <div onClick={() => {navigate(`/films/${review.film.id}/reviews/${review.id}`)}} className="p-4 mx-2 bg-backgroundOffset cursor-pointer hover:opacity-75">
                            <p>{review.rating} by {review.user.username}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

ReviewOverviewList.propTypes = {
    reviews: PropTypes.array.isRequired,
};

export default ReviewOverviewList;
