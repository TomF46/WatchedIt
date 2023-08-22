import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const FilmCreditPreview = ({ credit, isLink, showFilmName }) => {
    const navigate = useNavigate();
    return (
        <div className="h-full">
            <div className="mx-2 bg-backgroundOffset cursor-pointer h-full shadow rounded">
                <div onClick={() => { if(isLink)navigate(`/people/${credit.person.id}`)}} className="hover:opacity-75 relative">
                <img src={credit.person.imageUrl} className="w-full headshot rounded-t" alt={`${credit.person.fullName} headshot.`} />
                    <div className="p-2">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <h3 className="text-center text-primary">{credit.person.fullName}</h3>
                                <p className="text-center opacity-75">{credit.role}</p>
                                {showFilmName && (<p className="text-center opacity-75">({credit.film.name})</p>)} 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

FilmCreditPreview.propTypes = {
    credit: PropTypes.object.isRequired,
    isLink: PropTypes.bool.isRequired,
    showFilmName: PropTypes.bool.isRequired
};

export default FilmCreditPreview;

