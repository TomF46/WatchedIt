import React from "react";
import PropTypes from "prop-types";

const PersonGrid = ({ people }) => {
    return (
        <div className="grid grid-cols-12">
            {people.map((person) => {
                return (
                    <div key={person.id} className="col-span-2">
                        <div className="p-4 mx-2 bg-backgroundOffset">
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
