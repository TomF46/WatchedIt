import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const FilmReelItem = ({ film }) => {
    const navigate = useNavigate();
    return (
        <div key={film.id} className="col-span-12 md:col-span-2">
            <div className="mr-2 bg-backgroundOffset cursor-pointer hover:opacity-75">
                <div onClick={() => {navigate(`/films/${film.id}`)}}>
                    <img src={film.posterUrl} className="w-full poster" />
                    <div className="p-4">
                        <p className="text-center">{film.name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

FilmReelItem.propTypes = {
    film: PropTypes.object.isRequired,
};

export default FilmReelItem;
