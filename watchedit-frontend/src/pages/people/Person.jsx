import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { getPersonById, removePerson } from "../../api/peopleApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";


function Person({isAdmin}) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [person, setPerson] = useState(null);

    useEffect(() => {
        if (!person) {
            getPerson();
        }
    }, [id, person]);

    function getPerson() {
        getPersonById(id)
            .then((res) => {
                setPerson(res);
            })
            .catch((err) => {
                toast.error(`Error getting person ${err.data.Exception}`, {
                    autoClose: false,
                });
            });
    }

    function confirmDelete(){
        confirmAlert({
            title : "Confirm deletion",
            message: `Are you sure you want to remove ${person.firstName} ${person.lastName}?`,
            buttons: [
                {
                  label: 'Yes',
                  onClick: () => deletePerson()
                },
                {
                  label: 'No',
                  onClick: () => {}
                }
            ]
        })
    }

    function deletePerson(){
        removePerson(person).then(res => {
            toast.success("Person removed");
            navigate("/people");
        }).catch((err) => {
            toast.error(`Error removing person ${err.data.Exception}`, {
                autoClose: false,
            });
        });
    }


    return (
        <div className="person-page">
            {!person ? (
                <p>Loading...</p>
            ) : (
                <>
                    {isAdmin && (
                        <div className="admin-controls bg-backgroundOffset mt-4 rounded-md">
                            <div className="bg-primary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">
                                    Admin controls
                                </p>
                            </div>
                            <div className="px-2 py-2">
                                <Link
                                    to={`/people/${id}/edit`}
                                    className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block"
                                >
                                    Edit person
                                </Link>
                                <button onClick={() => {confirmDelete()}} className="bg-red-400 text-white rounded py-2 px-4 hover:opacity-75 inline-block ml-2">
                                    Remove
                                </button>
                            </div>
                        </div>
                    )}
                    <p className="text-primary text-xl">{person.firstName} {person.lastName}</p>
                    <Link
                        to={`/people/${id}/credits`}
                        className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block mt-4"
                    >
                        Credits
                    </Link>
                </>
            )}
        </div>
    );
}
  
Person.propTypes = {
    userIsAuthenticated: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        userIsAuthenticated: state.tokens != null,
        isAdmin: state.isAdmin
    };
};

export default connect(mapStateToProps)(Person);

