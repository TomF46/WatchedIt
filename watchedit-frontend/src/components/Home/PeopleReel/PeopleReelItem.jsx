import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const PeopleReelItem = ({ person }) => {
    const navigate = useNavigate();
    return (
        <div key={person.id} className="col-span-12 md:col-span-2">
            <div className="mr-2 bg-backgroundOffset cursor-pointer hover:opacity-75">
                <div onClick={() => {navigate(`/people/${person.id}`)}}>
                    <img src={person.imageUrl} className="w-full headshot" />
                    <div className="p-4">
                        <p className="text-center">{person.fullName}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

PeopleReelItem.propTypes = {
    person: PropTypes.object.isRequired,
};

export default PeopleReelItem;
