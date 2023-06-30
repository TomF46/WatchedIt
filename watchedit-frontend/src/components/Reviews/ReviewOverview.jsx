import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ReviewOverview = ({ review, showFilm }) => {
    return (
        <div className="col-span-12 my-2 p-2 bg-backgroundOffset p-4 shadow rounded">
            <div className="grid grid-cols-24">
                {showFilm && (
                    <div className="col-span-4 md:col-span-2 lg:col-span-1">
                        <img src={review.film.posterUrl} className="w-full poster" alt={`${review.film.name} poster.`}/>
                    </div>
                )}
                <div className={`${showFilm ? "col-span-20 md:col-span-22 lg:col-span-23" : "col-span-24"} ml-2`}>
                    <div className="inline-flex items-center">
                        <Link to={`/films/${review.film.id}/reviews/${review.id}`} className="text-rating hover:opacity-75">{review.rating}/10</Link>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-rating ml-1 inline-flex items-center">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                        <p className="ml-2">By <Link className="text-primary hover:opacity-75" to={`/profile/${review.user.id}`}>{review.user.username}</Link></p>
                    </div>
                    <p>{review.text.length > 400 ? `${review.text.substring(0,400)}...` : review.text}</p>
                    <Link to={`/films/${review.film.id}/reviews/${review.id}`} className="text-primary hover:opacity-75">View full review</Link>
                </div>
            </div>
        </div>
    );
};

ReviewOverview.propTypes = {
    review: PropTypes.object.isRequired,
    showFilm: PropTypes.bool.isRequired
};

export default ReviewOverview;
