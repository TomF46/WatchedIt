import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { getUserById } from "../../api/usersApi";
import { useParams } from "react-router-dom";

function Profile({id}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user || user.id != id) {
            getUser();
        }
    }, [id, user]);

    function getUser() {
        getUserById(id)
            .then((res) => {
                setUser(res);
            })
            .catch((err) => {
                toast.error(`Error getting user ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    return (
        <div className="user-page">
            {!user ? (
                <p>Loading...</p>
            ) : (
                 <p className="text-primary text-xl">{user.username}</p>
            )}
        </div>
    );
}

Profile.propTypes = {
    id: PropTypes.any.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const { id } = useParams();
    return {
        id:  id ? id : state.tokens.id,
    };
};

export default connect(mapStateToProps)(Profile);
