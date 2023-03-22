import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const PersonGrid = ({ people }) => {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-12">
            {people.map((person) => {
                return (
                    <div key={person.id} className="col-span-2">
                        <div onClick={() => {navigate(`/people/${person.id}`)}} className="p-4 mx-2 bg-backgroundOffset cursor-pointer">
                            <p>{person.firstName} {person.lastName}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

PersonGrid.propTypes = {
    people: PropTypes.array.isRequired,
};

export default PersonGrid;
