import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const FilmCreditsOverviewList = ({ credits }) => {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-12">
            {credits.map((credit) => {
                return (
                    <div className="col-span-12" key={credit.id}>
                        <div className="grid grid-cols-12 my-1">
                            <div className="col-span-12">
                                <div onClick={() => {navigate(`/people/${credit.person.id}`)}} className="p-4 bg-backgroundOffset cursor-pointer hover:opacity-75">
                                    <p>{credit.person.fullName} {credit.role} {`(${credit.type})`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

FilmCreditsOverviewList.propTypes = {
    credits: PropTypes.array.isRequired,
};

export default FilmCreditsOverviewList;
