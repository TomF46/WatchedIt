import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ListReelItem = ({ list }) => {
    const navigate = useNavigate();
    return (
        <div key={list.id} className="col-span-12 md:col-span-6 my-1 mr-2">
            <div onClick={() => {navigate(`/lists/${list.id}`)}} className="bg-backgroundOffset cursor-pointer hover:opacity-75 shadow rounded">
                <div className="grid grid-cols-24">
                    <div className="col-span-3 lg:col-span-2">
                        <img src={list.createdBy.imageUrl} className="h-full headshot rounded-l" alt={`${list.createdBy.username} profile picture.`} />
                    </div>
                    <div className="col-span-21 lg:col-span-22 px-4 py-2 inline-flex items-center">
                        <p>{list.name} {`(${list.filmCount})`} By {list.createdBy.username}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

ListReelItem.propTypes = {
    list: PropTypes.object.isRequired,
};

export default ListReelItem;
