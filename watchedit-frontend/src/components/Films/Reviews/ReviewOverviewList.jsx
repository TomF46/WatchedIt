import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ReviewOverviewList = ({ reviews, showFilm }) => {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-12">
            {reviews.map((review) => {
                return (
                    <div key={review.id} className="col-span-12 my-2">
                        <div onClick={() => {navigate(`/films/${review.film.id}/reviews/${review.id}`)}} className="bg-backgroundOffset cursor-pointer hover:opacity-75">
                            <div className="grid grid-cols-24">
                                {showFilm && (
                                    <div className="col-span-1">
                                        <img src={review.film.posterUrl} className="w-full poster" />
                                    </div>
                                )}
                                <div className={`${showFilm ? "col-span-23" : "col-span-24"} inline-flex items-center`}>
                                    <p className="p-4">{showFilm ? review.film.name: ""} {review.rating} by {review.user.username}</p>
                                </div>
                            </div>
                        </div>
                    </div>
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
