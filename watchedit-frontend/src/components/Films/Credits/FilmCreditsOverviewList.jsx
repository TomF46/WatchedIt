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
                        <div onClick={() => {navigate(`/people/${credit.person.id}`)}} className="bg-backgroundOffset cursor-pointer hover:opacity-75 shadow rounded">
                            <div className="grid grid-cols-24 my-1">
                                <div className="col-span-3 md:col-span-2 lg:col-span-1">
                                    <img src={credit.person.imageUrl} className="h-full headshot" alt={`${credit.person.fullName} headshot.`} />
                                </div>
                                <div className="col-span-21 md:col-span-22 lg:col-span-23 p-4 inline-flex items-center">
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
