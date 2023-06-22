import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ListPreview = ({ list }) => {
    const navigate = useNavigate();
    return (
        <div key={list.id} className="col-span-12 md:col-span-4 my-2 mr-4">
            <div onClick={() => {navigate(`/lists/${list.id}`)}} className="bg-backgroundOffset cursor-pointer hover:opacity-75 shadow rounded h-full">
                            <div className="grid grid-cols-12">
                                <div className="col-span-4 p-1">
                                    <p className="text-sm mt-1 text-center">{list.name} {`(${list.filmCount})`} By {list.createdBy.username}</p>
                                </div>
                                <div className="col-span-8">
                                    <div className="grid grid-cols-12">
                                        {list.thumbnails.map((url) => {
                                            return (
                                                <div key={url} className="col-span-3">
                                                    <img src={url} className="poster h-full w-full" alt="thumbnail" />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
        </div>
    );
};

ListPreview.propTypes = {
    list: PropTypes.object.isRequired,
};

export default ListPreview;
