import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import PersonPreview from "./PersonPreview";

const PersonGrid = ({ people }) => {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-16">
            {people.map((person) => {
                return (
                    <PersonPreview key={person.id} person={person} />
                )
            })}
        </div>
    );
};

PersonGrid.propTypes = {
    people: PropTypes.array.isRequired,
};

export default PersonGrid;
