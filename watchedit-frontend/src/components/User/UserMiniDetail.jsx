import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserMiniDetail = ({ user }) => {
    return (
        <div className="grid grid-cols-12">
           <div className="col-span-12 md:col-span-6 lg:col-span-4">
                <div className="grid grid-cols-12 bg-backgroundOffset">
                    <div className="col-span-4">
                        <img src={user.imageUrl} className="h-full headshot" />
                    </div>
                    <div className="col-span-8 p-2">
                        <Link to={`/profile/${user.id}`} className="text-primary font-bold hover:opacity-75">{user.username}</Link>
                    </div>
                </div>
           </div>
        </div>
    );
};

UserMiniDetail.propTypes = {
    user: PropTypes.object.isRequired,
};

export default UserMiniDetail;
