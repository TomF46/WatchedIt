import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const PersonGrid = ({ people }) => {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-16">
            {people.map((person) => {
                return (
                    <div key={person.id} className="col-span-8 md:col-span-4 lg:col-span-2 mt-2">
                        <div onClick={() => {navigate(`/people/${person.id}`)}} className="mx-2 bg-backgroundOffset cursor-pointer hover:opacity-75 h-full shadow rounded">
                            <img src={person.imageUrl} className="w-full headshot rounded-t" alt={`${person.fullName} headshot.`} />
                            <div className="p-2">
                                <p className="text-center text-primary">{person.fullName}</p>
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
