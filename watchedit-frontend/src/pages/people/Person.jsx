import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { getPersonById, removePerson } from "../../api/peopleApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import PersonCreditsOverviewList from "../../components/People/Credits/PersonCreditsOverviewList";
import LoadingMessage from "../../components/Loading/LoadingMessage";
import { format, parseISO } from "date-fns";


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
            message: `Are you sure you want to remove ${person.fullName}?`,
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
                <LoadingMessage message={"Loading person."} />
            ) : (
                <>
                    {isAdmin && (
                        <div className="admin-controls bg-backgroundOffset mt-4 rounded-md">
                            <div className="bg-backgroundOffset2 rounded-t-md">
                                <p className="text-primary font-bold text-lg px-2 py-1">
                                    Admin controls
                                </p>
                            </div>
                            <div className="px-2 py-2">
                                <Link
                                    to={`/people/${id}/edit`}
                                    className="bg-backgroundOffset2 text-primary rounded py-2 px-4 hover:opacity-75 inline-block"
                                >
                                    Edit person
                                </Link>
                                <button onClick={() => {confirmDelete()}} className="bg-backgroundOffset2 text-red-400 rounded py-2 px-4 hover:opacity-75 inline-block ml-2">
                                    Remove
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="grid grid-cols-12 mt-4">
                        <div className="col-span-12">
                            <h1 className="my-4 text-center text-primary text-2xl">{person.fullName}</h1>
                        </div>
                        <div className="col-span-12 md:col-span-2">
                            <img src={person.imageUrl} className="headshot" />
                            <Link
                                to={`/people/${id}/credits`}
                                className="bg-primary text-white rounded py-2 px-4 hover:opacity-75 inline-block mt-4 w-full text-center"
                            >
                                Credits
                            </Link>
                        </div>
                        <div className="col-span-12 md:col-span-10 pl-4">
                            <div className="grid grid-cols-12">
                                <div className="col-span-12 md:col-span-6 bg-backgroundOffset p-4">
                                    <p>First name: {person.firstName}</p>
                                    <p>Last name: {person.lastName}</p>
                                    {person.middleNames && (<p>Middle names: {person.middleNames}</p>)}
                                    {person.stageName && (<p>Stage name: {person.stageName}</p>)}
                                    <p>DOB: {format(parseISO(person.dateOfBirth), "dd/MM/yyyy")}</p>
                                </div>
                                <div className="col-span-12 md:col-span-6 md:ml-2 bg-backgroundOffset p-4">
                                    <h3 className="text-primary text-lg">About</h3>
                                    <p>{person.description}</p>
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="grid grid-cols-12">
                                    <div className="col-span-12">
                                        {person.credits.cast.length > 0 && (
                                            <>
                                                <h2 className="mt-4 text-primary text-xl ">As cast</h2>
                                                <PersonCreditsOverviewList credits={person.credits.cast} />
                                            </>
                                        )}
                                    </div>
                                    <div className="col-span-12 mt-4">
                                        {person.credits.crew.length > 0 && (
                                            <>
                                                <h2 className="mt-4 text-primary text-xl ">As crew</h2>
                                                <PersonCreditsOverviewList credits={person.credits.crew} />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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

