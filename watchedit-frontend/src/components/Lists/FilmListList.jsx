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
                        <div onClick={() => {navigate(`/lists/${list.id}`)}} className="bg-backgroundOffset cursor-pointer hover:opacity-75">
                            <div className="grid grid-cols-12">
                                <div className="col-span-1">
                                    <img src={list.createdBy.imageUrl} className="h-full headshot" />
                                </div>
                                <div className="col-span-11 px-4 py-2">
                                    <p>{list.name} {`(${list.filmCount})`} By {list.createdBy.username}</p>
                                </div>
                            </div>
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
