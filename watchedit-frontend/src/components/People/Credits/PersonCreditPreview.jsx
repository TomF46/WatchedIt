import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const PersonCreditPreview = ({ credit }) => {
    const navigate = useNavigate();
    return (
        <div className="h-full">
            <div className="mx-2 bg-backgroundOffset cursor-pointer h-full shadow rounded">
                <div onClick={() => {navigate(`/films/${credit.film.id}`)}} className="hover:opacity-75 relative">
                <img src={credit.film.posterUrl} className="h-full poster rounded-t" alt={`${credit.film.name} poster.`} />
                    <div className="p-2">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <h3 className="text-center text-primary">{credit.role}</h3>
                                <p className="text-center opacity-75">{`(${credit.type})`}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

PersonCreditPreview.propTypes = {
    credit: PropTypes.object.isRequired
};

export default PersonCreditPreview;
