import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { getUserById } from "../../api/usersApi";
import { Link, useParams } from "react-router-dom";
import UserLists from "../../components/User/UserLists";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import { logout } from "../../redux/actions/authenticationActions";
import { confirmAlert } from "react-confirm-alert";
import UserLatestReviews from "../../components/Reviews/UserLatestReviews";

function Profile({id, currentUserId, logout}) {
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

    function handleLogout(){
        confirmAlert({
            title : "Confirm logout",
            message: `Are you sure you want to logout?`,
            buttons: [
                {
                  label: 'Yes',
                  onClick: () => {
                    logout();
                    toast.info("Logged out");
                  }
                },
                {
                  label: 'No',
                  onClick: () => {}
                }
            ]
        });
    }

    return (
        <div className="user-page">
            {!user ? (
                <LoadingMessage message={"Loading user."} />
            ) : (
                <div className="grid grid-cols-12">
                        <div className="col-span-12">
                            <h1 className="my-4 text-center text-primary text-4xl">{user.username}</h1>
                        </div>
                        <div className="col-span-12 md:col-span-2">
                            <img src={user.imageUrl} className="headshot" />
                            <div className="flex flex-col">
                                <Link
                                    to={`/profile/${id}/watched`}
                                    className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block mt-4 w-full text-center"
                                >
                                    Watched
                                </Link>
                                <Link
                                    to={`/profile/${id}/reviews`}
                                    className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block mt-4 w-full text-center"
                                >
                                    Reviews
                                </Link>
                                {user.id == currentUserId && (
                                    <>
                                        <Link
                                            to={`/profile/edit`}
                                            className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block mt-4 w-full text-center"
                                        >
                                            Edit profile
                                         </Link>
                                        <button onClick={handleLogout} className="bg-red-400 text-white rounded py-2 px-4 hover:opacity-75 inline-block mt-4 w-full text-center">
                                            Logout
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="col-span-12 mt-4 md:col-span-10 md:pl-4 md:mt-0">
                            <div className="grid grid-cols-12 bg-backgroundOffset p-4">
                                <div className="col-span-12 md:col-span-6">
                                    <p>Username: {user.username}</p>
                                    <p>Email: {user.email}</p>
                                    <p>Watched films: {user.watchedFilmCount}</p>
                                </div>
                                <div className="col-span-12 md:col-span-6">
                                    {user.biography && (
                                        <p>Bio: {user.biography}</p>
                                    )}
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="grid grid-cols-12">
                                    <div className="col-span-12">
                                        <UserLists user={user} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12">
                                <UserLatestReviews user={user} totalReviews={4} />
                            </div>
                        </div>
                    </div>
            )}
        </div>
    );
}

Profile.propTypes = {
    id: PropTypes.any.isRequired,
    logout: PropTypes.func.isRequired,
    currentUserId: PropTypes.number
};

const mapStateToProps = (state, ownProps) => {
    const { id } = useParams();
    return {
        id:  id ? id : state.tokens.id,
        currentUserId: state.tokens ? state.tokens.id : null
    };
};

const mapDispatchToProps = {
    logout
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
