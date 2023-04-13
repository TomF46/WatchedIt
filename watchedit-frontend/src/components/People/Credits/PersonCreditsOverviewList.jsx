import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const PersonCreditsOverviewList = ({ credits }) => {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-12">
            {credits.map((credit) => {
                return (
                    <div className="col-span-12" key={credit.id}>
                        <div onClick={() => {navigate(`/films/${credit.film.id}`)}} className="bg-backgroundOffset cursor-pointer">
                            <div className="grid grid-cols-24 my-1">
                                <div className="col-span-1">
                                    <img src={credit.film.posterUrl} className="w-full poster" />
                                </div>
                                <div className="col-span-23 p-4 inline-flex items-center">
                                    <p>{credit.film.name} - {credit.role} {`(${credit.type})`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

PersonCreditsOverviewList.propTypes = {
    credits: PropTypes.array.isRequired,
};

export default PersonCreditsOverviewList;

