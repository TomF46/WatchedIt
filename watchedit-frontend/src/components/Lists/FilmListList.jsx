import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const FilmListList = ({ lists }) => {
    const navigate = useNavigate();
    return (
        <div className="grid grid-cols-12">
            {lists.map((list) => {
                return (
                    <div key={list.id} className="col-span-12 my-1">
                        <div onClick={() => {navigate(`/lists/${list.id}`)}} className="px-4 py-2 bg-backgroundOffset cursor-pointer">
                            <p>{list.name} {`(${list.createdBy.username}) (${list.filmCount})`}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

FilmListList.propTypes = {
    lists: PropTypes.array.isRequired,
};

export default FilmListList;
