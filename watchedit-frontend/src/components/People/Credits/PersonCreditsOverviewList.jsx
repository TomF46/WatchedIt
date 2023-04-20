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
                        <div onClick={() => {navigate(`/films/${credit.film.id}`)}} className="bg-backgroundOffset cursor-pointer shadow rounded">
                            <div className="grid grid-cols-24 my-1">
                                <div className="col-span-3 md:col-span-2 lg:col-span-1">
                                    <img src={credit.film.posterUrl} className="h-full poster" />
                                </div>
                                <div className="col-span-21 md:col-span-22 lg:col-span-23 inline-flex items-center">
                                    <p className="p-4">{credit.film.name} - {credit.role} {`(${credit.type})`}</p>
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

