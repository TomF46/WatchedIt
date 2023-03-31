import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const PersonCreditsOverviewList = ({ credits }) => {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-12">
            <div className="col-span-12">
                <h2 className="mt-4 text-primary text-xl ">Credits</h2>
            </div>
            {credits.map((credit) => {
                return (
                    <div className="col-span-12" key={credit.id}>
                        <div className="grid grid-cols-12 my-1">
                            <div className="col-span-12">
                                <div onClick={() => {navigate(`/films/${credit.film.id}`)}} className="p-4 bg-backgroundOffset cursor-pointer">
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

