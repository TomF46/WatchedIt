import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const PersonGrid = ({ people }) => {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-12">
            {people.map((person) => {
                return (
                    <div key={person.id} className="col-span-12 md:col-span-2">
                        <div onClick={() => {navigate(`/people/${person.id}`)}} className="mx-2 bg-backgroundOffset cursor-pointer hover:opacity-75">
                            <img src={person.imageUrl} className="w-full headshot" />
                            <div className="p-4">
                                <p className="text-center">{person.fullName}</p>
                            </div>
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
