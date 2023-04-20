import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const PeopleReelItem = ({ person }) => {
    const navigate = useNavigate();
    return (
        <div key={person.id} className="col-span-8 md:col-span-4 lg:col-span-2 mt-2">
            <div className="mr-2 bg-backgroundOffset cursor-pointer hover:opacity-75 h-full shadow rounded">
                <div onClick={() => {navigate(`/people/${person.id}`)}}>
                    <img src={person.imageUrl} className="w-full headshot rounded-t" />
                    <div className="p-2">
                        <p className="text-center text-primary">{person.fullName}</p>
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
