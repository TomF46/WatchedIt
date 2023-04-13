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
                        <div onClick={() => {navigate(`/people/${credit.person.id}`)}} className="bg-backgroundOffset cursor-pointer hover:opacity-75">
                            <div className="grid grid-cols-24 my-1">
                                <div className="col-span-1">
                                    <img src={credit.person.imageUrl} className="h-full headshot" />
                                </div>
                                <div className="col-span-23 p-4 inline-flex items-center">
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
