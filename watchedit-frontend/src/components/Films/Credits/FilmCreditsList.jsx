import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const FilmCreditsList = ({ credits }) => {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-12">
            {credits.map((credit) => {
                return (
                    <div key={credit.id} className="col-span-12 my-2">
                        <div onClick={() => {navigate(`/people/${credit.person.id}`)}} className="p-4 mx-2 bg-backgroundOffset cursor-pointer">
                            <p>{credit.person.firstName} {credit.person.lastName} {credit.role} {`(${credit.type})`}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

FilmCreditsList.propTypes = {
    credits: PropTypes.array.isRequired,
};

export default FilmCreditsList;
