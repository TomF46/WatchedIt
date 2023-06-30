import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const FilmPreview = ({ film, editable, onRemove }) => {
    const navigate = useNavigate();
    return (
        <div className="col-span-8 md:col-span-4 lg:col-span-2 my-2">
            <div className="mx-2 bg-backgroundOffset cursor-pointer h-full shadow rounded">
                {editable && (
                    <button onClick={() => {onRemove(film)}} className="p-2 text-center bg-red-400 w-full hover:opacity-75 rounded-t">
                        Remove
                    </button>
                )}
                <div onClick={() => {navigate(`/films/${film.id}`)}} className="hover:opacity-75 relative">
                    <img src={film.posterUrl} className={`w-full poster ${editable ? "" : "rounded-t"}`} alt={`${film.name} poster.`} />
                    <div className="p-2">
                        <div className="grid grid-cols-12">
                            <div className="col-span-6 relative">
                                <div className="text-center inline-flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-rating">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                    </svg>
                                    <p className="ml-1">{film.averageRating ? film.averageRating : "- -"}</p>
                                </div>
                            </div>
                            <div className="col-span-6 relative">
                                <div className="text-center inline-flex items-center absolute right-0 top-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-success">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <p className="ml-1">{film.watchedCount}</p>
                                </div>
                            </div>
                            <div className="col-span-12">
                                <h3 className="text-center text-primary">{film.name}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

FilmPreview.propTypes = {
    film: PropTypes.object.isRequired,
    onRemove: PropTypes.func,
    editable: PropTypes.bool.isRequired,
};

export default FilmPreview;
